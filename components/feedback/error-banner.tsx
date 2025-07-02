import React from 'react';
import { AccessibilityRole, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorBannerProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function ErrorBanner({
  error,
  onRetry,
  onDismiss,
  accessibilityLabel = 'Error Banner',
  accessibilityRole = 'alert',
}: ErrorBannerProps) {
  return (
    <View style={styles.bannerContainer} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole}>
      <Text style={styles.bannerText}>{error}</Text>
      <View style={styles.actionRow}>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} accessibilityLabel="Retry" style={styles.actionButton}>
            <Text style={styles.actionText}>Retry</Text>
          </TouchableOpacity>
        )}
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} accessibilityLabel="Dismiss" style={styles.actionButton}>
            <Text style={styles.actionText}>Dismiss</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    marginHorizontal: 8,
  },
  actionText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
}); 