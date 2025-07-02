export interface HistoryItem {
  id: string;
  type: 'order' | 'appointment';
  date: string;
  summary: string;
}

export async function getHistory(userId: string): Promise<HistoryItem[]> {
  // Implement history fetch logic
  return [];
} 