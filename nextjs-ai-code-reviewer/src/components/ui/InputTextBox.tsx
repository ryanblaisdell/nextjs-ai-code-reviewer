"use client";

import { Textarea, Box, ActionIcon, Group } from "@mantine/core";
import { useCodeReviewApi } from "@/hooks";
import { useState } from "react";
import { ChatMessage } from "@/lib";
import { useApplicationStore } from "@/hooks/useStore";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const SYSTEM_PROMPT = `You are an expert Senior Software Engineer and a meticulous code reviewer. Please respond concisely and provide swift feedback. Please ensure that your response is accurate.`;

export function InputTextBox() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const { setError, setIsLoading, chat_id, setChatId, getEmail, addMessage } =
    useApplicationStore();

  const { isLoading: apiIsLoading, generateReview, clearState: clearApiState } = useCodeReviewApi();

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
        const res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: getEmail(), message: userMessage.content }),
        });

        if (!res.ok) throw new Error(`Failed to create chat: ${res.statusText}`);
        const data = await res.json();

        setChatId(data.chat_id);
        addMessage({ role: "assistant", content: data.message });

        router.push(`/chat/${data.chat_id}`);
      } else {
        const aiResponse = await generateReview(userMessage.content, SYSTEM_PROMPT);

        if (aiResponse?.response) {
          addMessage({ role: "assistant", content: aiResponse.response });
        }

        await fetch(`/api/chat/${chat_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.content, systemPrompt: SYSTEM_PROMPT }),
        });
      }
    } catch (err) {
      const errorMessage = `Error: ${err instanceof Error ? err.message : String(err)}`;
      setError(errorMessage);
      addMessage({ role: "assistant", content: `${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box style={{ width: "100%", maxWidth: "900px", margin: "0 auto", display: "flex" }}>
      <Group align="flex-end" style={{ width: "100%" }}>
        <Textarea
          className="flex-grow focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Paste your message here..."
          autosize
          minRows={1}
          maxRows={10}
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
          radius="xl"
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
              paddingTop: 10,
              paddingBottom: 10,
            },
          }}
          leftSection={<IconSearch size={18} stroke={1.5} />}
          rightSection={
            <ActionIcon
              onClick={handleSend}
              disabled={apiIsLoading || !code.trim()}
              loading={apiIsLoading}
              variant="filled"
              size={32}
              className="bg-blue-300 hover:bg-blue-100 text-white mr-5"
              radius="xl"
            >
              {!apiIsLoading && <IconArrowRight size={18} stroke={1.5} />}
            </ActionIcon>
          }
        />
      </Group>
    </Box>
  );
}
