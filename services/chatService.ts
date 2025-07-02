export interface ChatMessage {
  id: string;
  sender: 'user' | 'tailor';
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export async function sendMessage(message: ChatMessage): Promise<void> {
  // Implement message delivery logic
}

export async function getChatHistory(userId: string, tailorId: string): Promise<ChatMessage[]> {
  // Implement chat history fetch logic
  return [];
}

export async function markAsRead(messageId: string): Promise<void> {
  // Implement read receipt logic
}

export async function shareFile(chatId: string, fileUri: string): Promise<string> {
  // Implement file/image sharing logic
  return 'file-url';
} 