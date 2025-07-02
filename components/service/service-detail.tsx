import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ServiceDetailProps {
  title: string;
  description: string;
  price: string;
  image?: string;
  rating?: number;
  onBook?: () => void;
}

export function ServiceDetail({ title, description, price, image, rating, onBook }: ServiceDetailProps) {
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.serviceImage} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      {rating !== undefined && <Text style={styles.rating}>⭐ {rating}</Text>}
      {onBook && (
        <TouchableOpacity style={styles.bookButton} onPress={onBook} accessibilityLabel="Book now">
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  serviceImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 