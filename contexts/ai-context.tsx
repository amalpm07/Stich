import React from 'react';
import { AiProvider } from '../hooks/useAiContext';

export function AiContextProvider({ children }: { children: React.ReactNode }) {
  return <AiProvider>{children}</AiProvider>;
} 