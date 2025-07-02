import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { AlertModal } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { getHeaderTitle } from '../../utils/header-title';

export default function AppointmentsLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const [showExitModal, setShowExitModal] = useState(false);

  function handleExitPress() {
    setShowExitModal(true);
  }

  function handleExitConfirm() {
    setShowExitModal(false);
    router.replace('/(tabs)');
  }

  function handleExitCancel() {
    setShowExitModal(false);
  }

  return (
    <>
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
              onPress={handleExitPress}
              style={{ marginLeft: 4 }}
              accessibilityRole="button"
              accessibilityLabel="Exit appointment creation"
            >
              <MaterialIcons name="close" size={26} color={theme.text} />
            </Pressable>
          ),
          headerRight: undefined,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Appointments', headerTitle: getHeaderTitle('Appointments', theme) }} />
        <Stack.Screen name="create" options={{ title: 'New Appointment', headerTitle: getHeaderTitle('New Appointment', theme) }} />
        <Stack.Screen name="[id]" options={{ title: 'Appointment Details', headerTitle: getHeaderTitle('Appointment Details', theme) }} />
        <Stack.Screen name="success" options={{ title: 'Success', headerTitle: getHeaderTitle('Success', theme) }} />
        <Stack.Screen name="failure" options={{ title: 'Failed', headerTitle: getHeaderTitle('Failed', theme) }} />
      </Stack>
      <AlertModal
        visible={showExitModal}
        title="Exit Appointment Creation"
        description="Are you sure you want to exit appointment creation? Your progress will be lost."
        confirmLabel="Exit"
        cancelLabel="Cancel"
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
        confirmColor={theme.secondary}
        cancelColor={theme.background}
      />
    </>
  );
} 