import { useReducer } from 'react';

export interface Referral {
  id: string;
  code: string;
  invitedUser: string;
  reward: string;
  status: 'pending' | 'completed';
}

interface State {
  referrals: Referral[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD' | 'UPDATE';
  payload?: any;
}

const initialState: State = {
  referrals: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, referrals: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, referrals: [action.payload, ...state.referrals] };
  if (action.type === 'UPDATE') return { ...state, referrals: state.referrals.map(r => r.id === action.payload.id ? action.payload : r) };
  return state;
}

export function useReferral() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchReferrals() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addReferral(referral: Referral) {
    dispatch({ type: 'ADD', payload: referral });
  }

  function updateReferral(referral: Referral) {
    dispatch({ type: 'UPDATE', payload: referral });
  }

  return {
    ...state,
    fetchReferrals,
    addReferral,
    updateReferral,
  };
} 