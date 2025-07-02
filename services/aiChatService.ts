export interface AiMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export async function sendAiMessage(message: AiMessage): Promise<AiMessage> {
  // Implement AI message send logic
  return { ...message, id: 'ai-reply', sender: 'ai', text: 'AI response', timestamp: new Date().toISOString() };
}

export async function formatAiMessage(raw: any): Promise<AiMessage> {
  // Implement message formatting logic
  return { id: 'formatted', sender: 'ai', text: String(raw), timestamp: new Date().toISOString() };
} 