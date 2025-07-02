import { useReducer } from 'react';

export interface HistoryItem {
  id: string;
  type: 'order' | 'appointment';
  date: string;
  summary: string;
}

interface State {
  history: HistoryItem[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD';
  payload?: any;
}

const initialState: State = {
  history: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, history: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, history: [action.payload, ...state.history] };
  return state;
}

export function useHistory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchHistory() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addHistoryItem(item: HistoryItem) {
    dispatch({ type: 'ADD', payload: item });
  }

  return {
    ...state,
    fetchHistory,
    addHistoryItem,
  };
} 