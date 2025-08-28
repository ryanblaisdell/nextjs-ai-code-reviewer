"use client";

import { Box } from "@mantine/core";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function CodeBlock({ inline, className = "", children, ...props }: CodeBlockProps) {
  const language = className.match(/language-(\w+)/)?.[1];

  if (!inline && language) {
    return (
      <Box
        className="bg-gray-900 rounded-md p-3 overflow-x-auto text-sm"
        style={{ margin: "1rem 0" }}
      >
        <SyntaxHighlighter style={coldarkDark} language={language} PreTag="div" {...props}>
          {String(children).replace(/\n$/, "")}
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
