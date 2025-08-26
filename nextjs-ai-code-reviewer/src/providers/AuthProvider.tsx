"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthProviderProps {
    children: React.ReactNode
}

export default function Providers({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}