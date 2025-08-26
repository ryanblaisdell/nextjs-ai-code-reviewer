"use client";

import { useEffect } from 'react';
import { ChatTextArea, InputTextBox } from '../ui';
import { useApplicationStore } from '@/hooks/useStore';

interface ClientComponentProps {
  userEmail: string | null
}

export default function ClientComponent({ userEmail }: ClientComponentProps) {
  const { messages, setEmail } = useApplicationStore();
  
      useEffect(() => {
        if (userEmail) {
          setEmail(userEmail);
        }
      }, [userEmail, setEmail]);

  return (
    <>
      <div className="font-sans grid items-center justify-items-center">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <ChatTextArea messages={messages} />
          <InputTextBox />
        </main>
      </div>
    </>
  );
}