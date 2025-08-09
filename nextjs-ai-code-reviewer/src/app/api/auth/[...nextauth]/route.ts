import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../../../lib/server/MongoDBQueries";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        console.log('[CredentialsProvider][DEBUG] Attempting to authorize with credentials:', credentials);
        const userFromDb = await getUserByEmail(credentials?.email);

        if (!userFromDb) { 
          console.log('[CredentialsProvider][DEBUG] Invalid credentials provided.');
          throw new Error("No user was found with this email."); 
        }

        const isValid = await bcrypt.compare(credentials!.password.trim(), userFromDb.password);

        if (!isValid) {
          console.log('[CredentialsProvider][DEBUG] Password verification failed for:', credentials?.email);
          throw new Error("Invalid password.");
        }

        console.log('[CredentialsProvider][DEBUG] User authorized');
        return {
          id: userFromDb._id.toString(),
          name: userFromDb.name || null,
          email: userFromDb.email || null,
          image: userFromDb.image || null
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;

        console.log('[JWT Callback][DEBUG] Token after user data:', token);
      }

      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
          session.user.id = token.id;

          console.log('[Session Callback][DEBUG] Session after token data:', session);
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };