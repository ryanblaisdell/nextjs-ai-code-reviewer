'use client'

import { LayoutClientComponent } from "@/components/pages/LayoutClientComponent";
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
  //      - ensure the chat is centered when the sidebar is open


  return (
    <div className="font-sans grid items-center justify-items-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <LayoutClientComponent userEmail={getEmail()}/>
      </main>
    </div>
  );
}
