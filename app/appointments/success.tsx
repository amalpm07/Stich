import React from 'react';
import { Button, Text, View } from 'react-native';

export default function AppointmentSuccessScreen() {
  function handleGoHome() {}
  function handleShare() {}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Appointment Created!</Text>
      <Text style={{ marginBottom: 24 }}>Your appointment was successfully created.</Text>
      <Button title="Go Home" onPress={handleGoHome} />
      <Button title="Share Details" onPress={handleShare} />
    </View>
  );
} 