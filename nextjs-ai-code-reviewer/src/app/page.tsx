'use client';

import { InputTextBox, ChatTextArea, ChatMessage } from "@/components";

import { useState } from 'react';

export default function Home() {

  // test messages to see the layout of the messages
 const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Code Reviewer. Paste your code below and I'll provide feedback."
    },
    {
      role: 'user',
      content: "Please help me with the following..."
    },
    {
      role: 'system',
      content: 'THIS IS A SYSTEM MESSAGE'
    }
  ]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col h-screen p-4 gap-[32px] row-start-2 items-center sm:items-start">
        <ChatTextArea messages={messages} />
        <InputTextBox />
      </main>
    </div>
  );
}
