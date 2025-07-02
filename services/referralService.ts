export interface Referral {
  id: string;
  code: string;
  invitedUser: string;
  reward: string;
  status: 'pending' | 'completed';
}

export async function getReferrals(userId: string): Promise<Referral[]> {
  // Implement referral fetch logic
  return [];
}

export async function createReferral(userId: string): Promise<Referral> {
  // Implement referral code generation logic
  return { id: 'mock', code: 'REF123', invitedUser: '', reward: '', status: 'pending' };
} 