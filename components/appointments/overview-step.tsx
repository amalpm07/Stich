import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { PrimaryButton } from '../buttons/primary-button';
import { SecondaryButton } from '../buttons/secondary-button';

interface OverviewStepProps {
  serviceName: string;
  appointmentName: string;
  notes: string;
  date: string;
  time: string;
  address: string;
  fabrics: string[];
  onBack: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function OverviewStep({ serviceName, appointmentName, notes, date, time, address, fabrics, onBack, onSubmit, isLoading = false }: OverviewStepProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: theme.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Appointment Overview</Text>
        <Text style={[styles.description, { color: theme.muted }]}>Review all your details before scheduling your appointment. Make sure everything looks correct.</Text>
        <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.summaryRow}><Text style={styles.label}>Service:</Text><Text style={[styles.value, { color: theme.text }]}>{serviceName}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.label}>Appointment Name:</Text><Text style={[styles.value, { color: theme.text }]}>{appointmentName}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.label}>Notes:</Text><Text style={[styles.value, { color: theme.text }]}>{notes}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.label}>Date & Time:</Text><Text style={[styles.value, { color: theme.text }]}>{date} at {time}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.label}>Address:</Text><Text style={[styles.value, { color: theme.text }]}>{address}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.label}>Fabrics:</Text><Text style={[styles.value, { color: theme.text }]}>{fabrics.length ? fabrics.join(', ') : 'None selected'}</Text></View>
        </View>
        <View style={styles.spacer} />
        <View style={styles.bottomButtonsContainer}>
          <PrimaryButton
            title={isLoading ? "Scheduling..." : "Schedule Appointment"}
            onPress={onSubmit}
            iconName="check-circle"
            style={styles.fullWidthButton}
            accessibilityLabel="Schedule appointment"
            disabled={isLoading}
          />
          <SecondaryButton
            title="Back"
            onPress={onBack}
            style={styles.fullWidthButton}
            accessibilityLabel="Go to previous step"
            disabled={isLoading}
          />
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
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    color: '#888',
    minWidth: 110,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
  spacer: {
    flex: 1,
  },
  bottomButtonsContainer: {
    width: '100%',
    marginTop: 8,
    marginBottom: 0,
  },
  fullWidthButton: {
    width: '100%',
    marginVertical: 6,
  },
}); 