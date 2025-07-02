import { supabase } from '../clients/supabase';

export interface UserMeta {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  email: string | null;
  phone_verified: boolean;
  email_verified: boolean;
  is_business: boolean;
  business_name: string | null;
  gst_number: string | null;
  default_address_id: string | null;
  created_at: string;
  updated_at: string;
  gender: string | null;
  is_onboarded: boolean;
  is_active: boolean;
  profile_url: string | null;
}

export interface CreateUserMetaInput {
  id: string;
  full_name?: string;
  phone_number?: string;
  email?: string;
  gender?: string;
  is_business?: boolean;
  business_name?: string;
  gst_number?: string;
  profile_url?: string;
}

export function useUserMeta() {
  const createUserMeta = async (input: CreateUserMetaInput): Promise<UserMeta | null> => {
    try {
      const { data, error } = await supabase
        .from('user_meta')
        .insert([
          {
            id: input.id,
            full_name: input.full_name,
            phone_number: input.phone_number,
            email: input.email,
            gender: input.gender,
            is_business: input.is_business || false,
            business_name: input.business_name,
            gst_number: input.gst_number,
            profile_url: input.profile_url,
            is_onboarded: false,
            is_active: true,
            phone_verified: false,
            email_verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user metadata:', error);
      return null;
    }
  };

  const updateUserMeta = async (
    userId: string,
    updates: Partial<Omit<UserMeta, 'id' | 'created_at'>>
  ): Promise<UserMeta | null> => {
    try {
      const { data, error } = await supabase
        .from('user_meta')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user metadata:', error);
      return null;
    }
  };

  const getUserMeta = async (userId: string): Promise<UserMeta | null> => {
    try {
      const { data, error } = await supabase
        .from('user_meta')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user metadata:', error);
      return null;
    }
  };

  const setDefaultAddress = async (userId: string, addressId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_meta')
        .update({
          default_address_id: addressId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error setting default address:', error);
      return false;
    }
  };

  return {
    createUserMeta,
    updateUserMeta,
    getUserMeta,
    setDefaultAddress,
  };
} 