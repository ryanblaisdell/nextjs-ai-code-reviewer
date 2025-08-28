"use client";

import { ChatApplicationShell } from "@/components/pages/LayoutClientComponent";
import { useApplicationStore } from "@/hooks/useStore";

export default function Chat() {
  const { getEmail } = useApplicationStore();
  //TODO:
  //      - claude model selection
  //      - deploy the application
  //      - create a settings page where the user can add to the system prompt to curate better prompts or tune the model
  //      - stream response into the chat for a more seamless response
  //      - global logging
  //      - support uploading files to the LLM
  //      - create new chat with button
  //      - implement max chats for users

  return (
    <div className="font-sans w-full min-h-screen">
      <main className="flex flex-col gap-8 w-full items-stretch">
        <ChatApplicationShell userEmail={getEmail()} />
      </main>
    </div>
  );
}
