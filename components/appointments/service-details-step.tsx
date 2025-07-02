import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { PrimaryButton } from '../buttons/primary-button';
import { SecondaryButton } from '../buttons/secondary-button';
import { TextField } from '../inputs/text-field';

interface ServiceDetailsStepProps {
  name: string;
  notes: string;
  onChange: (field: 'name' | 'notes', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ServiceDetailsStep({ name, notes, onChange, onNext, onBack }: ServiceDetailsStepProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: theme.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Enter Service Details</Text>
        <Text style={[styles.description, { color: theme.muted }]}>Provide a name and any special notes for your appointment. This helps your tailor prepare better for your needs.</Text>
        <View style={styles.fieldsWrapper}>
          <TextField
            label="Appointment Name"
            value={name}
            onChange={v => onChange('name', v)}
            placeholder="e.g. Wedding Suit Fitting"
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Notes for Tailor"
            value={notes}
            onChange={v => onChange('notes', v)}
            placeholder="Any special instructions?"
            multiline
            numberOfLines={4}
            style={{ marginBottom: 20 }}
          />
        </View>
        <View style={styles.spacer} />
        <View style={styles.buttonRow}>
          <SecondaryButton title="Back" onPress={onBack} style={styles.backButton} accessibilityLabel="Go to previous step" />
          <PrimaryButton title="Next" onPress={onNext} style={styles.nextButton} accessibilityLabel="Go to next step" />
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
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },
  fieldsWrapper: {
    marginBottom: 8,
  },
  spacer: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
}); 