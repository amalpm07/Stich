import { PostgrestError } from '@supabase/supabase-js';
import { useReducer } from 'react';
import { supabase } from '../clients/supabase';

export type AddressType = 'home' | 'office' | 'other';

export interface Address {
  id: string;
  user_id?: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  address_type: AddressType;
  gps_location?: {
    latitude: number;
    longitude: number;
  };
  created_at?: string;
  updated_at?: string;
}

// New interface for onboarding address format
export interface OnboardingAddress {
  formatted_address: string;
  lat: number;
  lng: number;
}

interface State {
  addresses: Address[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD' | 'UPDATE' | 'DELETE' | 'SET_DEFAULT';
  payload?: any;
}

const initialState: State = {
  addresses: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, addresses: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true, errorMessage: action.payload };
  if (action.type === 'ADD') return { ...state, addresses: [action.payload, ...state.addresses] };
  if (action.type === 'UPDATE') return { ...state, addresses: state.addresses.map(a => a.id === action.payload.id ? action.payload : a) };
  if (action.type === 'DELETE') return { ...state, addresses: state.addresses.filter(a => a.id !== action.payload) };
  if (action.type === 'SET_DEFAULT') return { ...state, addresses: state.addresses.map(a => ({ ...a, is_default: a.id === action.payload })) };
  return state;
}

export function useAddresses() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchAddresses() {
    try {
      dispatch({ type: 'FETCH_START' });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;

      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof PostgrestError ? error.message : 
        'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
    }
  }

  async function addAddress(address: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Address | undefined> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('addresses')
        .insert([{
          user_id: user.id,
          name: address.name,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          is_default: address.is_default,
          address_type: address.address_type,
          gps_location: address.gps_location
        }])
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'ADD', payload: data });
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof PostgrestError ? error.message : 
        'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
      return undefined;
    }
  }

  async function addOnboardingAddress(address: OnboardingAddress): Promise<Address | undefined> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Parse the formatted address to extract components
      const addressComponents = address.formatted_address.split(',').map(comp => comp.trim());
      
      const newAddress: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
        name: 'Home', // Default name for onboarding address
        address_line1: addressComponents[0] || '',
        address_line2: addressComponents[1] || '',
        city: addressComponents[2] || '',
        state: addressComponents[3] || '',
        pincode: addressComponents[4] || '',
        is_default: true, // Set as default address for new users
        address_type: 'home',
        gps_location: {
          latitude: address.lat,
          longitude: address.lng
        }
      };

      const { data, error } = await supabase
        .from('addresses')
        .insert([{
          user_id: user.id,
          ...newAddress
        }])
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'ADD', payload: data });
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof PostgrestError ? error.message : 
        'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
      return undefined;
    }
  }

  async function updateAddress(address: Address): Promise<Address | undefined> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('addresses')
        .update({
          name: address.name,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          is_default: address.is_default,
          address_type: address.address_type,
          gps_location: address.gps_location
        })
        .eq('id', address.id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'UPDATE', payload: data });
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof PostgrestError ? error.message : 
        'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
      return undefined;
    }
  }

  async function deleteAddress(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      dispatch({ type: 'DELETE', payload: id });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof PostgrestError ? error.message : 
        'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
    }
  }

  async function setDefault(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // First, set all addresses to non-default
      const { error: resetError } = await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);

      if (resetError) throw resetError;

      // Then set the selected address as default
      const { error: updateError } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      dispatch({ type: 'SET_DEFAULT', payload: id });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof PostgrestError ? error.message : 
        'An unknown error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
    }
  }

  return {
    ...state,
    fetchAddresses,
    addAddress,
    addOnboardingAddress,
    updateAddress,
    deleteAddress,
    setDefault,
  };
} 