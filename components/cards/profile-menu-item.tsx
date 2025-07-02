import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

export interface ProfileMenuItemProps {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  accessibilityLabel?: string;
}

export function ProfileMenuItem({ label, icon, onPress, accessibilityLabel }: ProfileMenuItemProps) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? theme.card + 'ee' : theme.card,
          borderColor: theme.border,
          shadowColor: theme.text + '10',
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      onPress={onPress}
    >
      <View style={styles.iconLabelRow}>
        <MaterialIcons name={icon} size={32} color={theme.primary} style={{ marginRight: 22 }} />
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={32} color={theme.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 14,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 64,
    borderWidth: 1,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
}); 