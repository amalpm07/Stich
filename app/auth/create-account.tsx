import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../clients/supabase';
import { PrimaryButton, TextField } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { useAuthActions } from '../../hooks/useAuthActions';
import { getStatusBarPadding } from '../../utils/statusbar-padding';

export default function CreateAccountScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signUp } = useAuthActions();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validatePhone = (phoneNumber: string) => {
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

  const validateConfirmPassword = (pass: string, confirmPass: string) => {
    if (!confirmPass) return 'Please confirm your password';
    if (pass !== confirmPass) return 'Passwords do not match';
    return '';
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(prev => ({ 
      ...prev, 
      password: validatePassword(value),
      confirmPassword: validateConfirmPassword(value, confirmPassword)
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setErrors(prev => ({ 
      ...prev, 
      confirmPassword: validateConfirmPassword(password, value)
    }));
  };

  async function handleCreateAccount() {
    try {
      console.log('=== Starting Account Creation Process ===');
      console.log('1. Validating input fields...');
      
      // Validate all fields
      const phoneError = validatePhone(phone);
      const passwordError = validatePassword(password);
      const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

      if (phoneError || passwordError || confirmPasswordError) {
        console.log('Validation failed:', { phoneError, passwordError, confirmPasswordError });
        setErrors({
          phone: phoneError,
          password: passwordError,
          confirmPassword: confirmPasswordError
        });
        return;
      }

      console.log('2. Validation passed, preparing API call...');
      console.log('Phone:', phone);
      console.log('Password length:', password.length);
      
      setIsLoading(true);
      console.log('3. Calling signUp API...');

      // Format phone number to ensure it has + prefix
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      console.log('4. Formatted phone number:', formattedPhone);

      const result = await signUp(formattedPhone, password);
      console.log('5. API Response:', result);

      if (result.error) {
        console.error('6. Account creation failed:', result.error);
        Alert.alert('Account Creation Failed', result.error);
      } else if (result.user) {
        console.log('6. Account created successfully:', result.user);
        
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
          Alert.alert(
            'Account Created',
            'Please verify your phone number to login.',
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('7. Navigating to login screen...');
                  router.push('/auth/login');
                }
              }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Unexpected error in account creation:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      console.log('=== Account Creation Process Complete ===');
      setIsLoading(false);
    }
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background, paddingTop: getStatusBarPadding() }]}>  
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Create Account</Text>
        <TextField
          value={phone}
          onChange={handlePhoneChange}
          label="Phone Number"
          suggestion="Enter your 10-digit mobile number."
          placeholder="Phone Number"
          keyboardType="phone-pad"
          accessibilityLabel="Phone Number"
          error={errors.phone}
        />
        <TextField
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          suggestion="Minimum 6 characters."
          placeholder="Password"
          secureTextEntry
          accessibilityLabel="Password"
          error={errors.password}
        />
        <TextField
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label="Confirm Password"
          suggestion="Re-enter your password."
          placeholder="Confirm Password"
          secureTextEntry
          accessibilityLabel="Confirm Password"
          error={errors.confirmPassword}
        />
        <PrimaryButton
          title={isLoading ? "Creating Account..." : "Create Account"}
          onPress={handleCreateAccount}
          isLoading={isLoading}
          style={styles.createButton}
          accessibilityLabel="Create Account"
          disabled={isLoading || !!errors.phone || !!errors.password || !!errors.confirmPassword}
        />
        <Pressable 
          onPress={() => router.push('/auth/create-account-email')} 
          accessibilityRole="link" 
          style={{ alignSelf: 'center', marginBottom: 16 }}
        >
          <Text style={{ color: theme.primary, textDecorationLine: 'underline', fontWeight: '600', fontSize: 15 }}>
            Or create account with Email
          </Text>
        </Pressable>
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