import { useEffect, useState } from 'react';

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function checkReady() {
      try {
        // Platform-specific initialization logic here
        setIsReady(true);
      } catch (e) {
        setHasError(true);
      }
    }
    checkReady();
  }, []);

  return { isReady, hasError };
} 