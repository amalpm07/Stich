import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { Service, useServices } from '../../hooks/useServices';
import { PrimaryButton } from '../buttons/primary-button';
import { ServiceCard } from '../cards/service-card';

interface ServiceSelectionStepProps {
  selectedServiceId?: string;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

export function ServiceSelectionStep({ selectedServiceId, onSelect, onNext }: ServiceSelectionStepProps) {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState<string | undefined>(selectedServiceId);
  const { services, isLoading, error } = useServices();

  function handleSelect(service: Service) {
    setSelectedId(service.id);
    onSelect(service);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.text }}>Loading services...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.title, { color: theme.text }]}>Select a Service</Text>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={item.id === selectedId ? [styles.selectedWrapper, { borderColor: theme.primary }] : undefined}
          >
            <ServiceCard
              image={item.image_url || ''}
              title={item.name}
              price={`₹${item.price?.toFixed(2) ?? ''}`}
              description={item.description || ''}
              onPress={() => handleSelect(item)}
              accessibilityLabel={`Select service: ${item.name}`}
              accessibilityRole="button"
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        style={{ flex: 1 }}
      />
      <PrimaryButton
        title="Next"
        onPress={onNext}
        disabled={!selectedId}
        accessibilityLabel="Go to next step"
        style={{ marginTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  selectedWrapper: {
    borderWidth: 2,
    borderRadius: 22,
  },
}); 