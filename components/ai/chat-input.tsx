import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ChatInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  onVoice?: () => void;
  isVoiceEnabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, onVoice, isVoiceEnabled }: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Type a message..."
        accessibilityLabel="Chat input"
        returnKeyType="send"
        onSubmitEditing={onSend}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSend} accessibilityLabel="Send message" style={styles.sendButton}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      {isVoiceEnabled && onVoice && (
        <TouchableOpacity onPress={onVoice} accessibilityLabel="Voice input" style={styles.voiceButton}>
          <Text style={styles.buttonText}>🎤</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 4,
  },
  voiceButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#34C759',
    borderRadius: 8,
    marginLeft: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 