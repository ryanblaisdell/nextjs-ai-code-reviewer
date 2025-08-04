// set this in an env file
const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export interface CodeReviewRequest {
  user_prompt: string;
  max_tokens?: number;    
  temperature?: number;    
  model?: string;
  system_prompt?: string;  
}

export interface CodeReviewResponse {
  response: string;
  model_used: string;
  tokens_generated: number;
  input_tokens: number;
  finish_reason: string;
}

export async function generateCodeReview(
  userPrompt: string,
  systemPrompt: string
): Promise<CodeReviewResponse> {
  const requestBody: CodeReviewRequest = {
    user_prompt: userPrompt,
    max_tokens: 1000, 
    temperature: 0.3,
    model: 'claude-3-haiku-20240307',
    system_prompt: systemPrompt,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error. Status: ${response.status}`);
    }

    const data: CodeReviewResponse = await response.json();

    return data;
  } catch (error) {
    console.error('API call to /generate failed:', error);
    throw error;
  }
}