import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { supabase } from '../clients/supabase';

export interface Consultant {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  status: 'active' | 'inactive' | 'on_leave';
  joining_date: string;
  created_at: string;
  updated_at: string;
}

interface ConsultantsState {
  consultants: Consultant[];
  isLoading: boolean;
  error: string | null;
}

type ConsultantsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Consultant[] }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: ConsultantsState = {
  consultants: [],
  isLoading: false,
  error: null,
};

function consultantsReducer(state: ConsultantsState, action: ConsultantsAction): ConsultantsState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, consultants: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

interface ConsultantsContextType extends ConsultantsState {
  fetchConsultants: () => Promise<void>;
}

const ConsultantsContext = createContext<ConsultantsContextType | undefined>(undefined);

export const ConsultantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(consultantsReducer, initialState);

  const fetchConsultants = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_START' });

      const { data, error: fetchError } = await supabase
        .from('employees')
        .select('*')
        .eq('role', 'tailor')
        .eq('status', 'active');

      if (fetchError) {
        throw fetchError;
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: data || [] });
    } catch (err) {
      console.error('Error fetching consultants:', err);
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch consultants' });
    }
  }, []);

  return (
    <ConsultantsContext.Provider
      value={{
        ...state,
        fetchConsultants,
      }}
    >
      {children}
    </ConsultantsContext.Provider>
  );
};

export const useConsultantContext = () => {
  const context = useContext(ConsultantsContext);
  if (context === undefined) {
    throw new Error('useConsultantContext must be used within a ConsultantsProvider');
  }
  return context;
}; 