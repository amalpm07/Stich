import { router } from 'expo-router';
import { useReducer } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../clients/supabase';
import { GenderSelectionStep, LocationStep, OnboardingCompleteStep, PersonalInfoStep } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { useAddresses } from '../../hooks/useAddresses';
import { useAuth } from '../../hooks/useAuth';
import { useUserMeta } from '../../hooks/useUserMeta';

const steps = [
  'Personal Info',
  'Gender',
  'Location',
  'Complete'
];

interface State {
  step: number;
  fullName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  address: {
    formatted_address: string;
    lat: number;
    lng: number;
  } | null;
  isComplete: boolean;
  error: string | null;
}

type Action =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'UPDATE_PERSONAL_INFO'; field: 'fullName' | 'email'; value: string }
  | { type: 'SELECT_GENDER'; value: 'Male' | 'Female' | 'Other' }
  | { type: 'UPDATE_ADDRESS'; address: { formatted_address: string; lat: number; lng: number; } }
  | { type: 'USE_CURRENT_LOCATION' }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'COMPLETE_ONBOARDING' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, steps.length - 1), error: null };
    case 'PREV':
      return { ...state, step: Math.max(state.step - 1, 0), error: null };
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, [action.field]: action.value, error: null };
    case 'SELECT_GENDER':
      return { ...state, gender: action.value, error: null };
    case 'UPDATE_ADDRESS':
      return { ...state, address: action.address, error: null };
    case 'USE_CURRENT_LOCATION':
      return { 
        ...state, 
        address: {
          formatted_address: 'Current Location',
          lat: 0,
          lng: 0
        },
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'COMPLETE_ONBOARDING':
      return { ...state, isComplete: true, error: null };
    default:
      return state;
  }
}

const initialState: State = {
  step: 0,
  fullName: '',
  email: '',
  gender: null,
  address: null,
  isComplete: false,
  error: null
};

export default function UserOnboardingScreen() {
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();
  const { addOnboardingAddress } = useAddresses();
  const { createUserMeta, setDefaultAddress } = useUserMeta();

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!state.fullName || !state.email) {
          dispatch({ type: 'SET_ERROR', error: 'Please fill in all fields' });
          return false;
        }
        if (!state.email.includes('@')) {
          dispatch({ type: 'SET_ERROR', error: 'Please enter a valid email' });
          return false;
        }
        return true;
      case 1:
        if (!state.gender) {
          dispatch({ type: 'SET_ERROR', error: 'Please select a gender' });
          return false;
        }
        return true;
      case 2:
        if (!state.address) {
          dispatch({ type: 'SET_ERROR', error: 'Please provide your location' });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(state.step)) {
      dispatch({ type: 'NEXT' });
    }
  };

  const handleComplete = async () => {
    try {
      if (!user?.id) {
        dispatch({ type: 'SET_ERROR', error: 'User not authenticated' });
        return;
      }

      // Update existing user metadata
      const { error: updateError } = await supabase
        .from('user_meta')
        .update({
          full_name: state.fullName,
          email: state.email,
          gender: state.gender,
          is_onboarded: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating user metadata:', updateError);
        dispatch({ type: 'SET_ERROR', error: 'Failed to save user details' });
        return;
      }

      // Then add their address if they provided one
      if (state.address) {
        const addressResult = await addOnboardingAddress(state.address);
        if (addressResult?.id) {
          // Set as default address if successfully created
          await setDefaultAddress(user.id, addressResult.id);
        } else {
          console.warn('Failed to save address, but continuing with onboarding');
        }
      }

      dispatch({ type: 'COMPLETE_ONBOARDING' });
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Onboarding error:', error);
      dispatch({ type: 'SET_ERROR', error: error.message || 'An error occurred during registration' });
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {state.error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.error }]}>{state.error}</Text>
          </View>
        )}
        
        {state.step === 0 ? (
          <PersonalInfoStep
            fullName={state.fullName}
            email={state.email}
            onChange={(field: 'fullName' | 'email', value: string) => 
              dispatch({ type: 'UPDATE_PERSONAL_INFO', field, value })}
            onNext={handleNext}
          />
        ) : state.step === 1 ? (
          <GenderSelectionStep
            selectedGender={state.gender}
            onSelect={(value: 'Male' | 'Female' | 'Other') => dispatch({ type: 'SELECT_GENDER', value })}
            onNext={handleNext}
            onBack={() => dispatch({ type: 'PREV' })}
          />
        ) : state.step === 2 ? (
          <LocationStep
            address={state.address?.formatted_address || ''}
            onUpdateAddress={(address: { formatted_address: string; lat: number; lng: number }) => 
              dispatch({ type: 'UPDATE_ADDRESS', address })}
            onUseCurrentLocation={() => dispatch({ type: 'USE_CURRENT_LOCATION' })}
            onNext={handleNext}
            onBack={() => dispatch({ type: 'PREV' })}
          />
        ) : (
          <OnboardingCompleteStep
            onComplete={handleComplete}
          />
        )}
      </View>
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
    paddingHorizontal: 16,
  },
  errorContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
