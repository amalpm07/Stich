import { useReducer } from 'react';

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount?: number;
}

interface State {
  reviews: Review[];
  isLoading: boolean;
  hasError: boolean;
}

interface Action {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD' | 'HELPFUL';
  payload?: any;
}

const initialState: State = {
  reviews: [],
  isLoading: false,
  hasError: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === 'FETCH_START') return { ...state, isLoading: true, hasError: false };
  if (action.type === 'FETCH_SUCCESS') return { ...state, isLoading: false, reviews: action.payload };
  if (action.type === 'FETCH_ERROR') return { ...state, isLoading: false, hasError: true };
  if (action.type === 'ADD') return { ...state, reviews: [action.payload, ...state.reviews] };
  if (action.type === 'HELPFUL') return { ...state, reviews: state.reviews.map(r => r.id === action.payload ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r) };
  return state;
}

export function useReviews() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchReviews() {
    dispatch({ type: 'FETCH_START' });
    // Fetch logic here
  }

  function addReview(review: Review) {
    dispatch({ type: 'ADD', payload: review });
  }

  function markHelpful(id: string) {
    dispatch({ type: 'HELPFUL', payload: id });
  }

  return {
    ...state,
    fetchReviews,
    addReview,
    markHelpful,
  };
} 