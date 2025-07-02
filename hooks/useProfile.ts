import { useReducer } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

interface State {
  profile: UserProfile | null;
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'UPDATE';
  payload?: any;
}

const initialState: State = {
  profile: null,
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, profile: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'UPDATE') return { ...state, profile: action.payload };
  return state;
}

export function useProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchProfile() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function updateProfile(profile: UserProfile) {
    dispatch({ type: 'UPDATE', payload: profile });
  }

  return {
    ...state,
    fetchProfile,
    updateProfile,
  };
} 