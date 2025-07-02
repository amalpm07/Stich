import { useEffect, useState } from 'react';
import { supabase } from '../clients/supabase';
import { useAuth } from './useAuth';

export interface Order {
  id: string;
  user_id: string;
  tailor_id: string | null;
  is_bulk_order: boolean;
  status: 'pending' | 'confirmed' | 'measuring' | 'stitching' | 'quality_check' | 'shipping' | 'delivered' | 'cancelled';
  delivery_address_id: string | null;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'partially_paid' | 'refunded';
  expected_delivery_date: string | null;
  created_at: string;
  updated_at: string;
  appointment_id: string | null;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user?.id]);

  const fetchOrders = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
} 