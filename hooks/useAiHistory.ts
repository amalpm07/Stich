import { useReducer } from 'react';

export interface AiConversation {
  id: string;
  title: string;
  messages: string[];
  date: string;
}

interface State {
  conversations: AiConversation[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD' | 'DELETE';
  payload?: any;
}

const initialState: State = {
  conversations: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, conversations: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, conversations: [action.payload, ...state.conversations] };
  if (action.type === 'DELETE') return { ...state, conversations: state.conversations.filter(c => c.id !== action.payload) };
  return state;
}

export function useAiHistory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchConversations() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addConversation(conversation: AiConversation) {
    dispatch({ type: 'ADD', payload: conversation });
  }

  function deleteConversation(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return {
    ...state,
    fetchConversations,
    addConversation,
    deleteConversation,
  };
} 