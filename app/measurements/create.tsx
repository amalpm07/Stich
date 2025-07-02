import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GarmentProfileData, GarmentProfileStep } from '../../components/measurements/garment-profile-step';
import { MeasurementData, MeasurementInputStep } from '../../components/measurements/measurement-input-step';
import { AlertModal } from '../../components/modals/alert-modal';
import { Consultant, useConsultantContext } from '../../contexts/consultant-context';
import { MeasurementType, useMeasurements } from '../../contexts/measurements-context';
import { useTheme } from '../../contexts/theme-context';
import { useAuth } from '../../hooks/useAuth';

export default function CreateMeasurementScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { addMeasurement, isLoading } = useMeasurements();
  const { consultants, isLoading: isLoadingConsultants, fetchConsultants } = useConsultantContext();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);

  const [garmentProfileData, setGarmentProfileData] = useState<GarmentProfileData>({
    profileName: '',
    garmentType: '',
    customGarmentType: undefined,
  });

  const [measurementData, setMeasurementData] = useState<MeasurementData>({
    notes: '',
    measurements: {},
  });

  useEffect(() => {
    fetchConsultants();
  }, [fetchConsultants]);

  const handleConfirmDiscard = () => {
    setShowDiscardModal(false);
    router.back();
  };

  const handleCancelDiscard = () => {
    setShowDiscardModal(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: garmentProfileData.profileName || 'New Measurement',
      headerLeft: () => (
        <Pressable
          onPress={() => setShowDiscardModal(true)}
          style={{ marginLeft: 4, paddingVertical: 4, paddingHorizontal: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Discard changes and go back"
        >
          <MaterialIcons name="close" size={26} color={theme.text} />
        </Pressable>
      ),
    });
  }, [navigation, garmentProfileData.profileName, router, theme.text]);

  const handleNextFromGarmentProfile = (data: GarmentProfileData) => {
    setGarmentProfileData(data);
    setMeasurementData(prev => ({ notes: prev.notes, measurements: prev.measurements }));
    setCurrentStep(1);
  };

  const handleBackFromMeasurements = () => {
    setCurrentStep(0);
  };

  const handleSaveMeasurements = async (data: MeasurementData) => {
    try {
      setError(null);
      const finalData = {
        profile: garmentProfileData,
        measurements: data,
      };
      
      // Convert to the format expected by the API
      const measurementToSave = {
        user_id: user?.id,
        measurement_type: garmentProfileData.garmentType as MeasurementType, // Use the selected garment type directly
        is_self_measured: !selectedConsultant, // If no consultant is selected, it's self-measured
        consultant_id: selectedConsultant?.id,
        measurements: data.measurements || {},
        notes: data.notes || '',
      };

      await addMeasurement(measurementToSave);
      setShowDiscardModal(false);
      router.push('/measurements');
    } catch (error) {
      console.error('Error saving measurement:', error);
      setError('Failed to save measurement. Please try again.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    contentContainer: {
      flex: 1,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    errorText: {
      color: theme.error,
      textAlign: 'center',
      margin: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {currentStep === 0 && (
          <GarmentProfileStep
            initialData={garmentProfileData}
            onNext={handleNextFromGarmentProfile}
          />
        )}
        {currentStep === 1 && (
          <MeasurementInputStep
            garmentType={garmentProfileData.customGarmentType || garmentProfileData.garmentType}
            initialData={measurementData}
            onSave={handleSaveMeasurements}
            onBack={handleBackFromMeasurements}
            consultants={consultants}
            selectedConsultant={selectedConsultant}
            onConsultantSelect={setSelectedConsultant}
          />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      {(isLoading || isLoadingConsultants) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      )}
      <AlertModal
        visible={showDiscardModal}
        title="Discard Changes?"
        description="Are you sure you want to discard your changes and go back? Your progress may be lost."
        confirmLabel="Discard"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
        confirmColor={theme.error}
      />
    </View>
  );
} 