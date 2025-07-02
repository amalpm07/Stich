import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { AppointmentCard, PrimaryButton, ReviewCard, ServiceTallCard } from '../../components';
import { ChatBubble } from '../../components/ai/chat-bubble';
import { SuggestionChip } from '../../components/ai/suggestion-chip';
import { useTheme } from '../../contexts/theme-context';
import { useAppointments } from '../../hooks/useAppointments';
import { getTestimonials, Testimonial } from '../../services/reviewService';
import { getServices, Service } from '../../services/service';
import { getStatusBarPadding } from '../../utils/statusbar-padding';

export function HomeTabScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [aiPrompt, setAiPrompt] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { appointments, isLoading: appointmentsLoading } = useAppointments();

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesData, testimonialsData] = await Promise.all([
          getServices(),
          getTestimonials()
        ]);
        setServices(servicesData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading home screen data:', error);
      }
    }
    loadData();
  }, []);

  function handleScheduleAppointment() {
    router.push('/appointments/create');
  }

  function handleServiceTallCardPress(service: Service) {
    router.push({ pathname: '/appointments/create', params: { service: JSON.stringify(service) } });
  }

  function handleAiSuggestion(suggestion: string) {
    setAiPrompt(suggestion);
    // TODO: Trigger AI chat
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background, paddingTop: getStatusBarPadding() }]}>  
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={[styles.heading, { color: theme.text }]}>Welcome to StitchKaro</Text>
        <Text style={[styles.subheading, { color: theme.muted }]}>Direct-to-home tailoring, crafted for you.</Text>

        {/* Schedule Appointment Button */}
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          <PrimaryButton
            title="Schedule Appointment"
            onPress={handleScheduleAppointment}
            accessibilityLabel="Schedule a new appointment"
            style={{ width: 240 }}
          />
        </View>

        {/* Services - Horizontal Scroll */}
        <View style={{ marginBottom: 28 }}>
          <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 16, marginBottom: 10 }]}>Our Services</Text>
          <FlatList
            data={services}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            ListHeaderComponent={<View style={{ width: 16 }} />}
            ListFooterComponent={<View style={{ width: 16 }} />}
            renderItem={({ item }) => (
              <ServiceTallCard
                image={item.image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'}
                title={item.title}
                price={item.price}
                estimatedTime={item.title === 'Alterations' ? '1-2 days' : item.title === 'Custom Tailoring' ? '5-7 days' : '2-3 days'}
                buttonLabel="Book Now"
                onButtonPress={() => handleServiceTallCardPress(item)}
              />
            )}
          />
        </View>

        {/* AI Chat Nudge */}
        <View style={[styles.section, styles.aiSection, { backgroundColor: theme.card }]}>  
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Ask our AI Tailor Assistant</Text>
          <ChatBubble message="Need help with measurements or style? Ask me anything!" sender="ai" />
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <SuggestionChip label="How to measure?" onPress={() => handleAiSuggestion('How do I take my measurements?')} />
            <SuggestionChip label="Style tips" onPress={() => handleAiSuggestion('What style suits me?')} />
            <SuggestionChip label="Order status" onPress={() => handleAiSuggestion('Where is my order?')} />
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Appointments</Text>
          {appointmentsLoading ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: theme.muted }]}>Loading appointments...</Text>
            </View>
          ) : appointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: theme.muted }]}>No appointments yet.</Text>
              <Pressable 
                style={[styles.scheduleButton, { backgroundColor: theme.primary }]} 
                accessibilityRole="button"
                onPress={handleScheduleAppointment}
              >
                <Text style={[styles.scheduleButtonText, { color: theme.white }]}>Schedule an Appointment</Text>
              </Pressable>
            </View>
          ) : (
            appointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointmentName={appt.name || 'Appointment'}
                serviceName={appt.services_id || 'Service'}
                location={appt.address_id || 'Location'}
                date={appt.appointment_date}
                time={appt.appointment_time}
              />
            ))
          )}
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What Our Customers Say</Text>
          <FlatList
            data={testimonials}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 16, width: width * 0.7 }}>
                <ReviewCard {...item} />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  aiSection: {
    borderRadius: 18,
    paddingVertical: 18,
    marginHorizontal: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 12,
  },
  scheduleButton: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 4,
  },
  scheduleButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeTabScreen; 