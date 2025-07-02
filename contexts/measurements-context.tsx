import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { supabase } from '../clients/supabase';

export type MeasurementType = 'shirt' | 'pants' | 'suit' | 'kurta' | 'sherwani' | 'blouse' | 'saree' | 'custom';

export interface Measurement {
  id: string;
  user_id: string;
  consultant_id?: string;
  is_self_measured: boolean;
  measurement_type: MeasurementType;
  measurements: Record<string, number>;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface MeasurementsState {
  measurements: Measurement[];
  isLoading: boolean;
  error: string | null;
}

type MeasurementsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Measurement[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_MEASUREMENT'; payload: Measurement }
  | { type: 'UPDATE_MEASUREMENT'; payload: Measurement }
  | { type: 'DELETE_MEASUREMENT'; payload: string };

const initialState: MeasurementsState = {
  measurements: [],
  isLoading: false,
  error: null,
};

function measurementsReducer(state: MeasurementsState, action: MeasurementsAction): MeasurementsState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, measurements: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD_MEASUREMENT':
      return { ...state, measurements: [action.payload, ...state.measurements] };
    case 'UPDATE_MEASUREMENT':
      return {
        ...state,
        measurements: state.measurements.map(m =>
          m.id === action.payload.id ? action.payload : m
        ),
      };
    case 'DELETE_MEASUREMENT':
      return {
        ...state,
        measurements: state.measurements.filter(m => m.id !== action.payload),
      };
    default:
      return state;
  }
}

interface MeasurementsContextType extends MeasurementsState {
  fetchMeasurements: () => Promise<void>;
  addMeasurement: (measurement: Omit<Measurement, 'id' | 'created_at' | 'updated_at'>) => Promise<Measurement>;
  updateMeasurement: (id: string, updates: Partial<Measurement>) => Promise<Measurement>;
  deleteMeasurement: (id: string) => Promise<void>;
}

const MeasurementsContext = createContext<MeasurementsContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MeasurementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(measurementsReducer, initialState);

  const fetchMeasurements = useCallback(async (retryCount = 0) => {
    try {
      dispatch({ type: 'FETCH_START' });

      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      dispatch({ type: 'FETCH_SUCCESS', payload: data || [] });
    } catch (error: any) {
      console.error('Error fetching measurements:', error);
      
      if (
        (error.message?.includes('Failed to fetch') || 
         error.message?.includes('ERR_INSUFFICIENT_RESOURCES')) && 
        retryCount < MAX_RETRIES
      ) {
        await sleep(RETRY_DELAY * (retryCount + 1));
        return fetchMeasurements(retryCount + 1);
      }

      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: 'Failed to fetch measurements. Please check your internet connection and try again.' 
      });
    }
  }, []);

  const addMeasurement = useCallback(async (measurement: Omit<Measurement, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      dispatch({ type: 'FETCH_START' });

      const { data, error } = await supabase
        .from('measurements')
        .insert([measurement])
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'ADD_MEASUREMENT', payload: data });
      return data;
    } catch (error: any) {
      console.error('Error adding measurement:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: 'Failed to add measurement. Please try again.' 
      });
      throw error;
    }
  }, []);

  const updateMeasurement = useCallback(async (id: string, updates: Partial<Measurement>) => {
    try {
      dispatch({ type: 'FETCH_START' });

      const { data, error } = await supabase
        .from('measurements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'UPDATE_MEASUREMENT', payload: data });
      return data;
    } catch (error: any) {
      console.error('Error updating measurement:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: 'Failed to update measurement. Please try again.' 
      });
      throw error;
    }
  }, []);

  const deleteMeasurement = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'FETCH_START' });

      const { error } = await supabase
        .from('measurements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({ type: 'DELETE_MEASUREMENT', payload: id });
    } catch (error: any) {
      console.error('Error deleting measurement:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: 'Failed to delete measurement. Please try again.' 
      });
      throw error;
    }
  }, []);

  return (
    <MeasurementsContext.Provider
      value={{
        ...state,
        fetchMeasurements,
        addMeasurement,
        updateMeasurement,
        deleteMeasurement,
      }}
    >
      {children}
    </MeasurementsContext.Provider>
  );
};

export const useMeasurements = () => {
  const context = useContext(MeasurementsContext);
  if (context === undefined) {
    throw new Error('useMeasurements must be used within a MeasurementsProvider');
  }
  return context;
}; 