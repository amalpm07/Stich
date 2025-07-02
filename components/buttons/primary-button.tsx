import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { AccessibilityRole, ActivityIndicator, StyleSheet, Text, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native';
import { darkTheme, lightTheme } from '../../constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  style?: ViewStyle;
}

export function PrimaryButton({
  title,
  onPress,
  iconName,
  isLoading = false,
  disabled = false,
  accessibilityLabel = 'Primary Button',
  accessibilityRole = 'button',
  style,
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      activeOpacity={0.8}
      style={[styles.buttonContainer, { backgroundColor: theme.primary, opacity: disabled || isLoading ? 0.6 : 1 }, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.text} style={{ marginRight: 8 }} />
      ) : iconName ? (
        <MaterialIcons name={iconName} size={20} color={theme.white} style={{ marginRight: 8 }} />
      ) : null}
      <Text style={[styles.buttonText, { color: '#FFF' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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