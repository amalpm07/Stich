import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { PrimaryButton } from '../buttons/primary-button';
import { SecondaryButton } from '../buttons/secondary-button';

const MOCK_FABRICS = [
  { id: '1', name: 'Cotton', description: 'Soft and breathable.' },
  { id: '2', name: 'Linen', description: 'Lightweight and cool.' },
  { id: '3', name: 'Silk', description: 'Luxurious and smooth.' },
];

interface FabricSelectionStepProps {
  selectedFabricIds: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function FabricSelectionStep({ selectedFabricIds, onToggle, onNext, onBack, onSkip }: FabricSelectionStepProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: theme.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Select Fabrics (optional)</Text>
        <Text style={[styles.description, { color: theme.muted }]}>Choose one or more fabrics for your garment. You can skip this step if you want to decide later.</Text>
        <View style={styles.fabricsWrapper}>
          {MOCK_FABRICS.map(fabric => (
            <TouchableOpacity
              key={fabric.id}
              style={[
                styles.fabricRow,
                { borderColor: selectedFabricIds.includes(fabric.id) ? theme.primary : theme.border },
              ]}
              onPress={() => onToggle(fabric.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selectedFabricIds.includes(fabric.id) }}
            >
              <Text style={[styles.fabricName, { color: theme.text }]}>{fabric.name}</Text>
              <Text style={[styles.fabricDesc, { color: theme.muted }]}>{fabric.description}</Text>
              <View style={[
                styles.checkbox,
                {
                  borderColor: theme.primary,
                  backgroundColor: selectedFabricIds.includes(fabric.id) ? theme.primary : 'transparent',
                },
              ]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.spacer} />
        <View style={styles.buttonRow}>
          <SecondaryButton title="Back" onPress={onBack} style={styles.backButton} accessibilityLabel="Go to previous step" />
          <PrimaryButton title="Next" onPress={onNext} style={styles.nextButton} accessibilityLabel="Go to next step" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },
  fabricsWrapper: {
    marginBottom: 8,
  },
  fabricRow: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabricName: {
    fontSize: 16,
    fontWeight: '600',
  },
  fabricDesc: {
    fontSize: 13,
    flex: 1,
    marginLeft: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 12,
  },
  spacer: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  skipButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
}); 