import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { getHeaderTitle } from '../../utils/header-title';

export default function AiLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const segments = useSegments();
  // segments example: ['ai', 'settings'] or ['ai', 'history'] or ['ai', '[id]']
  const currentRoute = segments[segments.length - 1];

  function renderHeaderRight() {
    if (currentRoute === 'settings') return null;
    if (currentRoute === 'history') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <Pressable
            onPress={() => router.push('/ai/settings')}
            accessibilityRole="button"
            accessibilityLabel="AI chat settings"
          >
            <MaterialIcons name="settings" size={24} color={theme.text} />
          </Pressable>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
        <Pressable
          onPress={() => router.push('/ai/history')}
          style={{ marginHorizontal: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Chat history"
        >
          <MaterialIcons name="history" size={24} color={theme.text} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/ai/settings')}
          accessibilityRole="button"
          accessibilityLabel="AI chat settings"
        >
          <MaterialIcons name="settings" size={24} color={theme.text} />
        </Pressable>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable
            onPress={() => router.back()}
            style={{ marginLeft: 4 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <MaterialIcons name="arrow-back" size={26} color={theme.text} />
          </Pressable>
        ),
        headerRight: renderHeaderRight,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'AI Chat', headerTitle: getHeaderTitle('AI Chat', theme) }} />
      <Stack.Screen name="history" options={{ title: 'Chat History', headerTitle: getHeaderTitle('Chat History', theme) }} />
      <Stack.Screen name="settings" options={{ title: 'Settings', headerTitle: getHeaderTitle('Settings', theme) }} />
      <Stack.Screen name="[id]" options={{ title: 'Chat', headerTitle: getHeaderTitle('Chat', theme) }} />
    </Stack>
  );
} 