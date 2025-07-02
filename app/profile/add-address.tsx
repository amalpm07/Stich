import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { Address, useAddresses } from '../../hooks/useAddresses';

export default function AddAddressScreen() {
  const { theme } = useTheme();
  const { addAddress } = useAddresses();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    label: '',
    addressLine: '',
    city: '',
    state: '',
    zip: '',
    isDefault: false,
  });

  const handleSubmit = async () => {
    if (!formData.label || !formData.addressLine || !formData.city || !formData.state || !formData.zip) {
      // You might want to show an error message here
      return;
    }

    setIsLoading(true);
    try {
      await addAddress(formData as Address);
      router.back();
    } catch (error) {
      // Handle error
      console.error('Failed to add address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.7 : 1 }
            ]}
          >
            <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          </Pressable>
          <Text style={[styles.title, { color: theme.text }]}>Add New Address</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Label</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border
              }]}
              placeholder="e.g., Home, Work"
              placeholderTextColor={theme.muted}
              value={formData.label}
              onChangeText={(text) => setFormData(prev => ({ ...prev, label: text }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Address Line</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border
              }]}
              placeholder="Street address"
              placeholderTextColor={theme.muted}
              value={formData.addressLine}
              onChangeText={(text) => setFormData(prev => ({ ...prev, addressLine: text }))}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.label, { color: theme.text }]}>City</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border
                }]}
                placeholder="City"
                placeholderTextColor={theme.muted}
                value={formData.city}
                onChangeText={(text) => setFormData(prev => ({ ...prev, city: text }))}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.label, { color: theme.text }]}>State</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border
                }]}
                placeholder="State"
                placeholderTextColor={theme.muted}
                value={formData.state}
                onChangeText={(text) => setFormData(prev => ({ ...prev, state: text }))}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>ZIP Code</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border
              }]}
              placeholder="ZIP code"
              placeholderTextColor={theme.muted}
              value={formData.zip}
              onChangeText={(text) => setFormData(prev => ({ ...prev, zip: text }))}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.defaultContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Set as default address</Text>
            <Switch
              value={formData.isDefault}
              onValueChange={(value) => setFormData(prev => ({ ...prev, isDefault: value }))}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.white}
            />
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            { 
              backgroundColor: theme.primary,
              opacity: pressed || isLoading ? 0.8 : 1
            }
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={[styles.submitButtonText, { color: theme.white }]}>
            {isLoading ? 'Adding...' : 'Add Address'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  defaultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 