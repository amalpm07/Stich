import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export function AiChatScreen() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai', timestamp: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text: input, sender: 'user', timestamp: Date.now() },
    ]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }

  function renderItem({ item }: { item: ChatMessage }) {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            backgroundColor: isUser ? theme.primary : theme.card,
            borderTopLeftRadius: isUser ? 18 : 4,
            borderTopRightRadius: isUser ? 4 : 18,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            marginBottom: 10,
          },
        ]}
        accessibilityLabel={isUser ? 'Your message' : 'AI message'}
      >
        <Text style={{ color: isUser ? theme.white : theme.text, fontSize: 16 }}>{item.text}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Chat messages"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
        style={styles.inputBarWrapper}
      >
        <View style={[styles.inputBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Type your message..."
            placeholderTextColor={theme.muted}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            accessible
            accessibilityLabel="Message input"
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            disabled={!input.trim()}
          >
            <MaterialIcons name="send" size={24} color={input.trim() ? theme.primary : theme.muted} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  inputBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 40,
    paddingHorizontal: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 6,
  },
});

export default AiChatScreen; 