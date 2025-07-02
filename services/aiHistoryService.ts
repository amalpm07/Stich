export interface AiConversation {
  id: string;
  title: string;
  messages: string[];
  date: string;
}

export async function getAiConversations(userId: string): Promise<AiConversation[]> {
  // Implement conversation fetch logic
  return [];
}

export async function saveAiConversation(conversation: AiConversation): Promise<void> {
  // Implement conversation save logic
}

export async function deleteAiConversation(id: string): Promise<void> {
  // Implement conversation delete logic
} 