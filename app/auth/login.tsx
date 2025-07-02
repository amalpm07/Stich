import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../clients/supabase';
import { PrimaryButton, TextField } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { useAuthActions } from '../../hooks/useAuthActions';
import { getStatusBarPadding } from '../../utils/statusbar-padding';

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const validatePhone = (phoneNumber: string) => {
    // More flexible phone validation
    const phoneRegex = /^\+?[0-9]{10,14}$/;
    if (!phoneNumber) return 'Phone number is required';
    if (!phoneRegex.test(phoneNumber)) return 'Please enter a valid phone number';
    return '';
  };

  const validatePassword = (pass: string) => {
    if (!pass) return 'Password is required';
    if (pass.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  async function handleLogin() {
    try {
      // Validate both fields
      const phoneError = validatePhone(phone);
      const passwordError = validatePassword(password);
      
      if (phoneError || passwordError) {
        setErrors({ phone: phoneError, password: passwordError });
        return;
      }

      setIsLoading(true);
      console.log('Attempting login with phone:', phone); // Debug log
      
      const result = await signIn(phone, password);
      console.log('Login result:', result); // Debug log
      
      if (result.error) {
        console.error('Login error:', result.error); // Debug log
        Alert.alert('Login Failed', result.error);
      } else if (result.user) {
        console.log('Login successful, user:', result.user); // Debug log
        
        // Check if user has completed onboarding
        const { data: userMeta, error: metaError } = await supabase
          .from('user_meta')
          .select('is_onboarded')
          .eq('id', result.user.id)
          .single();

        if (metaError) {
          console.error('Error checking onboarding status:', metaError);
          Alert.alert('Error', 'Failed to check onboarding status');
          return;
        }

        // If not onboarded, redirect to onboarding
        if (!userMeta?.is_onboarded) {
          router.replace('/auth/user-onboarding');
        } else {
          router.replace('/(tabs)');
        }
      }
    } catch (error) {
      console.error('Unexpected login error:', error); // Debug log
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background, paddingTop: getStatusBarPadding() }]}>  
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Sign In</Text>
        <TextField
          value={phone}
          onChange={handlePhoneChange}
          label="Phone Number"
          suggestion="Enter your registered mobile number."
          placeholder="Phone Number"
          keyboardType="phone-pad"
          accessibilityLabel="Phone Number"
          error={errors.phone}
        />
        <TextField
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          suggestion="Enter your password."
          placeholder="Password"
          secureTextEntry
          accessibilityLabel="Password"
          error={errors.password}
        />
        <Pressable onPress={() => router.push('/auth/forgot-password')} style={styles.forgotLink} accessibilityRole="link">
          <Text style={[styles.forgotText, { color: theme.primary }]}>Forgot password?</Text>
        </Pressable>
        <PrimaryButton
          title={isLoading ? "Signing in..." : "Login"}
          onPress={handleLogin}
          isLoading={isLoading}
          style={styles.loginButton}
          accessibilityLabel="Login"
          disabled={isLoading || !!errors.phone || !!errors.password}
        />
        <View style={styles.bottomRow}>
          <Text style={{ color: theme.text }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/auth/create-account')} accessibilityRole="link">
            <Text style={[styles.createAccount, { color: theme.primary }]}> Create Account</Text>
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccount: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
}); 