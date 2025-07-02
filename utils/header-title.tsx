import React from 'react';
import { Platform, Text, View } from 'react-native';

/**
 * Returns a header title component or string for use in expo-router Stack screens.
 * On Android, returns a custom component for better alignment; on iOS, returns the plain string.
 * @param title - The header title text
 * @param theme - The theme object containing at least a 'text' color
 */
export interface HeaderTheme {
  text: string;
}

export function getHeaderTitle(
  title: string,
  theme: HeaderTheme
): string | (() => React.ReactNode) {
  if (Platform.OS === 'android') {
    return function HeaderTitle() {
      return (
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.text }}>{title}</Text>
        </View>
      );
    };
  }
  return title;
} 