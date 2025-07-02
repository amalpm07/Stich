import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppointmentCard, ErrorBanner, FloatingActionButton, IconButton, OrderCard, PrimaryButton, ReviewCard, ReviewForm, SearchBar, SecondaryButton, ServiceCard, SuccessBanner, TailorCard, TertiaryButton, TextField } from '../components';
import { useTheme } from '../contexts/theme-context';
import { getStatusBarPadding } from '../utils/statusbar-padding';

export default function ComponentsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [textValue, setTextValue] = useState('');
  const [areaValue, setAreaValue] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: getStatusBarPadding() }}>
      <ScrollView contentContainerStyle={{ padding: 24, backgroundColor: theme.background }}>
        <IconButton iconName="arrow-back" onPress={() => router.back()} accessibilityLabel="Go back" style={{ marginBottom: 24 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: theme.text }}>Button Components</Text>
        <PrimaryButton title="Primary Button" onPress={() => {}} iconName="check" style={{ marginBottom: 16 }} />
        <SecondaryButton title="Secondary Button" onPress={() => {}} iconName="star" style={{ marginBottom: 16 }} />
        <TertiaryButton title="Tertiary Button" onPress={() => {}} iconName="info" style={{ marginBottom: 16 }} />
        <IconButton iconName="favorite" onPress={() => {}} accessibilityLabel="Favorite" style={{ marginBottom: 16 }} />
        <PrimaryButton title="Loading" onPress={() => {}} isLoading style={{ marginBottom: 16 }} />
        <SecondaryButton title="Disabled" onPress={() => {}} disabled style={{ marginBottom: 16 }} />
        <FloatingActionButton icon={<MaterialIcons name="add" size={28} color="#fff" />} onPress={() => {}} accessibilityLabel="Add" />

        {/* Feedback Components */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: theme.text }}>Feedback Components</Text>
        <ErrorBanner error="This is an error banner." />
        <SuccessBanner message="This is a success banner." />

        {/* Review Components */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: theme.text }}>Review Components</Text>
        <ReviewCard user="Jane Doe" rating={4.5} comment="Great service!" date="2024-06-01" />
        <ReviewForm onSubmit={() => {}} />

        {/* Input Components */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: theme.text }}>Input Components</Text>
        <SearchBar placeholder="Search..." value="" onChange={() => {}} onClear={() => {}} />
        <Text style={{ color: theme.text, marginTop: 16, marginBottom: 8 }}>Text Field</Text>
        <TextField
          value={textValue}
          onChange={setTextValue}
          placeholder="Enter text"
          accessibilityLabel="Text Field Example"
          label="Name"
          suggestion="Enter your full name as per your ID."
        />
        <Text style={{ color: theme.text, marginTop: 16, marginBottom: 8 }}>Text Area</Text>
        <TextField
          value={areaValue}
          onChange={setAreaValue}
          placeholder="Enter multiple lines..."
          accessibilityLabel="Text Area Example"
          multiline
          numberOfLines={5}
          label="Address"
          suggestion="Include street, city, and postal code."
        />

        {/* Card Components */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: theme.text }}>Card Components</Text>
        <AppointmentCard date="2024-06-01" time="10:00 AM" appointmentName="Sample Appointment" serviceName="Alteration" location="Sample Location" />
        <OrderCard orderId="123" status="delivered" date="2024-06-01" total="₹799" />
        <ServiceCard image="https://placehold.co/56x56" title="Tailoring" price="299" description="Custom tailoring service" />
        <TailorCard photo="https://placehold.co/56x56" name="John Tailor" specialties="Suits, Shirts" rating={4.8} isAvailable={true} />
      </ScrollView>
    </View>
  );
} 