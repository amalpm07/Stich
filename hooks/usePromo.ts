import { useReducer } from 'react';

export interface Promo {
  code: string;
  discount: number;
  isValid: boolean;
  expiresAt: string;
}

interface State {
  promos: Promo[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'APPLY';
  payload?: any;
}

const initialState: State = {
  promos: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, promos: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'APPLY') return { ...state, promos: state.promos.map(p => p.code === action.payload.code ? { ...p, isValid: true } : p) };
  return state;
}

export function usePromo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchPromos() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function applyPromo(code: string) {
    dispatch({ type: 'APPLY', payload: { code } });
  }

  return {
    ...state,
    fetchPromos,
    applyPromo,
  };
} 