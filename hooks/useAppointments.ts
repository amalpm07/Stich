import { useEffect, useReducer } from 'react';
import { supabase } from '../clients/supabase';

export interface Appointment {
  id?: string;
  user_id?: string;
  consultant_id?: string;
  address_id?: string | null;
  is_bulk_measurement?: boolean;
  number_of_people?: number;
  appointment_date: string;
  appointment_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  consultation_fee?: number;
  notes?: string;
  name?: string;
  services_id?: string;
  selected_fabrics?: string[];
}

interface State {
  appointments: Appointment[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD' | 'UPDATE' | 'DELETE';
  payload?: any;
  error?: string;
}

const initialState: State = {
  appointments: [],
  isLoading: false,
  hasError: false,
  errorMessage: undefined,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false, errorMessage: undefined };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, appointments: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true, errorMessage: action.error };
  if (action.type === 'ADD') return { ...state, appointments: [action.payload, ...state.appointments] };
  if (action.type === 'UPDATE') return { ...state, appointments: state.appointments.map(a => a.id === action.payload.id ? action.payload : a) };
  if (action.type === 'DELETE') return { ...state, appointments: state.appointments.filter(a => a.id !== action.payload) };
  return state;
}

export function useAppointments() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      dispatch({ type: 'FETCH_START' });
      console.log('Fetching appointments...');
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }
      
      console.log('Appointments fetched successfully:', data);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error in fetchAppointments:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        error: error instanceof Error ? error.message : 'An error occurred while fetching appointments' 
      });
    }
  }

  async function addAppointment(appointment: Omit<Appointment, 'id'>) {
    try {
      dispatch({ type: 'FETCH_START' });
      console.log('Adding appointment:', appointment);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Format the appointment data according to the database schema
      const formattedAppointment = {
        ...appointment,
        user_id: user.id, // Add the user_id to the appointment
        status: 'scheduled', // Default status
        selected_fabrics: appointment.selected_fabrics || [],
        number_of_people: appointment.number_of_people || 1,
        is_bulk_measurement: appointment.is_bulk_measurement || false,
      };

      console.log('Formatted appointment:', formattedAppointment);

      const { data, error } = await supabase
        .from('appointments')
        .insert([formattedAppointment])
        .select()
        .single();

      if (error) {
        console.error('Error adding appointment:', error);
        throw error;
      }
      
      console.log('Appointment added successfully:', data);
      dispatch({ type: 'ADD', payload: data });
      return data;
    } catch (error) {
      console.error('Error in addAppointment:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        error: error instanceof Error ? error.message : 'An error occurred while creating appointment' 
      });
      throw error;
    }
  }

  async function updateAppointment(appointment: Appointment) {
    try {
      dispatch({ type: 'FETCH_START' });
      console.log('Updating appointment:', appointment);
      
      const { data, error } = await supabase
        .from('appointments')
        .update(appointment)
        .eq('id', appointment.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating appointment:', error);
        throw error;
      }
      
      console.log('Appointment updated successfully:', data);
      dispatch({ type: 'UPDATE', payload: data });
      return data;
    } catch (error) {
      console.error('Error in updateAppointment:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        error: error instanceof Error ? error.message : 'An error occurred while updating appointment' 
      });
      throw error;
    }
  }

  async function deleteAppointment(id: string) {
    try {
      dispatch({ type: 'FETCH_START' });
      console.log('Deleting appointment:', id);
      
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting appointment:', error);
        throw error;
      }
      
      console.log('Appointment deleted successfully');
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.error('Error in deleteAppointment:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        error: error instanceof Error ? error.message : 'An error occurred while deleting appointment' 
      });
      throw error;
    }
  }

  return {
    ...state,
    fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
} 