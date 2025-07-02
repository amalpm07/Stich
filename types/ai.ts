export interface AiMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface AiResponse {
  message: string;
  suggestions?: string[];
}

export interface AiSuggestion {
  id: string;
  text: string;
}

export interface AiChatHistory {
  id: string;
  messages: AiMessage[];
  date: string;
} 