import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { PrimaryButton } from '../buttons/primary-button';
import { TextField } from '../inputs/text-field';

export interface GarmentProfileData {
  profileName: string;
  garmentType: string;
  customGarmentType?: string;
}

interface GarmentProfileStepProps {
  initialData: GarmentProfileData;
  onNext: (data: GarmentProfileData) => void;
}

const GARMENT_TYPES = [
  { id: 'shirt', label: 'Shirt', icon: 'checkroom' },
  { id: 'pants', label: 'Pants', icon: 'accessibility' },
  { id: 'suit', label: 'Suit', icon: 'checkroom' },
  { id: 'kurta', label: 'Kurta', icon: 'checkroom' },
  { id: 'sherwani', label: 'Sherwani', icon: 'checkroom' },
  { id: 'blouse', label: 'Blouse', icon: 'woman' },
  { id: 'saree', label: 'Saree', icon: 'styler' },
  { id: 'custom', label: 'Custom', icon: 'add-circle-outline' },
] as const;

type GarmentTypeId = typeof GARMENT_TYPES[number]['id'];

export function GarmentProfileStep({ initialData, onNext }: GarmentProfileStepProps) {
  const { theme } = useTheme();
  const [profileName, setProfileName] = useState(initialData.profileName || '');
  const [selectedGarmentType, setSelectedGarmentType] = useState<GarmentTypeId | undefined>(initialData.garmentType as GarmentTypeId || undefined);
  const [customGarmentType, setCustomGarmentType] = useState(initialData.customGarmentType || '');
  const [profileNameError, setProfileNameError] = useState('');

  const handleNext = () => {
    if (!profileName.trim()) {
      setProfileNameError('Profile name is required.');
      return;
    }
    if (!selectedGarmentType) {
      // Consider adding an error message for garment type selection
      alert('Please select a garment type.'); // Simple alert for now
      return;
    }
    if (selectedGarmentType === 'custom' && !customGarmentType.trim()) {
      alert('Please specify the garment type.'); // Simple alert for now
      return;
    }
    setProfileNameError('');
    onNext({
      profileName,
      garmentType: selectedGarmentType,
      customGarmentType: selectedGarmentType === 'custom' ? customGarmentType : undefined,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    description: {
      fontSize: 15,
      color: theme.muted,
      textAlign: 'center',
      marginBottom: 24,
    },
    inputFieldContainer: {
      marginBottom: 20,
    },
    cardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    card: {
      width: '48%', // Approximately 2 cards per row with a small gap
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      borderWidth: 2,
      borderColor: theme.border,
      minHeight: 100,
    },
    selectedCard: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + '1A', // Slight tint for selection
    },
    cardIcon: {
      marginBottom: 8,
    },
    cardLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
    errorText: {
        color: theme.error,
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
      marginTop: 'auto', // Push button to the bottom if content is short
      paddingTop: 16,
    },
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Profile & Garment</Text>
      <Text style={styles.description}>Name this measurement profile and select the type of garment.</Text>

      <View style={styles.inputFieldContainer}>
        <TextField
          label="Profile Name"
          placeholder="e.g., My Work Shirts, Dad's Kurta"
          value={profileName}
          onChange={setProfileName}
          error={profileNameError}
        />
      </View>

      <Text style={[styles.description, { textAlign: 'left', fontWeight: '600', marginBottom: 12, fontSize: 16, color: theme.text }]}>Select Garment Type:</Text>
      <View style={styles.cardsContainer}>
        {GARMENT_TYPES.map((type) => (
          <Pressable
            key={type.id}
            style={[styles.card, selectedGarmentType === type.id && styles.selectedCard]}
            onPress={() => setSelectedGarmentType(type.id)}
            accessibilityRole="button"
            accessibilityLabel={`Select garment type ${type.label}`}
            accessibilityState={{ selected: selectedGarmentType === type.id }}
          >
            <MaterialIcons name={type.icon as keyof typeof MaterialIcons.glyphMap} size={32} color={selectedGarmentType === type.id ? theme.primary : theme.muted} style={styles.cardIcon} />
            <Text style={[styles.cardLabel, selectedGarmentType === type.id && { color: theme.primary }]}>{type.label}</Text>
          </Pressable>
        ))}
      </View>

      {selectedGarmentType === 'custom' && (
        <View style={styles.inputFieldContainer}>
          <TextField
            label="Specify Garment Type"
            placeholder="e.g., Sherwani, Kurti"
            value={customGarmentType}
            onChange={setCustomGarmentType}
          />
        </View>
      )}
      
      <View style={{flex:1}} /> 

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Next" onPress={handleNext} accessibilityLabel="Go to next step" />
      </View>
    </ScrollView>
  );
} 