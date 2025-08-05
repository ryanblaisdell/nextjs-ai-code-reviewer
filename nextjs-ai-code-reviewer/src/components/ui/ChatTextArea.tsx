'use client';

import { useRef, useEffect } from 'react';
import { Box, Paper, Text, ScrollArea, Avatar } from '@mantine/core';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';
import { CodeBlock } from './CodeBlock';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatDisplayProps = {
  messages: ChatMessage[];
};

export function ChatTextArea({ messages }: ChatDisplayProps) {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Paper
      shadow="lg"
      p="md"
      radius="lg"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-11/12 max-w-[700px] flex flex-col bg-gray-700"
      style={{
        top: '25px',
        bottom: `130px`, // manually setting the padding since ill die before i can perfect styling
        backgroundColor: "#364153"
      }}
    >
      <ScrollArea viewportRef={viewport} style={{ flexGrow: 1, height: '100%' }} className='bg-gray-700'>
        {messages.length === 0 ? (
          <Text c="dimmed" ta="center" mt="xl" />
        ) : (
          messages.map((msg, index) => (
            <Box
              key={index}
              className={`flex items-start gap-3 py-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <Avatar radius="xl" color="green" />
              )}
              <Paper
                shadow="xs"
                p="sm"
                className= "max-w-[70%] text-wrap break-words text-black"
                style={{ borderRadius: '8px' }}
              >
                <Text>
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{code: CodeBlock}}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </Text>
              </Paper>
              {msg.role === 'user' && (
                <Avatar radius="xl" color="blue" />
              )}
            </Box>
          ))
        )}
      </ScrollArea>
    </Paper>
  );
}