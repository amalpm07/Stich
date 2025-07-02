import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>404 - Page Not Found</Text>
      <Text style={{ marginBottom: 24 }}>Sorry, the page you are looking for does not exist.</Text>
      <Button title="Go Home" onPress={() => router.replace('/')} />
    </View>
  );
}

export default NotFoundScreen; 