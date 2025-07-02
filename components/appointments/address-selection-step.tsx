import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { Address, useAddresses } from '../../hooks/useAddresses';

type AddressType = 'home' | 'office' | 'other';

interface AddressFormData {
  name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  address_type: AddressType;
  gps_location?: {
    latitude: number;
    longitude: number;
  };
}

interface AddressSelectionStepProps {
  selectedAddressId?: string;
  onSelect: (addressId: string) => void;
  onNext: () => void;
  onBack: () => void;
  onUseCurrentLocation: () => void;
}

export function AddressSelectionStep({ selectedAddressId, onSelect, onNext, onBack, onUseCurrentLocation }: AddressSelectionStepProps) {
  const { theme } = useTheme();
  const { addresses, isLoading, hasError, errorMessage, fetchAddresses, addAddress, updateAddress } = useAddresses();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    is_default: false,
    address_type: 'home',
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        name: address.name,
        address_line1: address.address_line1,
        address_line2: address.address_line2 || '',
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        is_default: address.is_default,
        address_type: address.address_type,
        gps_location: address.gps_location,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        name: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
        is_default: false,
        address_type: 'home',
      });
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      pincode: '',
      is_default: false,
      address_type: 'home',
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.address_line1 || !formData.city || !formData.state || !formData.pincode) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingAddress) {
        const updatedAddress = await updateAddress({
          ...editingAddress,
          ...formData,
        });
        if (updatedAddress) {
          onSelect(updatedAddress.id);
        }
      } else {
        const newAddress = await addAddress(formData);
        if (newAddress) {
          onSelect(newAddress.id);
        }
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAddressTypeSelector = () => {
    const types: AddressType[] = ['home', 'office', 'other'];
    return (
      <View style={styles.addressTypeContainer}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>Address Type</Text>
        <View style={styles.addressTypeButtons}>
          {types.map((type) => (
            <Pressable
              key={type}
              style={({ pressed }) => [
                styles.addressTypeButton,
                {
                  backgroundColor: formData.address_type === type ? theme.primary : theme.card,
                  borderColor: theme.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() => setFormData(prev => ({ ...prev, address_type: type }))}
            >
              <Text
                style={[
                  styles.addressTypeText,
                  { color: formData.address_type === type ? theme.white : theme.text },
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>{errorMessage || 'Failed to load addresses'}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Select Address</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>Choose a delivery address or add a new one</Text>
      </View>

      <ScrollView style={styles.addressList}>
        {addresses.map((address) => (
          <Pressable
            key={address.id}
            style={({ pressed }) => [
              styles.addressCard,
              {
                backgroundColor: theme.card,
                borderColor: selectedAddressId === address.id ? theme.primary : theme.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => onSelect(address.id)}
          >
            <View style={styles.addressHeader}>
              <MaterialIcons name="location-on" size={24} color={theme.primary} style={{ marginRight: 12 }} />
              <View style={styles.addressInfo}>
                <Text style={[styles.addressName, { color: theme.text }]}>{address.name}</Text>
                <Text style={[styles.addressType, { color: theme.muted }]}>
                  {address.address_type.charAt(0).toUpperCase() + address.address_type.slice(1)}
                </Text>
              </View>
              {address.is_default && (
                <View style={[styles.defaultBadge, { backgroundColor: theme.primary }]}>
                  <Text style={[styles.defaultText, { color: theme.white }]}>Default</Text>
                </View>
              )}
            </View>
            <Text style={[styles.addressDetails, { color: theme.muted }]}>
              {`${address.address_line1}${address.address_line2 ? `, ${address.address_line2}` : ''}, ${address.city}, ${address.state} ${address.pincode}`}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => handleOpenModal(address)}
            >
              <MaterialIcons name="edit" size={20} color={theme.primary} />
              <Text style={[styles.editButtonText, { color: theme.primary }]}>Edit</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.currentLocationButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={onUseCurrentLocation}
        >
          <MaterialIcons name="my-location" size={20} color={theme.primary} style={{ marginRight: 8 }} />
          <Text style={[styles.currentLocationText, { color: theme.text }]}>Use Current Location</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.addAddressButton,
            {
              backgroundColor: theme.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => handleOpenModal()}
        >
          <MaterialIcons name="add" size={20} color={theme.white} style={{ marginRight: 8 }} />
          <Text style={[styles.addAddressText, { color: theme.white }]}>Add New Address</Text>
        </Pressable>

        <View style={styles.navigationButtons}>
          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={onBack}
          >
            <Text style={[styles.navButtonText, { color: theme.text }]}>Back</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              {
                backgroundColor: theme.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={onNext}
            disabled={!selectedAddressId}
          >
            <Text style={[styles.navButtonText, { color: theme.white }]}>Next</Text>
          </Pressable>
        </View>
      </View>

      {/* Add/Edit Address Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </Text>
              <Pressable
                onPress={handleCloseModal}
                style={({ pressed }) => [
                  styles.closeButton,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
              >
                <MaterialIcons name="close" size={24} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalForm}>
              {renderAddressTypeSelector()}

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Name</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border
                  }]}
                  placeholder="e.g., Home, Work"
                  placeholderTextColor={theme.muted}
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Address Line 1</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border
                  }]}
                  placeholder="Street address"
                  placeholderTextColor={theme.muted}
                  value={formData.address_line1}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, address_line1: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Address Line 2 (Optional)</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border
                  }]}
                  placeholder="Apartment, suite, unit, etc."
                  placeholderTextColor={theme.muted}
                  value={formData.address_line2}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, address_line2: text }))}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>City</Text>
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
                  <Text style={[styles.inputLabel, { color: theme.text }]}>State</Text>
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
                <Text style={[styles.inputLabel, { color: theme.text }]}>PIN Code</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border
                  }]}
                  placeholder="PIN code"
                  placeholderTextColor={theme.muted}
                  value={formData.pincode}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, pincode: text }))}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.defaultContainer}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Set as default address</Text>
                <Switch
                  value={formData.is_default}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, is_default: value }))}
                  trackColor={{ false: theme.border, true: theme.primary }}
                  thumbColor={theme.white}
                />
              </View>
            </ScrollView>

            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                { 
                  backgroundColor: theme.primary,
                  opacity: pressed || isSubmitting ? 0.8 : 1
                }
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={[styles.submitButtonText, { color: theme.white }]}>
                {isSubmitting ? 'Saving...' : editingAddress ? 'Save Changes' : 'Add Address'}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  addressList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  addressCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
  },
  addressType: {
    fontSize: 14,
  },
  addressDetails: {
    fontSize: 14,
    marginBottom: 12,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  modalForm: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
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
  addressTypeContainer: {
    marginBottom: 16,
  },
  addressTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addressTypeButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addressTypeText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 