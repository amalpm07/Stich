import React from 'react';
import { AccessibilityRole, StyleSheet, TouchableOpacity } from 'react-native';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function FloatingActionButton({
  icon,
  onPress,
  accessibilityLabel = 'Floating Action Button',
  accessibilityRole = 'button',
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      activeOpacity={0.8}
      style={styles.fabContainer}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
}); 