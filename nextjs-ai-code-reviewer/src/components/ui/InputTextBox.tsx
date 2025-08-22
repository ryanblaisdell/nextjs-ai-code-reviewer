'use client'

import { Textarea, Box, ActionIcon, Group } from "@mantine/core";
import { useCodeReviewApi } from "@/hooks";
import { useState } from "react";
import { ChatMessage } from "./ChatTextArea";
import { useApplicationStore } from "@/hooks/useStore";
import { IconArrowUp } from '@tabler/icons-react';
import { useRouter } from "next/navigation";

const SYSTEM_PROMPT = `You are an expert Senior Software Engineer and a meticulous code reviewer. Please respond concisely and provide swift feedback. Please ensure that your response is accurate.`;

export function InputTextBox() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const { 
    setError, 
    setIsLoading,
    chat_id,
    setChatId,
    getEmail,
    messages,
    addMessage
  } = useApplicationStore();

  const { 
    isLoading: apiIsLoading,
    generateReview,
    clearState: clearApiState 
  } = useCodeReviewApi();

  const handleSend = async () => {
    if (!code.trim()) {
      setError("Please enter a message.");
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: code };
    addMessage(userMessage);
    setCode("");
    setIsLoading(true);
    setError(null);
    clearApiState();

    try {
      if (!chat_id) {
        // First message → create a new chat
        const res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: getEmail(), message: userMessage.content }),
        });

        if (!res.ok) throw new Error(`Failed to create chat: ${res.statusText}`);
        const data = await res.json();
        setChatId(data.chat_id);

        // Call generateReview for AI response
        const aiResponse = await generateReview(userMessage.content, SYSTEM_PROMPT);
        if (aiResponse?.response) {
          addMessage({ role: "assistant", content: aiResponse.response });
        }

        // Redirect to new chat page
        router.push(`/chat/${data.chat_id}`);
      } else {
        // Existing chat → send message
        const aiResponse = await generateReview(userMessage.content, SYSTEM_PROMPT);
        if (aiResponse?.response) {
          addMessage({ role: "assistant", content: aiResponse.response });
        }

        // Persist message to backend
        await fetch(`/api/chat/${chat_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.content, systemPrompt: SYSTEM_PROMPT }),
        });
      }
    } catch (err) {
      const errorMessage = `Error: ${err instanceof Error ? err.message : String(err)}`;
      setError(errorMessage);
      addMessage({ role: "assistant", content: `⚠️ ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 p-4">
      <Box className="rounded-md">
        <Group align="flex-end" className="w-full">
          <Textarea
            className="flex-grow focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Paste your message here..."
            autosize
            minRows={2}
            maxRows={10}
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            styles={{
              input: {
                background: "linear-gradient(to bottom, #797979ff, #5c5c5cff)",
                color: "white",
                borderColor: "#6b7280",
                outline: "none",
                boxShadow: "none",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "#6b7280",
                },
              },
            }}
          />
          <ActionIcon
            onClick={handleSend}
            disabled={apiIsLoading || !code.trim()}
            loading={apiIsLoading}
            variant="filled"
            size={56}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            radius="xl"
          >
            {!apiIsLoading && <IconArrowUp size={20} />}
          </ActionIcon>
        </Group>
      </Box>
    </div>
  );
}
