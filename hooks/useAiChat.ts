import { useReducer } from 'react';

export interface AiMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isLoading?: boolean;
}

interface State {
  messages: AiMessage[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'SEND' | 'RECEIVE' | 'LOADING';
  payload?: any;
}

const initialState: State = {
  messages: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, messages: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'SEND' || action.type === 'RECEIVE') return { ...state, messages: [...state.messages, action.payload] };
  if (action.type === 'LOADING') return { ...state, messages: [...state.messages, { ...action.payload, isLoading: true }] };
  return state;
}

export function useAiChat() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchMessages() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function sendMessage(message: AiMessage) {
    dispatch({ type: 'SEND', payload: message });
  }

  function receiveMessage(message: AiMessage) {
    dispatch({ type: 'RECEIVE', payload: message });
  }

  function setLoading(message: AiMessage) {
    dispatch({ type: 'LOADING', payload: message });
  }

  return {
    ...state,
    fetchMessages,
    sendMessage,
    receiveMessage,
    setLoading,
  };
} 