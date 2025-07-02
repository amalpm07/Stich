import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface AiPreferences {
  voiceEnabled: boolean;
  personalization: boolean;
}

interface State {
  preferences: AiPreferences;
}

interface Action {
  type: 'TOGGLE_VOICE' | 'TOGGLE_PERSONALIZATION';
}

const initialState: State = {
  preferences: {
    voiceEnabled: false,
    personalization: false,
  },
};

function reducer(state: State, action: Action): State {
  if (action.type === 'TOGGLE_VOICE') return { ...state, preferences: { ...state.preferences, voiceEnabled: !state.preferences.voiceEnabled } };
  if (action.type === 'TOGGLE_PERSONALIZATION') return { ...state, preferences: { ...state.preferences, personalization: !state.preferences.personalization } };
  return state;
}

const AiContext = createContext<{
  state: State;
  toggleVoice: () => void;
  togglePersonalization: () => void;
}>({
  state: initialState,
  toggleVoice: () => {},
  togglePersonalization: () => {},
});

export function AiProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function toggleVoice() {
    dispatch({ type: 'TOGGLE_VOICE' });
  }

  function togglePersonalization() {
    dispatch({ type: 'TOGGLE_PERSONALIZATION' });
  }

  return (
    <AiContext.Provider value={{ state, toggleVoice, togglePersonalization }}>
      {children}
    </AiContext.Provider>
  );
}

export function useAiContext() {
  return useContext(AiContext);
} 