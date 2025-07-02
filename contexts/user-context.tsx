import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProfile, UserProfile } from '../services/profileService';

interface State {
  profile: UserProfile | null;
  isLoading: boolean;
  hasError: boolean;
}

type Action =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'CLEAR_PROFILE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: boolean };

const initialState: State = {
  profile: null,
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, isLoading: false, hasError: false };
    case 'CLEAR_PROFILE':
      return { ...state, profile: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, hasError: action.payload };
    default:
      return state;
  }
}

const UserContext = createContext<{
  profile: UserProfile | null;
  isLoading: boolean;
  hasError: boolean;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
} | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  const setProfile = useCallback((profile: UserProfile) => {
    dispatch({ type: 'SET_PROFILE', payload: profile });
  }, []);

  const clearProfile = useCallback(() => {
    dispatch({ type: 'CLEAR_PROFILE' });
  }, []);

  useEffect(() => {
    async function fetchAndSetProfile() {
      if (user?.id) {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const profile = await getProfile(user.id);
          dispatch({ type: 'SET_PROFILE', payload: profile });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: true });
        }
      } else {
        dispatch({ type: 'CLEAR_PROFILE' });
      }
    }
    fetchAndSetProfile();
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        profile: state.profile,
        isLoading: state.isLoading,
        hasError: state.hasError,
        setProfile,
        clearProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
} 