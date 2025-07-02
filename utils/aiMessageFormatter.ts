import { AiMessage, AiResponse } from '../types/ai';

export function formatAiMessage(raw: any): AiMessage {
  // Implement formatting logic
  return {
    id: raw.id || 'msg',
    sender: raw.sender || 'ai',
    text: raw.text || '',
    timestamp: raw.timestamp || new Date().toISOString(),
  };
}

export function parseAiResponse(raw: any): AiResponse {
  // Implement response parsing logic
  return {
    message: raw.message || '',
    suggestions: raw.suggestions || [],
  };
} 