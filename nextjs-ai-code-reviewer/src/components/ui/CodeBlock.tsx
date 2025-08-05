'use client'

import { Box } from "@mantine/core";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * This component will be used in the ChatTextArea component when rendering the LLM's API response.
 * 
 * It will pattern match the returned markdown response to find where there will be code blocks " '''language-java... ",
 * and then, for this instance, will return a styled div. Otherwise, it will return a typical component.
 * @param CodeBlockProps
 * @returns 
 */
export function CodeBlock({ inline, className = '', children, ...props }: CodeBlockProps) {
  const language = className.match(/language-(\w+)/)?.[1]; // thank you ai

  if (!inline && language) {
    return (
      <Box className="bg-gray-900 rounded-md p-3 overflow-x-auto text-sm" style={{ margin: '1rem 0' }}>
        <SyntaxHighlighter
          style={coldarkDark}
          language={language}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </Box>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
