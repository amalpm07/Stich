import { useReducer } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../clients/supabase';
import {
  AddressSelectionStep,
  DateTimeStep,
  FabricSelectionStep,
  OverviewStep,
  ServiceDetailsStep,
  ServiceSelectionStep
} from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { useAppointments } from '../../hooks/useAppointments';

const steps = [
  'Service',
  'Details',
  'Date & Time',
  'Address',
  'Fabric',
  'Overview',
];

interface State {
  step: number;
  selectedService?: any;
  appointmentName: string;
  notes: string;
  date: string;
  time: string;
  selectedAddressId?: string;
  selectedFabricIds: string[];
  submitted: boolean;
}

type Action =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SELECT_SERVICE'; service: any }
  | { type: 'UPDATE_DETAILS'; field: 'name' | 'notes'; value: string }
  | { type: 'UPDATE_DATE_TIME'; field: 'date' | 'time'; value: string }
  | { type: 'SELECT_ADDRESS'; addressId: string }
  | { type: 'TOGGLE_FABRIC'; id: string }
  | { type: 'SKIP_FABRIC' }
  | { type: 'SUBMIT' }
  | { type: 'USE_CURRENT_LOCATION' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, steps.length - 1) };
    case 'PREV':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'SELECT_SERVICE':
      return { ...state, selectedService: action.service };
    case 'UPDATE_DETAILS':
      return { ...state, appointmentName: action.field === 'name' ? action.value : state.appointmentName, notes: action.field === 'notes' ? action.value : state.notes };
    case 'UPDATE_DATE_TIME':
      return { ...state, [action.field]: action.value };
    case 'SELECT_ADDRESS':
      return { ...state, selectedAddressId: action.addressId };
    case 'TOGGLE_FABRIC':
      return {
        ...state,
        selectedFabricIds: state.selectedFabricIds.includes(action.id)
          ? state.selectedFabricIds.filter(id => id !== action.id)
          : [...state.selectedFabricIds, action.id],
      };
    case 'SKIP_FABRIC':
      return { ...state, step: state.step + 1 };
    case 'SUBMIT':
      return { ...state, submitted: true };
    case 'USE_CURRENT_LOCATION':
      return { ...state, selectedAddressId: 'current_location' };
    default:
      return state;
  }
}

const initialState: State = {
  step: 0,
  selectedService: undefined,
  appointmentName: '',
  notes: '',
  date: '',
  time: '',
  selectedAddressId: undefined,
  selectedFabricIds: [],
  submitted: false,
};

export default function CreateAppointmentScreen() {
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addAppointment, isLoading, hasError, errorMessage } = useAppointments();

  const handleSubmit = async () => {
    try {
      // Get the current user's ID from Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create appointment data
      const appointmentData = {
        user_id: user.id,
        appointment_date: state.date,
        appointment_time: state.time,
        services_id: state.selectedService?.id,
        status: 'scheduled' as const,
        name: state.appointmentName,
        notes: state.notes,
        address_id: state.selectedAddressId === 'current_location' ? null : state.selectedAddressId,
        selected_fabrics: state.selectedFabricIds,
        number_of_people: 1,
        is_bulk_measurement: false,
      };

      console.log('Submitting appointment:', appointmentData);
      await addAppointment(appointmentData);
      dispatch({ type: 'SUBMIT' });
    } catch (error) {
      console.error('Failed to create appointment:', error);
      // The error will be handled by the useAppointments hook
    }
  };

  const handleAddressSelect = (addressId: string) => {
    dispatch({ type: 'SELECT_ADDRESS', addressId });
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}> 
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {state.submitted ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: theme.success, marginBottom: 16 }}>Appointment Scheduled!</Text>
            <Text style={{ color: theme.text }}>Thank you for booking with StitchKaro.</Text>
          </View>
        ) : hasError ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: theme.error, marginBottom: 16 }}>Error</Text>
            <Text style={{ color: theme.text }}>{errorMessage || 'Failed to create appointment'}</Text>
          </View>
        ) : state.step === 0 ? (
          <ServiceSelectionStep
            selectedServiceId={state.selectedService?.id}
            onSelect={service => dispatch({ type: 'SELECT_SERVICE', service })}
            onNext={() => dispatch({ type: 'NEXT' })}
          />
        ) : state.step === 1 ? (
          <ServiceDetailsStep
            name={state.appointmentName}
            notes={state.notes}
            onChange={(field, value) => dispatch({ type: 'UPDATE_DETAILS', field, value })}
            onNext={() => dispatch({ type: 'NEXT' })}
            onBack={() => dispatch({ type: 'PREV' })}
          />
        ) : state.step === 2 ? (
          <DateTimeStep
            date={state.date}
            time={state.time}
            onChange={(field, value) => dispatch({ type: 'UPDATE_DATE_TIME', field, value })}
            onNext={() => dispatch({ type: 'NEXT' })}
            onBack={() => dispatch({ type: 'PREV' })}
          />
        ) : state.step === 3 ? (
          <AddressSelectionStep
            selectedAddressId={state.selectedAddressId}
            onSelect={handleAddressSelect}
            onNext={() => dispatch({ type: 'NEXT' })}
            onBack={() => dispatch({ type: 'PREV' })}
            onUseCurrentLocation={() => {
              dispatch({ type: 'USE_CURRENT_LOCATION' });
            }}
          />
        ) : state.step === 4 ? (
          <FabricSelectionStep
            selectedFabricIds={state.selectedFabricIds}
            onToggle={id => dispatch({ type: 'TOGGLE_FABRIC', id })}
            onNext={() => dispatch({ type: 'NEXT' })}
            onBack={() => dispatch({ type: 'PREV' })}
            onSkip={() => dispatch({ type: 'SKIP_FABRIC' })}
          />
        ) : state.step === 5 ? (
          <OverviewStep
            serviceName={state.selectedService?.name || ''}
            appointmentName={state.appointmentName}
            notes={state.notes}
            date={state.date}
            time={state.time}
            address={state.selectedAddressId === 'current_location' ? 'Current Location' : state.selectedAddressId || ''}
            fabrics={state.selectedFabricIds}
            onBack={() => dispatch({ type: 'PREV' })}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
}); 