import { useReducer } from 'react';

export interface SupportItem {
  id: string;
  question: string;
  answer: string;
}

interface State {
  supportItems: SupportItem[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD';
  payload?: any;
}

const initialState: State = {
  supportItems: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, supportItems: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, supportItems: [action.payload, ...state.supportItems] };
  return state;
}

export function useSupport() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchSupportItems() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addSupportItem(item: SupportItem) {
    dispatch({ type: 'ADD', payload: item });
  }

  return {
    ...state,
    fetchSupportItems,
    addSupportItem,
  };
} 