'use client'

import ClientComponent from "@/components/ClientComponent";
import { useApplicationStore } from "@/hooks/useStore";

export default function Chat() {
  const { getEmail } = useApplicationStore();
  //TODO: 
  //      - add a new table in the mongodb table that will store the conversations
  //      - add functionality to create new chats
  //      - claude model selection
  //      - deploy the application
  //      - create a settings page where the user can add to the system prompt to curate better prompts or tune the model
  //      - stream response into the chat for a more seamless response
  //      - global logging
  //      - support uploading files to the LLM

  //      First, add new tables in DB that can store and retrieve user info, hash the passwords
  //      After doing this we can then add the functionality to add new chats as we can link convos to user id w/ their own respective convo id
  //      

  return (
    <div className="font-sans grid items-center justify-items-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <ClientComponent userEmail={getEmail()}/>
      </main>
    </div>
  );
}
