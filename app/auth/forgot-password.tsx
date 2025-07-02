import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, TextField } from '../../components';
import { useTheme } from '../../contexts/theme-context';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleForgotPassword() {
    setIsLoading(true);
    // TODO: Implement forgot password logic
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>  
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Forgot Password</Text>
        <Text style={[styles.description, { color: theme.text }]}>Enter your phone number to reset your password.</Text>
        <TextField
          value={phone}
          onChange={setPhone}
          label="Phone Number"
          suggestion="Enter your registered mobile number."
          placeholder="Phone Number"
          keyboardType="phone-pad"
          accessibilityLabel="Phone Number"
        />
        <PrimaryButton
          title="Submit"
          onPress={handleForgotPassword}
          isLoading={isLoading}
          style={styles.submitButton}
          accessibilityLabel="Submit phone number to reset password"
        />
        <View style={styles.bottomRow}>
          <Pressable onPress={() => router.push('/auth/login')} accessibilityRole="link">
            <Text style={[styles.login, { color: theme.primary }]}>Back to Login</Text>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    color: '#888',
  },
  submitButton: {
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