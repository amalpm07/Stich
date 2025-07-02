import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { getHeaderTitle } from '../../utils/header-title';

export default function ProfileLayout() {
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
      <Stack.Screen name="account-details" options={{ title: 'Account Details', headerTitle: getHeaderTitle('Account Details', theme) }} />
      <Stack.Screen name="find-store" options={{ title: 'Find Store', headerTitle: getHeaderTitle('Find Store', theme) }} />
      <Stack.Screen name="support" options={{ title: 'Support', headerTitle: getHeaderTitle('Support', theme) }} />
      <Stack.Screen name="application-settings" options={{ title: 'Application Settings', headerTitle: getHeaderTitle('Application Settings', theme) }} />
      <Stack.Screen name="about-stitchkaro" options={{ title: 'About StitchKaro', headerTitle: getHeaderTitle('About StitchKaro', theme) }} />
      <Stack.Screen name="coupons" options={{ title: 'Coupons', headerTitle: getHeaderTitle('Coupons', theme) }} />
    </Stack>
  );
} 