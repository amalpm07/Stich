import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../clients/supabase';
import { AppointmentCard, AppointmentDetailsBottomSheet, PrimaryButton } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { Appointment } from '../../hooks/useAppointments';

interface AppointmentDetails {
  id: string;
  serviceImage: string;
  appointmentName: string;
  serviceName: string;
  addressName: string;
  addressLine: string;
  createdDate: string;
  notes?: string;
  consultationFees?: string;
  status: string;
  appointment_date: string;
  appointment_time: string;
}

function isPast(dateStr: string) {
  const today = new Date();
  const date = new Date(dateStr);
  return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

type TabType = 'upcoming' | 'past';

interface EmptyStateProps {
  type: TabType;
}

function EmptyAppointmentState({ type }: EmptyStateProps) {
  const { theme } = useTheme();
  const router = useRouter();
  
  const config = {
    upcoming: {
      icon: 'calendar-plus' as const,
      title: 'No upcoming appointments',
      description: 'You don\'t have any upcoming appointments scheduled. Book a consultation with a tailor to get started.'
    },
    past: {
      icon: 'calendar-check' as const,
      title: 'No past appointments',
      description: 'Your past appointments will appear here once you\'ve completed consultations or fittings.'
    }
  };

  const { icon, title, description } = config[type];

  const handleScheduleAppointment = () => {
    router.push('/appointments/create');
  };

  return (
    <View style={styles.emptyStateContainer}>
      <MaterialCommunityIcons 
        name={icon} 
        size={64} 
        color={theme.muted} 
        style={styles.emptyStateIcon} 
      />
      <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
        {title}
      </Text>
      <Text style={[styles.emptyStateDescription, { color: theme.muted }]}>
        {description}
      </Text>
      
      {type === 'upcoming' && (
        <View style={styles.emptyStateButtonContainer}>
          <PrimaryButton 
            title="Schedule Appointment" 
            onPress={handleScheduleAppointment}
          />
        </View>
      )}
    </View>
  );
}

export function AppointmentsTabScreen() {
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setIsLoading(true);
      setError(null);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) {
        setError('Please login to view appointments');
        return;
      }

      // Fetch appointments for current user
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;

      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  }

  const { upcoming, past } = useMemo(() => {
    const upcoming = appointments.filter(a => !isPast(a.appointment_date));
    const past = appointments.filter(a => isPast(a.appointment_date));
    return { upcoming, past };
  }, [appointments]);

  function handleViewDetails(appt: Appointment) {
    const appointmentDetails: AppointmentDetails = {
      id: appt.id!,
      serviceImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&q=80', // Default image
      appointmentName: appt.name || 'Appointment',
      serviceName: 'Service', // You might want to join with services table
      addressName: 'Address', // You might want to join with addresses table
      addressLine: 'Address Line', // You might want to join with addresses table
      createdDate: new Date().toISOString(), // You might want to add created_at to your schema
      notes: appt.notes,
      consultationFees: appt.consultation_fee?.toString(),
      status: appt.status,
      appointment_date: appt.appointment_date,
      appointment_time: appt.appointment_time,
    };

    setSelectedAppointment(appointmentDetails);
    setTimeout(() => {
      bottomSheetRef.current?.present();
    }, 0);
  }

  function handleRequestClose() {
    bottomSheetRef.current?.dismiss();
  }

  function handleDismiss() {
    setSelectedAppointment(null);
  }

  function handleTabChange(tab: TabType) {
    setActiveTab(tab);
  }

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
        <PrimaryButton title="Try Again" onPress={fetchAppointments} />
      </View>
    );
  }

  const renderTabContent = () => {
    const currentAppointments = activeTab === 'upcoming' ? upcoming : past;
    
    if (currentAppointments.length === 0) {
      return <EmptyAppointmentState type={activeTab} />;
    }
    
    return currentAppointments.map((appt) => (
      <AppointmentCard
        key={appt.id}
        appointmentName={appt.name || 'Appointment'}
        serviceName="Service" // You might want to join with services table
        location="Location" // You might want to join with addresses table
        date={appt.appointment_date}
        time={appt.appointment_time}
        onViewDetails={() => handleViewDetails(appt)}
      />
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'upcoming' && [styles.activeTab, { borderBottomColor: theme.primary }]
          ]}
          onPress={() => handleTabChange('upcoming')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'upcoming' ? theme.primary : theme.muted }
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'past' && [styles.activeTab, { borderBottomColor: theme.primary }]
          ]}
          onPress={() => handleTabChange('past')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'past' ? theme.primary : theme.muted }
            ]}
          >
            Past
          </Text>
        </Pressable>
      </View>
      
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {renderTabContent()}
        </View>
      </ScrollView>
      
      {selectedAppointment && (
        <AppointmentDetailsBottomSheet
          ref={bottomSheetRef}
          snapPoints={['60%', '90%']}
          onRequestClose={handleRequestClose}
          onDismiss={handleDismiss}
          {...selectedAppointment}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyStateButtonContainer: {
    marginTop: 16,
    width: '100%',
    maxWidth: 300,
  },
});

export default AppointmentsTabScreen; 