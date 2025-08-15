'use client'

import { Textarea, Box, ActionIcon, Group } from "@mantine/core";
import { useCodeReviewApi } from "@/hooks";
import { useState } from "react";
import { ChatMessage } from "./ChatTextArea";
import { useApplicationStore } from "@/hooks/useStore";
import { IconArrowUp } from '@tabler/icons-react';

// put this in a env file at some point
const SYSTEM_PROMPT = `You are an expert Senior Software Engineer and a meticulous code reviewer. Please respond concisly and provide swift feedback. Please ensure that your response is accurate.`;

interface InputTextBoxProps {
  onNewMessage: (message: ChatMessage) => void;
  onApiError: (errorMessage: string) => void;
}

export function InputTextBox({ onApiError, onNewMessage }: InputTextBoxProps) {
    const [code, setCode] = useState('');

    const { setError: setGlobalError, setIsLoading: setGlobalLoading, getIsLoading } = useApplicationStore();

    const {
        isLoading: apiIsLoading,
        generateReview,
        clearState: clearApiState,
    } = useCodeReviewApi();
    
    const handleGetCodeReview = async () => {
        if (!code.trim()) {
            onApiError("Please paste code to review.");
            return;
        }
        setCode('');
        setGlobalLoading(true);
        clearApiState();
        setGlobalError(null);

        const userCodeMessage: ChatMessage = {
            role: 'user',
            content: code
        };
        onNewMessage(userCodeMessage);

        try {
            const response = await generateReview(userCodeMessage.content, SYSTEM_PROMPT);
        if (response) {
            const aiReviewMessage: ChatMessage = {
                role: 'assistant',
                content: response.response
            };
            onNewMessage(aiReviewMessage);
        }
        } catch (err) {
            const errorMessage = `Error during review: ${err instanceof Error ? err.message : String(err)}`;
            onApiError(errorMessage);
            setGlobalError(errorMessage)
            onNewMessage({ role: 'assistant', content: `Sorry, an error occurred: ${errorMessage}` });
        }
    };

   const textAreaMinHeight = 40 + (16 * 2) + 2; // Rough estimate: 2rem line height + 2 * padding + 2 * border
  const buttonHeight = 'calc(var(--mantine-spacing-md) + 2rem)'; // Base height from Textarea defaults, or a fixed pixel value

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 p-4"> {/* Added padding to the outer div */}
      <Box className="bg-gray-700 rounded-md"> {/* Wrap content in a Box for consistent background/padding */}
        {/* Mantine Group for horizontal alignment */}
        <Group align="flex-end" className="w-full"> {/* align="flex-end" aligns items at the bottom */}
          <Textarea
            className="flex-grow bg-gray-700 border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" // flex-grow for textarea
            placeholder="Paste your message here..."
            autosize
            minRows={2}
            maxRows={10}
            value={code}
            onChange={(event) => setCode(event.currentTarget.value)}
            // Pass a style prop to ensure Textarea's height calculation is visible
            style={{ overflowY: 'hidden' }} // Prevent Textarea's own scrollbar if you want outer ScrollArea to handle it
          />
          <ActionIcon
            onClick={handleGetCodeReview}
            disabled={apiIsLoading || !code.trim()}
            loading={apiIsLoading}
            variant="filled"
            size={56}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            radius="xl"
          >
            {/* Mantine's loading prop handles spinner automatically if loading={true} */}
            {!apiIsLoading && <IconArrowUp size={20} />} {/* Render icon only when not loading */}
          </ActionIcon>
        </Group>
      </Box>
    </div>
  );
}