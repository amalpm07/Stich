import React from 'react';
import { Button, Text, View } from 'react-native';

export default function PaymentRazorpayScreen() {
  function handlePay() {
    // Initialize Razorpay payment
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Pay with Razorpay</Text>
      {/* Payment initialization and callback handling */}
      <Button title="Pay Now" onPress={handlePay} />
    </View>
  );
} 