import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../';
import { useTheme } from '../../contexts/theme-context';

interface OnboardingCompleteStepProps {
  onComplete: () => void;
}

export function OnboardingCompleteStep({ onComplete }: OnboardingCompleteStepProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.success }]}>
          <MaterialIcons name="check-circle" size={48} color={theme.white} />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          You're all set!
        </Text>

        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Thank you for completing your profile. You can now explore tailors and services near you.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Go to Home"
          onPress={onComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  footer: {
    paddingVertical: 16,
  },
}); 