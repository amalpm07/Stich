import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

const SUPPORT = [
  {
    label: 'Email Support',
    value: 'support@stitchkaro.com',
    icon: 'email',
    action: () => Linking.openURL('mailto:support@stitchkaro.com'),
  },
  {
    label: 'Call Support',
    value: '+65 1234 5678',
    icon: 'phone',
    action: () => Linking.openURL('tel:+6512345678'),
  },
  {
    label: 'WhatsApp',
    value: '+65 8765 4321',
    icon: 'whatsapp',
    action: () => Linking.openURL('https://wa.me/6587654321'),
  },
];

const POLICIES = [
  {
    label: 'Terms of Service',
    icon: 'gavel',
    url: 'https://stitchkaro.com/terms',
  },
  {
    label: 'Privacy Policy',
    icon: 'privacy-tip',
    url: 'https://stitchkaro.com/privacy',
  },
];

export default function SupportScreen() {
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
      accessibilityLabel="Support screen"
    >
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact Support</Text>
        {SUPPORT.map((item) => (
          <View key={item.label} style={styles.supportRow}>
            <MaterialIcons name={item.icon as any} size={26} color={theme.primary} style={{ marginRight: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
              <Text style={[styles.value, { color: theme.muted }]}>{item.value}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: theme.secondary, opacity: pressed ? 0.8 : 1 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Contact via ${item.label}`}
              onPress={item.action}
            >
              <MaterialIcons name="arrow-forward" size={20} color={theme.white} />
            </Pressable>
          </View>
        ))}
      </View>
      <View style={{ height: 28 }} />
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Legal & Policies</Text>
        {POLICIES.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.policyRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => handleOpen(item.url)}
          >
            <MaterialIcons name={item.icon as any} size={24} color={theme.primary} style={{ marginRight: 16 }} />
            <Text style={[styles.label, { color: theme.text, flex: 1 }]}>{item.label}</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.muted} />
          </Pressable>
        ))}
      </View>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#888',
  },
  actionButton: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 16,
    elevation: 1,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
}); 