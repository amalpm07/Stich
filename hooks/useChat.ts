import { useReducer } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tailor';
  text: string;
  timestamp: string;
  isRead?: boolean;
}

interface State {
  messages: ChatMessage[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'SEND' | 'RECEIVE' | 'MARK_READ';
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
  if (action.type === 'MARK_READ') return { ...state, messages: state.messages.map(m => m.id === action.payload ? { ...m, isRead: true } : m) };
  return state;
}

export function useChat() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchMessages() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function sendMessage(message: ChatMessage) {
    dispatch({ type: 'SEND', payload: message });
  }

  function receiveMessage(message: ChatMessage) {
    dispatch({ type: 'RECEIVE', payload: message });
  }

  function markRead(id: string) {
    dispatch({ type: 'MARK_READ', payload: id });
  }

  return {
    ...state,
    fetchMessages,
    sendMessage,
    receiveMessage,
    markRead,
  };
} 