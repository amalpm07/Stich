export interface Promo {
  code: string;
  discount: number;
  isValid: boolean;
  expiresAt: string;
}

export async function getPromos(): Promise<Promo[]> {
  // Implement promo fetch logic
  return [];
}

export async function validatePromo(code: string): Promise<boolean> {
  // Implement promo validation logic
  return true;
} 