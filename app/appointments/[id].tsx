import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../clients/supabase';
import { useTheme } from '../../contexts/theme-context';
import { Appointment } from '../../hooks/useAppointments';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setAppointment(data);
      } catch (err) {
        console.error('Error fetching appointment:', err);
        setError('Failed to load appointment details');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchAppointment();
    }
  }, [id]);

  async function handleEdit() {
    router.push(`/appointments/create?id=${id}`);
  }

  async function handleCancel() {
    if (!appointment) return;
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setAppointment((prev: Appointment | null) => prev ? { ...prev, status: 'cancelled' } : null);
      router.back();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setError('Failed to cancel appointment');
    }
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
        <Button 
          title="Try Again" 
          onPress={() => router.replace(`/appointments/${id}`)}
          color={theme.primary}
        />
      </View>
    );
  }

  if (!appointment) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Appointment not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Appointment Details</Text>
      
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Status</Text>
        <Text style={[styles.value, { color: theme.text }]}>{appointment.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Date</Text>
        <Text style={[styles.value, { color: theme.text }]}>{new Date(appointment.appointment_date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Time</Text>
        <Text style={[styles.value, { color: theme.text }]}>{appointment.appointment_time}</Text>
      </View>

      {appointment.name && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Name</Text>
          <Text style={[styles.value, { color: theme.text }]}>{appointment.name}</Text>
        </View>
      )}

      {appointment.number_of_people && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Number of People</Text>
          <Text style={[styles.value, { color: theme.text }]}>{appointment.number_of_people}</Text>
        </View>
      )}

      {appointment.consultation_fee && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Consultation Fee</Text>
          <Text style={[styles.value, { color: theme.text }]}>₹{appointment.consultation_fee}</Text>
        </View>
      )}

      {appointment.notes && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Notes</Text>
          <Text style={[styles.value, { color: theme.text }]}>{appointment.notes}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button 
          title="Edit Appointment" 
          onPress={handleEdit}
          color={theme.primary}
        />
        {appointment.status === 'scheduled' && (
          <Button 
            title="Cancel Appointment" 
            onPress={handleCancel}
            color={theme.secondary}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
}); 