import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

const LINKS = [
  {
    label: 'Website',
    icon: 'language',
    url: 'https://stitchkaro.com',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    url: 'https://instagram.com/stitchkaro',
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    url: 'https://facebook.com/stitchkaro',
  },
  {
    label: 'Twitter',
    icon: 'twitter',
    url: 'https://twitter.com/stitchkaro',
  },
];

export default function AboutStitchKaroScreen() {
  const { theme } = useTheme();

  function handleOpen(url: string) {
    Linking.openURL(url);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 24 }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="About StitchKaro screen"
    >
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
        <Text style={[styles.title, { color: theme.text }]}>About StitchKaro</Text>
        <Text style={[styles.description, { color: theme.muted }]}>StitchKaro is your direct-to-home tailoring partner, making custom tailoring and alterations easy, convenient, and accessible. We bring professional tailors to your doorstep and offer a seamless digital experience for all your garment needs.</Text>
        <View style={{ height: 18 }} />
        {LINKS.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.linkRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => handleOpen(item.url)}
          >
            <MaterialIcons name={item.icon as any} size={26} color={theme.primary} style={{ marginRight: 16 }} />
            <Text style={[styles.linkLabel, { color: theme.text }]}>{item.label}</Text>
            <MaterialIcons name="open-in-new" size={22} color={theme.muted} style={{ marginLeft: 8 }} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  linkLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
}); 