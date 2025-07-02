import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { AccessibilityRole, ActivityIndicator, StyleSheet, Text, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native';
import { darkTheme, lightTheme } from '../../constants/theme';

interface TertiaryButtonProps {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  style?: ViewStyle;
}

export function TertiaryButton({
  title,
  onPress,
  iconName,
  isLoading = false,
  disabled = false,
  accessibilityLabel = 'Tertiary Button',
  accessibilityRole = 'button',
  style,
}: TertiaryButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      activeOpacity={0.8}
      style={[
        styles.buttonContainer,
        { opacity: disabled || isLoading ? 0.6 : 1 },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.primary} style={{ marginRight: 8 }} />
      ) : iconName ? (
        <MaterialIcons name={iconName} size={20} color={theme.primary} style={{ marginRight: 8 }} />
      ) : null}
      <Text style={[styles.buttonText, { color: theme.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 58,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 