"use client";

import { useState } from 'react';
import { ChatTextArea, InputTextBox, NewConversationButton } from './ui';
import { ChatMessage } from './ui';

export default function ClientComponent() {
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
    <div className="font-sans grid items-center justify-items-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <ChatTextArea messages={messages} />
        <InputTextBox 
          onNewMessage={handleNewChatMessage}
          onApiError={handleApiError}
        />
        <NewConversationButton />
      </main>
    </div>
  );
}