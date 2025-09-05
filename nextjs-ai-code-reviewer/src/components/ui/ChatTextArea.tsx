"use client";

import { useRef, useEffect } from "react";
import { Box, Paper, Text, ScrollArea, Avatar, Loader } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "./CodeBlock";
import { ChatMessage } from "@/lib";
import { useApplicationStore } from "@/hooks/useStore";

type ChatDisplayProps = {
  messages: ChatMessage[];
};

export function ChatTextArea({ messages }: ChatDisplayProps) {
  const viewport = useRef<HTMLDivElement>(null);

  const { isLoading } = useApplicationStore();

  useEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: "auto" });
    }
  }, [messages]);

  return (
    <Paper
      p="md"
      style={{
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ScrollArea
        viewportRef={viewport}
        style={{ flex: 1, width: "100%", minWidth: 0, minHeight: "0" }}
      >
        {messages.length === 0 && !isLoading ? (
          <Text c="dimmed" ta="center" mt="xl">
            Start a new conversation!
          </Text>
        ) : (
          <>
            {messages.map((msg, index) => (
              <Box
                key={index}
                className={`flex items-start gap-3 py-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <Avatar radius="xl" color="green" style={{ border: "1px solid grey" }} />
                )}
                <Paper
                  shadow="xs"
                  p="sm"
                  className="max-w-[70%] text-wrap break-words text-black"
                  style={{ borderRadius: "8px" }}
                >
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{ code: CodeBlock }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </Paper>
                {msg.role === "user" && (
                  <Avatar radius="xl" color="blue" style={{ border: "1px solid grey" }} />
                )}
              </Box>
            ))}

            {isLoading && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <Loader size="md" color="gray" type="dots"/>
              </Box>
            )}
          </>
        )}
      </ScrollArea>
    </Paper>
  );
}
