import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'ai';
  timestamp?: string;
  isLoading?: boolean;
}

export function ChatBubble({ message, sender, timestamp, isLoading }: ChatBubbleProps) {
  const isUser = sender === 'user';
  return (
    <View
      style={[
        styles.bubble,
        {
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          backgroundColor: isUser ? '#007AFF' : '#E5E5EA',
        },
      ]}
      accessibilityLabel={isUser ? 'Your message' : 'AI message'}
    >
      <Text style={[styles.messageText, { color: isUser ? '#fff' : '#222' }]}>
        {isLoading ? '...' : message}
      </Text>
      {timestamp && (
        <Text style={[styles.messageText, { fontSize: 10, opacity: 0.6, color: isUser ? '#fff' : '#222' }]}>
          {timestamp}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
}); 