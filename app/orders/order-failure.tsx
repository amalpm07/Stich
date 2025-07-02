import React from 'react';
import { Button, Text, View } from 'react-native';

export default function OrderFailureScreen() {
  function handleRetry() {}
  function handleContactSupport() {}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Order Failed</Text>
      <Text style={{ marginBottom: 24 }}>There was an error processing your order. Please try again or contact support.</Text>
      <Button title="Retry" onPress={handleRetry} />
      <Button title="Contact Support" onPress={handleContactSupport} />
    </View>
  );
} 