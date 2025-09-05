"use client";

import { ChatApplicationShell } from "@/components/pages/ChatApplicationShell";
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
  //      - implement max chats for users
  //      - add some image storage for the profile pictures so that they can be stored in the session data or in the store and can be displayed
  //

  return (
    <div className="font-sans w-full min-h-screen">
      <main className="flex flex-col gap-8 w-full items-stretch">
        <ChatApplicationShell userEmail={getEmail()} />
      </main>
    </div>
  );
}
