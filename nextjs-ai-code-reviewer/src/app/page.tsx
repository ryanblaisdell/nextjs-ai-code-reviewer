'use client';

import { InputTextBox, ChatTextArea, ChatMessage } from "@/components";

import { useState } from 'react';

export default function Home() {

    //TODO: 
  //      - add a new table in the mongodb table that will store the conversations
  //      - add functionality to create new chats
  //      - authentication
  //      - claude model selection
  //      - deploy the application
  //      - create a settings page where the user can add to the system prompt to curate better prompts or tune the model
  //      - stream response into the chat for a more seamless response
  //      - global logging
  //      - support uploading files to the LLM


  // test messages to see the layout of the messages
 const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Code Reviewer. Paste your code below and I'll provide feedback."
    }
  ]);

  const handleNewChatMessage = (message: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleApiError = (errorMessageText: string) => {
    setMessages(prevMessages => [...prevMessages, {
      role: 'system',
      content: `Sorry, an error occurred: ${errorMessageText}`
    }]);
};

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col h-screen p-4 gap-[32px] row-start-2 items-center sm:items-start">
        <ChatTextArea messages={messages} />
        <InputTextBox 
          onNewMessage={handleNewChatMessage}
          onApiError={handleApiError}
        />
      </main>
    </div>
  );
}
