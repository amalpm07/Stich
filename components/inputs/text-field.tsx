import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { AccessibilityRole, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

interface TextFieldProps {
  value: string;
  onChange: (text: string) => void;
  label?: string;
  suggestion?: string;
  placeholder?: string;
  error?: string;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  multiline?: boolean;
  numberOfLines?: number;
  style?: TextInputProps['style'];
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
}

export function TextField({
  value,
  onChange,
  label,
  suggestion,
  placeholder = '',
  error,
  accessibilityLabel = 'Text Field',
  accessibilityRole = 'text',
  multiline = false,
  numberOfLines = 4,
  style,
  keyboardType,
  secureTextEntry,
}: TextFieldProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleTogglePassword() {
    setIsPasswordVisible((prev) => !prev);
  }

  const isPasswordField = !!secureTextEntry && !multiline;

  return (
    <View style={{ marginBottom: error ? 4 : 16 }}>
      {label && (
        <Text
          style={[styles.label, { color: theme.text }]}
          accessibilityLabel={label}
        >
          {label}
        </Text>
      )}
      <View style={{ position: 'relative', justifyContent: 'center' }}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole}
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: isFocused ? theme.primary : theme.border,
              minHeight: !multiline ? 58 : undefined, // Match PrimaryButton height for single-line
              paddingRight: isPasswordField ? 44 : 14, // space for icon
            },
            multiline && { minHeight: 40 + (numberOfLines - 1) * 24, textAlignVertical: 'top' },
            style,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          accessible
          accessibilityHint={placeholder}
          returnKeyType={multiline ? 'default' : 'done'}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          secureTextEntry={isPasswordField ? !isPasswordVisible : false}
        />
        {isPasswordField && (
          <TouchableOpacity
            onPress={handleTogglePassword}
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            style={styles.iconButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={22}
              color={theme.muted}
            />
          </TouchableOpacity>
        )}
      </View>
      {suggestion && !error && (
        <Text style={[styles.suggestion, { color: theme.muted }]} accessibilityLabel={suggestion}>{suggestion}</Text>
      )}
      {error && <Text style={[styles.error, { color: theme.error }]} accessibilityRole="alert">{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 0,
    transitionDuration: '150ms',
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 2,
  },
  suggestion: {
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },
  error: {
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },
}); 