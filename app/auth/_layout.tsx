import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { getHeaderTitle } from '../../utils/header-title';

export default function AuthLayout() {
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
      <Stack.Screen name="login" options={{ title: 'Login', headerTitle: getHeaderTitle('Login', theme) }} />
      <Stack.Screen name="create-account" options={{ title: 'Create Account', headerTitle: getHeaderTitle('Create Account', theme) }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Forgot Password', headerTitle: getHeaderTitle('Forgot Password', theme) }} />
      <Stack.Screen name="user-onboarding" options={{ headerShown: false }} />
    </Stack>
  );
} 