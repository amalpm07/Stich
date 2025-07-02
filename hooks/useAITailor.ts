import { useReducer } from 'react';

export interface Recommendation {
  id: string;
  type: 'measurement' | 'style' | 'fabric';
  value: string;
}

interface State {
  recommendations: Recommendation[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD';
  payload?: any;
}

const initialState: State = {
  recommendations: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, recommendations: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, recommendations: [action.payload, ...state.recommendations] };
  return state;
}

export function useAITailor() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchRecommendations() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addRecommendation(rec: Recommendation) {
    dispatch({ type: 'ADD', payload: rec });
  }

  return {
    ...state,
    fetchRecommendations,
    addRecommendation,
  };
} 