import { useEffect, useState } from 'react';
import { supabase } from '../clients/supabase';

export interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  duration: string | null;
  is_active: boolean | null;
  created_at: string;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        throw error;
      }

      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    services,
    isLoading,
    error,
    refetch: fetchServices
  };
} 