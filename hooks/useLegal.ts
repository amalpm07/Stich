import { useReducer } from 'react';

export interface LegalDocument {
  id: string;
  type: 'terms' | 'privacy';
  version: string;
  accepted: boolean;
  acceptedAt?: string;
}

interface State {
  documents: LegalDocument[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ACCEPT';
  payload?: any;
}

const initialState: State = {
  documents: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, documents: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ACCEPT') return { ...state, documents: state.documents.map(d => d.id === action.payload ? { ...d, accepted: true, acceptedAt: new Date().toISOString() } : d) };
  return state;
}

export function useLegal() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchDocuments() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function acceptDocument(id: string) {
    dispatch({ type: 'ACCEPT', payload: id });
  }

  return {
    ...state,
    fetchDocuments,
    acceptDocument,
  };
} 