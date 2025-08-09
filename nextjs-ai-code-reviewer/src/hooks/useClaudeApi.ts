'use client'

import { useState, useCallback } from 'react'
import { generateCodeReview, CodeReviewResponse } from '../lib/client/CodeReviewerApi'
import { useApplicationStore } from './useStore' 

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

  const { setIsLoading: setGlobalIsLoading, setError: setGlobalError } = useApplicationStore();

  const generateReview = useCallback(
    async (
      userPrompt: string,
      systemPrompt: string
    ): Promise<CodeReviewResponse | undefined> => {
      setIsLoading(true);
      setGlobalIsLoading(true);

      setError(null);
      setGlobalError(null);

      try {
        const response = await generateCodeReview(userPrompt, systemPrompt);
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
    []
  );

  const clearState = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  return { isLoading, error, generateReview, clearState };
}