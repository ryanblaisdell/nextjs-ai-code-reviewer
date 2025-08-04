'use client'

import { useState, useCallback } from 'react'
import { generateCodeReview, CodeReviewResponse } from '@/lib'

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

  const generateReview = useCallback(
    async (
      userPrompt: string,
      systemPrompt: string
    ): Promise<CodeReviewResponse | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await generateCodeReview(userPrompt, systemPrompt);
        return response;
      } catch (err) {
        const errorMessage = `API Error: ${err instanceof Error ? err.message : String(err)}`;
        setError(errorMessage);
        console.error('API call failed:', err);
      } finally {
        setIsLoading(false);
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