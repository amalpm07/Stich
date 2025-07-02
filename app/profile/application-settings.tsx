import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ThemePreference, useTheme } from '../../contexts/theme-context';

const THEME_OPTIONS: { label: string; value: ThemePreference; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { label: 'Light', value: 'light', icon: 'light-mode' },
  { label: 'Dark', value: 'dark', icon: 'dark-mode' },
  { label: 'System', value: 'system', icon: 'settings' },
];

export default function ApplicationSettingsScreen() {
  const { theme, themePreference, setAppTheme } = useTheme();
  const [activelySelected, setActivelySelected] = useState<ThemePreference>(themePreference);

  useEffect(() => {
    setActivelySelected(themePreference);
  }, [themePreference]);

  function handleDeleteAccount() {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account? This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {} },
    ]);
  }

  function handleThemeSelection(preference: ThemePreference) {
    setActivelySelected(preference);
    setAppTheme(preference);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 24 : 24,
      }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="Application Settings screen"
    >
      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow, borderColor: theme.border }]}> 
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Theme</Text>
        <View style={styles.themeRow}>
          {THEME_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              style={({ pressed }) => [
                styles.themeOption,
                {
                  backgroundColor: activelySelected === option.value ? theme.primary : theme.card,
                  borderColor: activelySelected === option.value ? theme.primary : theme.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Set theme to ${option.label}`}
              onPress={() => handleThemeSelection(option.value)}
            >
              <MaterialIcons name={option.icon} size={22} color={activelySelected === option.value ? theme.white : theme.text} style={{ marginRight: 8 }} />
              <Text style={{ color: activelySelected === option.value ? theme.white : theme.text, fontWeight: '600', fontSize: 15 }}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={{ height: 24 }} />
      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow, borderColor: theme.border }]}> 
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Danger Zone</Text>
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            { backgroundColor: theme.error, opacity: pressed ? 0.8 : 1 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Delete Account"
          onPress={handleDeleteAccount}
        >
          <MaterialIcons name="delete" size={20} color={theme.white} style={{ marginRight: 8 }} />
          <Text style={{ color: theme.white, fontWeight: 'bold', fontSize: 15 }}>Delete Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 18,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 6,
    minHeight: 50,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
  },
}); 