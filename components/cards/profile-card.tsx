import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

export interface ProfileCardProps {
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  cta: string;
  onPress: () => void;
}

export function ProfileCard({ title, description, icon, cta, onPress }: ProfileCardProps) {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
      <View style={styles.cardHeader}>
        <MaterialIcons name={icon} size={28} color={theme.primary} style={{ marginRight: 12 }} />
        <View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.cardDescription, { color: theme.muted }]}>{description}</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.cardButton,
          { backgroundColor: theme.secondary, opacity: pressed ? 0.8 : 1 },
        ]}
        accessibilityRole="button"
        accessibilityLabel={cta}
        onPress={onPress}
      >
        <Text style={[styles.cardButtonText, { color: theme.white }]}>{cta}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 2,
  },
  cardButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 16,
  },
  cardButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.2,
  },
}); 