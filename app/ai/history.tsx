import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: number;
}

const MOCK_HISTORY: ChatHistoryItem[] = [
  { id: '1', title: 'Order Help', lastMessage: 'Thank you for your help!', updatedAt: Date.now() - 100000 },
  { id: '2', title: 'Tailoring Advice', lastMessage: 'Try a different fabric.', updatedAt: Date.now() - 2000000 },
];

export function AiHistoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  function renderItem({ item }: { item: ChatHistoryItem }) {
    return (
      <Pressable
        onPress={() => router.push(`/ai/${item.id}`)}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border, opacity: pressed ? 0.8 : 1 },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Open chat: ${item.title}`}
      >
        <View style={styles.row}>
          <MaterialIcons name="chat-bubble-outline" size={28} color={theme.primary} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
            <Text style={[styles.lastMessage, { color: theme.muted }]} numberOfLines={1}>{item.lastMessage}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={theme.muted} />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={MOCK_HISTORY}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        accessibilityLabel="Chat history list"
        ListEmptyComponent={<Text style={{ color: theme.muted, textAlign: 'center', marginTop: 32 }}>No chat history yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default AiHistoryScreen; 