import { Conversation } from "../types";

interface FetchConversationsOptions {
  email: string;
}

export async function fetchAllConversations(
  options: FetchConversationsOptions
): Promise<Conversation[] | null> {
  const { email } = options;

  if (!email) {
    console.warn("Attempted to fetch conversations without an email.");
    return null;
  }

  try {
    const response = await fetch(`/api/all-chats?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(`Failed to fetch conversations: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data: Conversation[] = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(`Error fetching conversations for email: ${email} ; `, error);
    throw error;
  }
}