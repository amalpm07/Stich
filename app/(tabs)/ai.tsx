import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SecondaryButton } from '../../components';
import { useTheme } from '../../contexts/theme-context';

interface Suggestion {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

// Expanded suggestions with icons
const SUGGESTIONS: Suggestion[] = [
  { label: 'How to take measurements?', icon: 'straighten' },
  { label: 'Show me trending styles', icon: 'style' },
  { label: 'Book a tailoring appointment', icon: 'event' },
  { label: 'How to care for linen?', icon: 'local-laundry-service' },
  { label: 'Suggest a fabric for summer', icon: 'wb-sunny' },
  { label: 'Alteration price list', icon: 'attach-money' },
  { label: 'Track my order', icon: 'local-shipping' },
  { label: 'Find a tailor near me', icon: 'location-on' },
  { label: 'Tips for stain removal', icon: 'cleaning-services' },
  { label: 'How to store winter clothes?', icon: 'ac-unit' },
  { label: 'Recommend a tailor for wedding', icon: 'favorite' },
  { label: "What's the turnaround time?", icon: 'timer' },
];

function LogoHeader() {
  const { theme } = useTheme();
  return (
    <View style={styles.logoHeaderContainer}>
      <Text style={[styles.logoText, { color: theme.primary }]}>StitchBuddy AI</Text>
      <Text style={[styles.heading, { color: theme.text }]} accessibilityRole="header">
        Where knowledge begins
      </Text>
    </View>
  );
}

function SuggestionButtons({ onSelect }: { onSelect: (text: string) => void }) {
  const { width } = useWindowDimensions();
  // Staggered layout: 4 rows, 3 per row
  const rows = [
    SUGGESTIONS.slice(0, 3),
    SUGGESTIONS.slice(3, 6),
    SUGGESTIONS.slice(6, 9),
    SUGGESTIONS.slice(9, 12),
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.suggestionScrollWrap}
    >
      <View style={[styles.suggestionButtonWrap, { minWidth: width * 1.7 }]}> 
        {rows.map((row, rowIdx) => (
          <View
            key={rowIdx}
            style={[styles.suggestionRow, rowIdx % 2 === 1 ? { marginLeft: 40 } : null]}
          >
            {row.map((suggestion) => (
              <SecondaryButton
                key={suggestion.label}
                title={suggestion.label}
                iconName={suggestion.icon}
                onPress={() => onSelect(suggestion.label)}
                style={styles.suggestionButton}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function AskAnythingBar() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.askAnythingContainer, { backgroundColor: theme.card }]}
      activeOpacity={0.85}
      onPress={() => router.push('/ai/index')}
      accessibilityRole="button"
      accessibilityLabel="Ask anything"
    >
      <Text style={[styles.askAnythingText, { color: theme.text }]}>Ask anything...</Text>
      <MaterialIcons name="keyboard-voice" size={24} color={theme.text} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
}

export default function AiTabScreen() {
  const { height } = useWindowDimensions();
  const { theme } = useTheme();

  function handleSuggestion(suggestion: string) {
    // Placeholder for future action
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Section 1: Empty space */}
      <View style={{ height: height * 0.12 }} />
      {/* Section 2: Main content */}
      <View style={{ alignItems: 'center' }}>
        <LogoHeader />
        <View style={{ height: 16 }} />
        <SuggestionButtons onSelect={handleSuggestion} />
      </View>
      {/* Section 3: Ask anything bar at the bottom */}
      <View style={styles.askAnythingBarWrapper}>
        <AskAnythingBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoHeaderContainer: {
    alignItems: 'center',
    marginBottom: 30, // Remove space between header and suggestions
    paddingTop: 0, // Remove any top padding
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 0, // Remove space below logo text
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 0, // Remove space below heading
  },
  suggestionScrollWrap: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0, // Remove space above suggestions
  },
  suggestionButtonWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14,
  },
  suggestionButton: {
    marginHorizontal: 8,
    minWidth: 160,
  },
  askAnythingBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32,
    alignItems: 'center',
  },
  askAnythingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 320,
    maxWidth: 500,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  askAnythingText: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
}); 