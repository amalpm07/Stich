import React from 'react';
import { AccessibilityRole, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  accessibilityLabel = 'Search Bar',
  accessibilityRole = 'search',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} accessibilityLabel="Clear search" style={styles.clearButton}>
          <View style={{ width: 20, height: 20, backgroundColor: '#ccc', borderRadius: 10 }} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  clearButton: {
    marginLeft: 8,
  },
}); 