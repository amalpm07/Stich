import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SuggestionChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export function SuggestionChip({ label, selected, onPress }: SuggestionChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#E5E5EA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    color: '#222',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
}); 