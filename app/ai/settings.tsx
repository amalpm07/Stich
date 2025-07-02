import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

export default function AiSettingsScreen() {
  const { theme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);

  function handleClearHistory() {
    Alert.alert(
      'Clear Chat History',
      'Are you sure you want to clear all chat history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {/* Clear logic here */} },
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 24 }}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Preferences</Text>
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: theme.text }]}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? theme.primary : theme.border}
          trackColor={{ true: theme.primary, false: theme.border }}
          accessibilityLabel="Enable notifications"
        />
      </View>
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: theme.text }]}>Save Chat History</Text>
        <Switch
          value={saveHistory}
          onValueChange={setSaveHistory}
          thumbColor={saveHistory ? theme.primary : theme.border}
          trackColor={{ true: theme.primary, false: theme.border }}
          accessibilityLabel="Save chat history"
        />
      </View>
      <View style={styles.divider} />
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Danger Zone</Text>
      <TouchableOpacity
        style={[styles.clearButton, { backgroundColor: theme.error }]}
        onPress={handleClearHistory}
        accessibilityRole="button"
        accessibilityLabel="Clear chat history"
      >
        <Text style={[styles.clearButtonText, { color: theme.white }]}>Clear Chat History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 18,
    marginTop: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 24,
  },
  clearButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
}); 