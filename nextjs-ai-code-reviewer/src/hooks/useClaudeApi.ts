'use client'

import { useState, useCallback } from 'react'
import { generateCodeReview, CodeReviewResponse } from '../lib/client/CodeReviewerApi'
import { useApplicationStore } from './useStore' 

/**
 *  See if this can be turned into some route instead of a hook to follow the same paradigm as the rest of the API calls
 */


interface UseCodeReviewApiResult {
  isLoading: boolean;              
  error: string | null;            
  generateReview: (
    userPrompt: string,
    systemPrompt: string
  ) => Promise<CodeReviewResponse | undefined>;
  clearState: () => void; 
}

export function useCodeReviewApi(): UseCodeReviewApiResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setIsLoading: setGlobalIsLoading, setError: setGlobalError, email, chat_id } = useApplicationStore();

  const generateReview = useCallback(
    async (
      userPrompt: string,
      systemPrompt: string
    ): Promise<CodeReviewResponse | undefined> => {
      setIsLoading(true);
      setGlobalIsLoading(true);

      setError(null);
      setGlobalError(null);

      if (chat_id === null || email === null) return

      try {
        const response = await generateCodeReview(chat_id, email, userPrompt, systemPrompt);
        console.log("LLM response: ", response)
        return response;
      } catch (err) {
        const errorMessage = `API Error: ${err instanceof Error ? err.message : String(err)}`;
        setError(errorMessage);
        setGlobalError(errorMessage);
        console.error('API call failed:', err);
      } finally {
        setIsLoading(false);
        setGlobalIsLoading(false);
      }
      return undefined;
    },
    [chat_id, email, setGlobalError, setGlobalIsLoading]
  );

  const clearState = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  return { isLoading, error, generateReview, clearState };
}