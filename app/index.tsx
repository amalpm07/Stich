import { useRouter } from 'expo-router';
import { Image, Linking, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../components';
import { useTheme } from '../contexts/theme-context';
import { getStatusBarPadding } from '../utils/statusbar-padding';

// Hide Expo Router's default header for this page
export const unstable_settings = { initialRouteName: 'index', headerShown: false };

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.topImageWrapper}>
        <Image
          source={require('../assets/images/welcome-screen-bg.png')}
          style={styles.topImage}
          resizeMode="cover"
          accessible
          accessibilityLabel="Tailoring tools collage"
        />
      </View>
      <View style={[styles.safeArea, { paddingTop: getStatusBarPadding(), backgroundColor: 'transparent' }]}> 
        <View style={styles.centerContent}>
          <Image
            source={require('../assets/images/react-logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="StitchKaro logo"
          />
          <Text style={[styles.heading, { color: theme.text }]}>Welcome to StitchKaro</Text>
          <Text style={[styles.description, { color: theme.text }]}>Discover extraordinary tailoring services delivered to your doorstep by our professional team.</Text>
        </View>
        <View style={styles.bottomContent}>
          <Text style={[styles.privacyText, { color: theme.text }]}>By continuing, you agree to StitchKaro's{' '}
            <Pressable onPress={() => Linking.openURL('https://stitchkaro.com/privacy')} accessibilityRole="link">
              <Text style={[styles.link, { color: theme.primary }]}>Privacy Policy</Text>
            </Pressable>
            {' '}and{' '}
            <Pressable onPress={() => Linking.openURL('https://stitchkaro.com/terms')} accessibilityRole="link">
              <Text style={[styles.link, { color: theme.primary }]}>Terms of Service</Text>
            </Pressable>
          </Text>
          <PrimaryButton
            title="Continue"
            onPress={() => router.push('/auth/login')}
            style={styles.continueButton}
            accessibilityLabel="Continue to login or create account"
          />
          <SecondaryButton
            title="Components"
            onPress={() => router.push('/components')}
            style={styles.continueButton}
            iconName="widgets"
            accessibilityLabel="Go to components showcase page"
          />
          <SecondaryButton
            title="User Onboarding"
            onPress={() => router.push('/auth/user-onboarding')}
            style={styles.continueButton}
            accessibilityLabel="Go to components showcase page"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topImageWrapper: {
    width: '100%',
    // Make sure the image is flush with the top edge, including on Android
    ...Platform.select({
      android: { paddingTop: StatusBar.currentHeight || 0 },
      ios: { paddingTop: 0 },
      default: { paddingTop: 0 },
    }),
  },
  topImage: {
    width: '100%',
    height: 240,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 24,
    marginBottom: 8,
  },
  bottomContent: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  privacyText: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  continueButton: {
    width: '100%',
    marginBottom: 12,
  },
});