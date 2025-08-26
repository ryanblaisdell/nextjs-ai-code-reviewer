export interface Conversation {
  id: string;
  chat_id: string;
  email: string;
  messages: { role: string; content: string; timestamp: number }[];
  created_at: number;
  updated_at: number;
  title: string;
}