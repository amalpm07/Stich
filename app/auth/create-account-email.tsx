import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, TextField } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { useAuthActions } from '../../hooks/useAuthActions';
import { getStatusBarPadding } from '../../utils/statusbar-padding';

export default function CreateAccountEmailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signUpWithEmail } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateAccount() {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    const result = await signUpWithEmail(email, password);
    setIsLoading(false);
    if (result.error) {
      Alert.alert('Account Creation Failed', result.error);
    } else if (result.user) {
      router.replace('/auth/email-verification');
    }
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background, paddingTop: getStatusBarPadding() }]}>  
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Create Account (Email)</Text>
        <TextField
          value={email}
          onChange={setEmail}
          label="Email Address"
          suggestion="Enter your email address."
          placeholder="Email Address"
          keyboardType="email-address"
          accessibilityLabel="Email Address"
        />
        <TextField
          value={password}
          onChange={setPassword}
          label="Password"
          suggestion="Minimum 8 characters."
          placeholder="Password"
          secureTextEntry
          accessibilityLabel="Password"
        />
        <TextField
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          suggestion="Re-enter your password."
          placeholder="Confirm Password"
          secureTextEntry
          accessibilityLabel="Confirm Password"
        />
        <PrimaryButton
          title="Create Account"
          onPress={handleCreateAccount}
          isLoading={isLoading}
          style={styles.createButton}
          accessibilityLabel="Create Account"
        />
        <View style={styles.bottomRow}>
          <Text style={{ color: theme.text }}>Already have an account?</Text>
          <Pressable onPress={() => router.push('/auth/login')} accessibilityRole="link">
            <Text style={[styles.login, { color: theme.primary }]}> Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  createButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
}); 