import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from '../constants/theme';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  themePreference: ThemePreference;
  setAppTheme: (preference: ThemePreference) => Promise<void>;
}

const THEME_STORAGE_KEY = '@app_theme_preference';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme(); // light or dark
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [currentTheme, setCurrentTheme] = useState<Theme>(systemColorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    async function loadThemePreference() {
      try {
        const storedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;
        if (storedPreference) {
          setThemePreference(storedPreference);
        } else {
          // If no preference stored, default to system and save it
          await AsyncStorage.setItem(THEME_STORAGE_KEY, 'system');
        }
      } catch (error) {
        console.error('Failed to load theme preference.', error);
        // Default to system theme in case of error
        setThemePreference('system');
      }
    }
    loadThemePreference();
  }, []);

  useEffect(() => {
    let newTheme: Theme;
    if (themePreference === 'light') {
      newTheme = lightTheme;
    } else if (themePreference === 'dark') {
      newTheme = darkTheme;
    } else { // 'system'
      newTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    setCurrentTheme(newTheme);
    // Optionally, if you want to force React Native's Appearance module (useful for some native components)
    // Appearance.setColorScheme(themePreference === 'system' ? null : themePreference);

  }, [themePreference, systemColorScheme]);

  async function setAppTheme(preference: ThemePreference) {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
      setThemePreference(preference);
    } catch (error) {
      console.error('Failed to save theme preference.', error);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, themePreference, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
} 