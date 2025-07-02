import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../';
import { useTheme } from '../../contexts/theme-context';

interface GenderSelectionStepProps {
  selectedGender: 'Male' | 'Female' | 'Other' | null;
  onSelect: (gender: 'Male' | 'Female' | 'Other') => void;
  onNext: () => void;
  onBack: () => void;
}

export function GenderSelectionStep({
  selectedGender,
  onSelect,
  onNext,
  onBack,
}: GenderSelectionStepProps) {
  const { theme } = useTheme();

  const genderOptions = [
    { value: 'Male', icon: 'man' },
    { value: 'Female', icon: 'woman' },
    { value: 'Other', icon: 'person' },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Select your gender
      </Text>

      <View style={styles.optionsContainer}>
        {genderOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              {
                backgroundColor: selectedGender === option.value ? theme.primary : theme.card,
              },
            ]}
            onPress={() => onSelect(option.value)}
          >
            <MaterialIcons
              name={option.icon}
              size={32}
              color={selectedGender === option.value ? theme.white : theme.text}
            />
            <Text
              style={[
                styles.optionText,
                {
                  color: selectedGender === option.value ? theme.white : theme.text,
                },
              ]}
            >
              {option.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <SecondaryButton
          title="Back"
          onPress={onBack}
        />
        <PrimaryButton
          title="Continue"
          onPress={onNext}
          disabled={!selectedGender}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    width: '28%',
    aspectRatio: 1,
  },
  optionText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 16,
  },
}); 