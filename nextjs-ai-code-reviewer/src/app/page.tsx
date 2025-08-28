import { getServerSession } from "next-auth";
import { authOptions } from "../lib/server/auth";
import { redirect } from "next/navigation";
import { ChatApplicationShell } from "@/components/pages/LayoutClientComponent";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="font-sans w-full min-h-screen">
      <main className="flex flex-col gap-8 w-full items-stretch">
        <ChatApplicationShell userEmail={session.user?.email ?? null} />
      </main>
    </div>
  );
}
