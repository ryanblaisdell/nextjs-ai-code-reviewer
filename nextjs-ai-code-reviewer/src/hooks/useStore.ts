import { create } from 'zustand'

// the state of the application that we want to store ; add to this when more functionality is needed
interface State {
  chatResult: string | null
  error: string | null
  isLoading: boolean
  conversationId: string | null
  userId: string | null
  chat_id: string | null
  email: string | null
  messages: ChatMessage[]
}

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

// the actions that correspond with the state attributes we set
interface StateActions {
  setChatResult: (result: string) => void;
  setError: (errorMessage: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setConversationId: (id: string) => void;
  setUserId: (id: string) => void;
  setChatId: (id: string) => void;
  setEmail: (email: string) => void;

  clearMessages: () => void;
  addMessage: (msg: ChatMessage) => void;

  getIsLoading: () => boolean;
  getEmail: () => string | null;
  getChatId: () => string | null;
  clearAllState: () => void;
}

type Store = State & StateActions;

// basic zustand store that will manage the state with these actions 
export const useApplicationStore = create<Store>((set, get) => ({
  chatResult: null,
  error: null,
  isLoading: false,
  conversationId: null,
  userId: null,
  chat_id: null,
  email: null,
  messages: [],

  setChatResult: (result) => set({ chatResult: result, error: null }),
  setError: (errorMessage) => set({ error: errorMessage, chatResult: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setConversationId: (id) => set({ conversationId: id }),
  setUserId: (id) => set({ userId: id}),
  setChatId: (id) => set({ chat_id: id}),
  setEmail: (email) => set({ email: email}),

  getIsLoading: () => get().isLoading,
  getChatId: () => get().chat_id,
  getEmail: () => get().email,

  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),

  clearAllState: () => set({
    chatResult: null,
    error: null,
    isLoading: false,
    conversationId: null,
    userId: null,
  }),
}));