import React from 'react';
import { Button, Text, View } from 'react-native';

export default function MeasurementDetailScreen() {
  function handleSave() {}
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Measurement Details</Text>
      {/* Measurement info and edit form */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
} 