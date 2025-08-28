"use client";

import { AppShell, Burger, Group, Text, Box, Button, ScrollArea, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessagePlus, IconMessage } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { fetchAllConversations } from "@/lib";
import ClientComponent from "@/components/pages/ClientComponent";
import { useApplicationStore } from "@/hooks/useStore";
import classes from "./NavLink.module.css";
import { useRouter } from "next/navigation";

interface ChatApplicationShellProps {
  userEmail: string | null;
}

export function ChatApplicationShell({ userEmail }: ChatApplicationShellProps) {
  const [opened, { toggle: toggleOpen }] = useDisclosure(true);
  const {
    email,
    setIsLoading,
    chat_id,
    setError,
    setChatId,
    clearMessages,
    conversations,
    setConversations,
  } = useApplicationStore();
  const router = useRouter();

  // handling chat navigation by redirecting url and changing in-state chat_id
  const handleConversationRedirect = (chat_id: string) => {
    router.push(`/chat/${chat_id}`);
    setChatId(chat_id);
  };

  // since were trying to create a new convo, we can redirect users to the app root and reset the chat_id + messages in state
  // this will cause users to not have messages appear and when they send a message into the chattextarea, it will trigger a chat creation
  const handleNewConversation = () => {
    clearMessages();
    router.push("/");
    setChatId(null);
  };

  useEffect(() => {
    if (!email) {
      setIsLoading(false);
      return;
    }

    const loadConversations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAllConversations({ email });
        if (data) {
          setConversations(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load conversations.");
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [email, setError, setIsLoading]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { desktop: !opened },
      }}
      padding="md"
      classNames={{
        root: "h-screen",
      }}
    >
      <AppShell.Header style={{ backgroundColor: "#222222", borderBottom: "1px solid #444c59" }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggleOpen} visibleFrom="sm" size="sm" color="white" />
          <Text size="lg" fw={700} c="#919191ff">
            AI CODE REVIEWER
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p={0}
        style={{ backgroundColor: "#222222", borderRight: "1px solid #444c59" }}
      >
        <Box
          p="md"
          style={{
            borderBottom: "1px solid #444c59",
            backgroundColor: "#222222",
          }}
        >
          <Button
            fullWidth
            leftSection={<IconMessagePlus size={20} />}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            onClick={() => handleNewConversation()}
          >
            New Conversation
          </Button>
        </Box>

        <ScrollArea
          h="100%"
          type="auto"
          scrollbarSize={12}
          scrollHideDelay={0}
          styles={{
            scrollbar: {
              background: "transparent",
            },
          }}
          className="mt-0"
          offsetScrollbars
        >
          <Text size="sm" c="dimmed" mb="xs" ml="sm" mt="xs">
            Past Conversations
          </Text>

          {conversations.length === 0 ? (
            <Text c="dimmed" size="sm">
              No conversations yet.
            </Text>
          ) : (
            <Box color="blue">
              {conversations.map((conv) => (
                <NavLink
                  key={conv.chat_id}
                  label={conv.title}
                  active={conv.chat_id === chat_id}
                  leftSection={
                    <IconMessage
                      size={18}
                      stroke={1.5}
                      color={conv.chat_id === chat_id ? "white" : "white"}
                    />
                  }
                  className={classes.myNavLinkHover}
                  styles={{
                    label: { color: "white" },
                    section: { color: "white" },
                  }}
                  my={4}
                  onClick={() => handleConversationRedirect(conv.chat_id)}
                />
              ))}
            </Box>
          )}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <ClientComponent userEmail={userEmail} />
      </AppShell.Main>
    </AppShell>
  );
}
