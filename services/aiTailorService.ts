export interface Recommendation {
  id: string;
  type: 'measurement' | 'style' | 'fabric';
  value: string;
}

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  // Implement AI recommendation fetch logic
  return [];
} 