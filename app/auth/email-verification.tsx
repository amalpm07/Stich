import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, SuccessBanner } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { getStatusBarPadding } from '../../utils/statusbar-padding';

export default function EmailVerificationScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background, paddingTop: getStatusBarPadding() }]}>  
      <View style={styles.container}>
        <SuccessBanner
          message="A verification email has been sent to your email address. Please check your inbox and click the link to verify your account."
        />
        <Text style={[styles.info, { color: theme.text }]}>After verifying, you can log in with your email and password.</Text>
        <PrimaryButton
          title="Go to Login"
          onPress={() => router.push('/auth/login')}
          style={styles.loginButton}
          accessibilityLabel="Go to Login"
        />
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
  info: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 16,
  },
}); 