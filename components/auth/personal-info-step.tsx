import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, TextField } from '../';
import { useTheme } from '../../contexts/theme-context';

interface PersonalInfoStepProps {
  fullName: string;
  email: string;
  onChange: (field: 'fullName' | 'email', value: string) => void;
  onNext: () => void;
}

export function PersonalInfoStep({ 
  fullName, 
  email,
  onChange, 
  onNext 
}: PersonalInfoStepProps) {
  const { theme } = useTheme();

  const canProceed = fullName.trim() && email.trim();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Tell us about yourself
      </Text>
      
      <View style={styles.form}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(value: string) => onChange('fullName', value)}
          placeholder="Enter your full name"
        />

        <TextField
          label="Email"
          value={email}
          onChange={(value: string) => onChange('email', value)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Continue"
          onPress={onNext}
          disabled={!canProceed}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 16,
  },
}); 