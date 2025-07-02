import { useReducer } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

interface State {
  notifications: Notification[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'MARK_READ' | 'ADD';
  payload?: any;
}

const initialState: State = {
  notifications: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, notifications: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, notifications: [action.payload, ...state.notifications] };
  if (action.type === 'MARK_READ') return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
  return state;
}

export function useNotifications() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchNotifications() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addNotification(notification: Notification) {
    dispatch({ type: 'ADD', payload: notification });
  }

  function markRead(id: string) {
    dispatch({ type: 'MARK_READ', payload: id });
  }

  return {
    ...state,
    fetchNotifications,
    addNotification,
    markRead,
  };
} 