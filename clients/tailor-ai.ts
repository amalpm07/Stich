const TAILOR_AI_URL = process.env.EXPO_PUBLIC_TAILOR_AI_URL || '';
const TAILOR_AI_API_KEY = process.env.EXPO_PUBLIC_TAILOR_AI_API_KEY || '';

export async function callTailorAI(endpoint: string, body: any): Promise<any> {
  const res = await fetch(`${TAILOR_AI_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TAILOR_AI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
} 