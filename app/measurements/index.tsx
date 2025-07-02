import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../../components/buttons/primary-button';
import { Measurement, useMeasurements } from '../../contexts/measurements-context';
import { useTheme } from '../../contexts/theme-context';

export default function MeasurementsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { measurements, isLoading, error, fetchMeasurements } = useMeasurements();

  useEffect(() => {
    fetchMeasurements();
  }, [fetchMeasurements]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
        <PrimaryButton
          title="Retry"
          onPress={fetchMeasurements}
          accessibilityLabel="Retry loading measurements"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="Measurements screen"
    >
      <View style={styles.addButtonContainer}>
        <PrimaryButton
          title="Add New Measurement"
          onPress={() => router.push('/measurements/create')}
          accessibilityLabel="Add a new measurement profile"
        />
      </View>

      {measurements.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="straighten" size={48} color={theme.muted} />
          <Text style={[styles.emptyStateText, { color: theme.muted }]}>
            No measurements yet. Add your first measurement profile!
          </Text>
        </View>
      ) : (
        measurements.map((profile: Measurement) => (
          <View key={profile.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.headerRow}>
              <MaterialIcons name="straighten" size={26} color={theme.primary} style={{ marginRight: 14 }} />
              <Text style={[styles.profileName, { color: theme.text }]}>
                {profile.measurement_type.charAt(0).toUpperCase() + profile.measurement_type.slice(1)}
              </Text>
            </View>
            <Text style={[styles.updated, { color: theme.muted }]}>
              Last updated: {formatDate(profile.updated_at)}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                { backgroundColor: theme.secondary, opacity: pressed ? 0.8 : 1 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`View or edit ${profile.measurement_type} measurements`}
              onPress={() => router.push(`/measurements/${profile.id}`)}
            >
              <MaterialIcons name="edit" size={20} color={theme.white} style={{ marginRight: 6 }} />
              <Text style={[styles.editButtonText, { color: theme.white }]}>View / Edit</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  updated: {
    fontSize: 14,
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    elevation: 1,
  },
  editButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  scrollViewContent: {
    padding: 24,
  },
  addButtonContainer: {
    marginBottom: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
}); 