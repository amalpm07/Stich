import React from 'react';
import { AccessibilityRole, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TailorCardProps {
  photo: string;
  name: string;
  specialties: string;
  rating: number;
  isAvailable: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function TailorCard({
  photo,
  name,
  specialties,
  rating,
  isAvailable,
  onPress,
  accessibilityLabel = 'Tailor Card',
  accessibilityRole = 'button',
}: TailorCardProps) {
  const getAvailabilityColor = (available: boolean) =>
    available ? '#34C759' : '#FF3B30';

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      activeOpacity={0.8}
      style={styles.cardContainer}
    >
      <Image source={{ uri: photo }} style={styles.tailorImage} />
      <View style={styles.info}>
        <Text>{name}</Text>
        <Text>{specialties}</Text>
        <Text>⭐ {rating}</Text>
        <Text style={[styles.availability, { color: getAvailabilityColor(isAvailable) }]}>{isAvailable ? 'Available' : 'Unavailable'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tailorImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  availability: {
    fontWeight: 'bold',
  },
}); 