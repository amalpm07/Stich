import { StyleSheet, Text, View } from 'react-native';
import { IconButton, PrimaryButton, SecondaryButton, TextField } from '../';
import { useTheme } from '../../contexts/theme-context';

interface LocationStepProps {
  address: string;
  onUpdateAddress: (address: { formatted_address: string; lat: number; lng: number }) => void;
  onUseCurrentLocation: () => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationStep({
  address,
  onUpdateAddress,
  onUseCurrentLocation,
  onNext,
  onBack,
}: LocationStepProps) {
  const { theme } = useTheme();

  // TODO: Implement Google Places Autocomplete
  const handleAddressChange = (value: string) => {
    // Mock address update for now
    onUpdateAddress({
      formatted_address: value,
      lat: 0,
      lng: 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Where are you located?
      </Text>

      <View style={styles.searchContainer}>
        <TextField
          value={address}
          onChange={handleAddressChange}
          placeholder="Search for your address"
          style={styles.searchInput}
        />
        <IconButton
          iconName="my-location"
          color={theme.primary}
          size={24}
          onPress={onUseCurrentLocation}
          style={styles.locationButton}
        />
      </View>

      <Text style={[styles.hint, { color: theme.muted }]}>
        We'll use this to show you nearby tailors and services
      </Text>

      <View style={styles.footer}>
        <SecondaryButton
          title="Back"
          onPress={onBack}
        />
        <PrimaryButton
          title="Continue"
          onPress={onNext}
          disabled={!address.trim()}
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
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
  },
  locationButton: {
    padding: 8,
  },
  hint: {
    marginTop: 12,
    fontSize: 14,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 16,
  },
}); 