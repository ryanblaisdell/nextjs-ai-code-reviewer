'use client'

import { Textarea, Box, Button } from "@mantine/core";
import { useCodeReviewApi } from "@/hooks";
import { useState } from "react";
import { ChatMessage } from "./ChatTextArea";
import { useApplicationStore } from "@/hooks/useStore";

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

   return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2">
            <Box className="p-4 bg-gray-700">
                <Textarea
                    className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste your message here..."
                    autosize
                    minRows={2}
                    maxRows={10}
                    value={code}
                    onChange={(event) => setCode(event.currentTarget.value)}
                />
                <Button
                    onClick={handleGetCodeReview}
                    disabled={apiIsLoading || !code.trim()}
                    loading={apiIsLoading}
                    fullWidth
                    mt="md"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    {getIsLoading() ? "Reviewing..." : "Send Message"}
                </Button>
            </Box>
        </div>
    );
}