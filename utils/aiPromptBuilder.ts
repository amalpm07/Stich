export function buildPrompt(userInput: string, context?: string): string {
  // Implement prompt building logic
  return context ? `${context}\n${userInput}` : userInput;
} 