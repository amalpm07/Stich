export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  rating?: number;
}

export async function getServices(): Promise<Service[]> {
  // Implement service catalog fetch logic
  return [];
}

export async function getService(id: string): Promise<Service> {
  // Implement service detail fetch logic
  return { id, title: '', description: '', price: '' };
} 