import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

const STORES = [
  {
    name: 'StitchKaro Main Store',
    address: '123 Orchard Road, #01-01, Singapore 238888',
    mapsUrl: 'https://maps.google.com/?q=123+Orchard+Road+Singapore',
  },
  {
    name: 'StitchKaro Westgate',
    address: '3 Gateway Drive, #02-15, Singapore 608532',
    mapsUrl: 'https://maps.google.com/?q=3+Gateway+Drive+Singapore',
  },
  {
    name: 'StitchKaro Little India',
    address: '60 Serangoon Road, #03-10, Singapore 217567',
    mapsUrl: 'https://maps.google.com/?q=60+Serangoon+Road+Singapore',
  },
];

export default function FindStoreScreen() {
  const { theme } = useTheme();

  function handleOpenMaps(url: string) {
    Linking.openURL(url);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 24 }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="Find Store screen"
    >
      {STORES.map((store) => (
        <View key={store.name} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
          <View style={styles.headerRow}>
            <MaterialIcons name="store-mall-directory" size={28} color={theme.primary} style={{ marginRight: 14 }} />
            <Text style={[styles.storeName, { color: theme.text }]}>{store.name}</Text>
          </View>
          <Text style={[styles.address, { color: theme.muted }]}>{store.address}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.mapButton,
              { backgroundColor: theme.secondary, opacity: pressed ? 0.8 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${store.name} in Maps`}
            onPress={() => handleOpenMaps(store.mapsUrl)}
          >
            <MaterialIcons name="map" size={20} color={theme.white} style={{ marginRight: 8 }} />
            <Text style={[styles.mapButtonText, { color: theme.white }]}>Open in Maps</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
  },
  address: {
    fontSize: 15,
    marginBottom: 14,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    elevation: 1,
  },
  mapButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
}); 