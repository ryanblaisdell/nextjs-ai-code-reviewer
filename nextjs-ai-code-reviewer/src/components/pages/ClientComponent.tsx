"use client";

import { useEffect } from "react";
import { ChatTextArea, InputTextBox } from "../ui";
import { useApplicationStore } from "@/hooks/useStore";
import { Box, useMantineTheme } from "@mantine/core";

interface ClientComponentProps {
  userEmail: string | null;
}

export default function ClientComponent({ userEmail }: ClientComponentProps) {
  const { chat_id, messages, setMessages, setEmail, setIsLoading, isLoading } =
    useApplicationStore();
  const theme = useMantineTheme();

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail, setEmail]);

  useEffect(() => {
    if (!chat_id) return;

    const fetchMessageContent = async () => {
      const res = await fetch(`/api/chat/${chat_id}?email=${userEmail}`);
      const data = await res.json();
      setIsLoading(false);
      setMessages(data.messages);
    };

    fetchMessageContent();
  }, [chat_id]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingBottom: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
      }}
    >
      <Box style={{ flex: 1, minHeight: 0, minWidth: 0, width: "100%", overflow: "hidden" }}>
        <ChatTextArea messages={messages} />
      </Box>

      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: theme.spacing.md,
        }}
      >
        <Box style={{ width: "100%", maxWidth: 900 }}>
          <InputTextBox />
        </Box>
      </Box>
    </Box>
  );
}
