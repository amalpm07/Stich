import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { getHeaderTitle } from '../../utils/header-title';

export default function MeasurementsLayout() {
  const { theme } = useTheme();
  const router = useRouter();
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
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Measurements', headerTitle: getHeaderTitle('Measurements', theme) }} />
      <Stack.Screen 
        name="create" 
        options={{
          title: 'New Measurement', // Default title
          // Header left will be customized by the screen itself
        }} 
      />
    </Stack>
  );
} 