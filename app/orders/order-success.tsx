import React from 'react';
import { Button, Text, View } from 'react-native';

export default function OrderSuccessScreen() {
  function handleViewOrder() {}
  function handleGoHome() {}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Order Placed Successfully!</Text>
      <Text style={{ marginBottom: 24 }}>Your order has been placed and is being processed.</Text>
      <Button title="View Order" onPress={handleViewOrder} />
      <Button title="Go Home" onPress={handleGoHome} />
    </View>
  );
} 