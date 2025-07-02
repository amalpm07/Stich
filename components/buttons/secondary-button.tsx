import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { AccessibilityRole, ActivityIndicator, StyleSheet, Text, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native';
import { darkTheme, lightTheme } from '../../constants/theme';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  style?: ViewStyle;
}

export function SecondaryButton({
  title,
  onPress,
  iconName,
  isLoading = false,
  disabled = false,
  accessibilityLabel = 'Secondary Button',
  accessibilityRole = 'button',
  style,
}: SecondaryButtonProps) {
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
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: 2,
          opacity: disabled || isLoading ? 0.6 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colorScheme === 'dark' ? theme.text : '#222'} style={{ marginRight: 8 }} />
      ) : iconName ? (
        <MaterialIcons name={iconName} size={20} color={colorScheme === 'dark' ? theme.text : '#222'} style={{ marginRight: 8 }} />
      ) : null}
      <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? theme.text : '#222' }]}>{title}</Text>
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