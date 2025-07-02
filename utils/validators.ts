export function isEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export function isPhone(phone: string): boolean {
  return /^\+?\d{10,15}$/.test(phone);
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
} 