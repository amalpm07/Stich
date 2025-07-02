import React from 'react';
import { Button, Text, View } from 'react-native';

export default function OrderDetailScreen() {
  function handleTrack() {}
  function handleCancel() {}
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Order Details</Text>
      {/* Order info, status, items, pricing, timeline, etc. */}
      <Button title="Track Order" onPress={handleTrack} />
      <Button title="Cancel Order" onPress={handleCancel} />
    </View>
  );
} 