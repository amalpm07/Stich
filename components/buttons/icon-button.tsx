import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { AccessibilityRole, ActivityIndicator, StyleSheet, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native';
import { darkTheme, lightTheme } from '../../constants/theme';

interface IconButtonProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  style?: ViewStyle;
}

export function IconButton({
  iconName,
  onPress,
  size = 24,
  color,
  isLoading = false,
  disabled = false,
  accessibilityLabel = 'Icon Button',
  accessibilityRole = 'button',
  style,
}: IconButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const iconColor = color || theme.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      activeOpacity={0.8}
      style={[styles.iconButtonContainer, { opacity: disabled || isLoading ? 0.6 : 1 }, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <MaterialIcons name={iconName} size={size} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 8,
  },
}); 