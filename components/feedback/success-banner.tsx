import React from 'react';
import { AccessibilityRole, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SuccessBannerProps {
  message: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function SuccessBanner({
  message,
  actionLabel,
  onAction,
  accessibilityLabel = 'Success Banner',
  accessibilityRole = 'alert',
}: SuccessBannerProps) {
  return (
    <View style={styles.bannerContainer} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole}>
      <Text style={styles.bannerText}>{message}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} accessibilityLabel={actionLabel} style={styles.actionButton}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 8,
  },
  actionText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
}); 