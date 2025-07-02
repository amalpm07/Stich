import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { Consultant } from '../../hooks/useConsultants';
import { TextField } from '../inputs/text-field';

export interface MeasurementData {
  measurements: Record<string, number>;
  notes: string;
}

interface MeasurementField {
  id: string;
  label: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const GARMENT_MEASUREMENT_FIELDS_CONFIG: Record<string, MeasurementField[]> = {
  shirt: [
    { id: 'neck', label: 'Neck (cm)', placeholder: 'e.g. 38', keyboardType: 'numeric' },
    { id: 'chest', label: 'Chest (cm)', placeholder: 'e.g. 96', keyboardType: 'numeric' },
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 81', keyboardType: 'numeric' },
    { id: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g. 61', keyboardType: 'numeric' },
    { id: 'shoulderWidth', label: 'Shoulder Width (cm)', placeholder: 'e.g. 43', keyboardType: 'numeric' },
    { id: 'shirtLength', label: 'Shirt Length (cm)', placeholder: 'e.g. 70', keyboardType: 'numeric' },
    { id: 'bicep', label: 'Bicep (cm)', placeholder: 'e.g. 33', keyboardType: 'numeric' },
    { id: 'wrist', label: 'Wrist (cm)', placeholder: 'e.g. 18', keyboardType: 'numeric' },
  ],
  pants: [
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 81', keyboardType: 'numeric' },
    { id: 'hips', label: 'Hips (cm)', placeholder: 'e.g. 99', keyboardType: 'numeric' },
    { id: 'inseam', label: 'Inseam (cm)', placeholder: 'Crotch to ankle', keyboardType: 'numeric' },
    { id: 'outseam', label: 'Outseam (cm)', placeholder: 'Waist to ankle', keyboardType: 'numeric' },
    { id: 'thigh', label: 'Thigh (cm)', placeholder: 'e.g. 56', keyboardType: 'numeric' },
    { id: 'knee', label: 'Knee (cm)', placeholder: 'e.g. 40', keyboardType: 'numeric' },
    { id: 'calf', label: 'Calf (cm)', placeholder: 'e.g. 38', keyboardType: 'numeric' },
    { id: 'trouserLength', label: 'Trouser Length (cm)', placeholder: 'e.g. 105', keyboardType: 'numeric' },
  ],
  suit: [
    { id: 'chest', label: 'Chest (cm)', placeholder: 'e.g. 96', keyboardType: 'numeric' },
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 81', keyboardType: 'numeric' },
    { id: 'hips', label: 'Hips (cm)', placeholder: 'e.g. 99', keyboardType: 'numeric' },
    { id: 'shoulderWidth', label: 'Shoulder Width (cm)', placeholder: 'e.g. 43', keyboardType: 'numeric' },
    { id: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g. 61', keyboardType: 'numeric' },
    { id: 'jacketLength', label: 'Jacket Length (cm)', placeholder: 'e.g. 70', keyboardType: 'numeric' },
    { id: 'inseam', label: 'Inseam (cm)', placeholder: 'Crotch to ankle', keyboardType: 'numeric' },
    { id: 'outseam', label: 'Outseam (cm)', placeholder: 'Waist to ankle', keyboardType: 'numeric' },
  ],
  kurta: [
    { id: 'chest', label: 'Chest (cm)', placeholder: 'e.g. 96', keyboardType: 'numeric' },
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 81', keyboardType: 'numeric' },
    { id: 'hips', label: 'Hips (cm)', placeholder: 'e.g. 99', keyboardType: 'numeric' },
    { id: 'shoulderWidth', label: 'Shoulder Width (cm)', placeholder: 'e.g. 43', keyboardType: 'numeric' },
    { id: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g. 61', keyboardType: 'numeric' },
    { id: 'kurtaLength', label: 'Kurta Length (cm)', placeholder: 'e.g. 100', keyboardType: 'numeric' },
    { id: 'neck', label: 'Neck (cm)', placeholder: 'e.g. 38', keyboardType: 'numeric' },
    { id: 'bicep', label: 'Bicep (cm)', placeholder: 'e.g. 33', keyboardType: 'numeric' },
  ],
  sherwani: [
    { id: 'chest', label: 'Chest (cm)', placeholder: 'e.g. 96', keyboardType: 'numeric' },
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 81', keyboardType: 'numeric' },
    { id: 'hips', label: 'Hips (cm)', placeholder: 'e.g. 99', keyboardType: 'numeric' },
    { id: 'shoulderWidth', label: 'Shoulder Width (cm)', placeholder: 'e.g. 43', keyboardType: 'numeric' },
    { id: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g. 61', keyboardType: 'numeric' },
    { id: 'sherwaniLength', label: 'Sherwani Length (cm)', placeholder: 'e.g. 110', keyboardType: 'numeric' },
    { id: 'neck', label: 'Neck (cm)', placeholder: 'e.g. 38', keyboardType: 'numeric' },
    { id: 'bicep', label: 'Bicep (cm)', placeholder: 'e.g. 33', keyboardType: 'numeric' },
  ],
  blouse: [
    { id: 'bust', label: 'Bust (cm)', placeholder: 'e.g. 90', keyboardType: 'numeric' },
    { id: 'underBust', label: 'Under Bust (cm)', placeholder: 'e.g. 75', keyboardType: 'numeric' },
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 70', keyboardType: 'numeric' },
    { id: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g. 20', keyboardType: 'numeric' },
    { id: 'shoulderWidth', label: 'Shoulder Width (cm)', placeholder: 'e.g. 38', keyboardType: 'numeric' },
    { id: 'blouseLength', label: 'Blouse Length (cm)', placeholder: 'e.g. 35', keyboardType: 'numeric' },
    { id: 'neck', label: 'Neck (cm)', placeholder: 'e.g. 36', keyboardType: 'numeric' },
    { id: 'bicep', label: 'Bicep (cm)', placeholder: 'e.g. 30', keyboardType: 'numeric' },
  ],
  custom: [
    { id: 'measurement1', label: 'Measurement 1', placeholder: 'value', keyboardType: 'numeric' },
    { id: 'measurement2', label: 'Measurement 2', placeholder: 'value', keyboardType: 'numeric' },
    { id: 'measurement3', label: 'Measurement 3', placeholder: 'value', keyboardType: 'numeric' },
    { id: 'measurement4', label: 'Measurement 4', placeholder: 'value', keyboardType: 'numeric' },
    { id: 'measurement5', label: 'Measurement 5', placeholder: 'value', keyboardType: 'numeric' },
    { id: 'measurement6', label: 'Measurement 6', placeholder: 'value', keyboardType: 'numeric' },
  ],
  saree: [
    { id: 'bust', label: 'Bust (cm)', placeholder: 'e.g. 90', keyboardType: 'numeric' },
    { id: 'waist', label: 'Waist (cm)', placeholder: 'e.g. 70', keyboardType: 'numeric' },
    { id: 'hips', label: 'Hips (cm)', placeholder: 'e.g. 95', keyboardType: 'numeric' },
    { id: 'shoulderWidth', label: 'Shoulder Width (cm)', placeholder: 'e.g. 38', keyboardType: 'numeric' },
    { id: 'blouseLength', label: 'Blouse Length (cm)', placeholder: 'e.g. 35', keyboardType: 'numeric' },
    { id: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g. 20', keyboardType: 'numeric' },
    { id: 'neck', label: 'Neck (cm)', placeholder: 'e.g. 36', keyboardType: 'numeric' },
    { id: 'bicep', label: 'Bicep (cm)', placeholder: 'e.g. 30', keyboardType: 'numeric' },
  ],
};

interface MeasurementInputStepProps {
  garmentType: string;
  initialData: MeasurementData;
  onSave: (data: MeasurementData) => void;
  onBack: () => void;
  consultants: Consultant[];
  selectedConsultant: Consultant | null;
  onConsultantSelect: (consultant: Consultant | null) => void;
}

export function MeasurementInputStep({
  garmentType,
  initialData,
  onSave,
  onBack,
  consultants,
  selectedConsultant,
  onConsultantSelect,
}: MeasurementInputStepProps) {
  const { theme } = useTheme();
  const [measurements, setMeasurements] = useState<Record<string, number>>(initialData.measurements || {});
  const [notes, setNotes] = useState(initialData.notes || '');
  const [currentStep, setCurrentStep] = useState<'consultant' | 'measurements'>('consultant');

  const handleSave = () => {
    onSave({
      notes,
      measurements,
    });
  };

  const handleConsultantSelect = (consultant: Consultant) => {
    onConsultantSelect(consultant);
    setCurrentStep('measurements');
  };

  const getMeasurementFieldsForGarment = (type: string): MeasurementField[] => {
    return GARMENT_MEASUREMENT_FIELDS_CONFIG[type] || GARMENT_MEASUREMENT_FIELDS_CONFIG.custom;
  };

  const currentMeasurementFields = getMeasurementFieldsForGarment(garmentType);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    consultantList: {
      marginTop: 8,
    },
    consultantItem: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    selectedConsultant: {
      backgroundColor: theme.primary + '20',
      borderColor: theme.primary,
    },
    consultantName: {
      fontSize: 16,
      color: theme.text,
    },
    consultantEmail: {
      fontSize: 14,
      color: theme.muted,
      marginTop: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    button: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    backButton: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      marginRight: 8,
    },
    saveButton: {
      backgroundColor: theme.primary,
      marginLeft: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    backButtonText: {
      color: theme.text,
    },
    saveButtonText: {
      color: '#FFFFFF',
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    inputFieldContainer: {
      flex: 1,
      marginBottom: 16,
    },
    fullWidthFieldContainer: {
      marginBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {currentStep === 'consultant' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Consultant</Text>
            <View style={styles.consultantList}>
              {consultants.map((consultant) => (
                <TouchableOpacity
                  key={consultant.id}
                  style={[
                    styles.consultantItem,
                    selectedConsultant?.id === consultant.id && styles.selectedConsultant,
                  ]}
                  onPress={() => handleConsultantSelect(consultant)}
                >
                  <Text style={styles.consultantName}>{consultant.full_name}</Text>
                  <Text style={styles.consultantEmail}>{consultant.email}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Body Measurements (cm)</Text>
              {currentMeasurementFields.map((field, index) => {
                if (index % 2 === 0) {
                  const nextField = currentMeasurementFields[index + 1];
                  return (
                    <View key={field.id} style={styles.inputRow}>
                      <View style={styles.inputFieldContainer}>
                        <TextField
                          label={field.label}
                          value={measurements[field.id]?.toString() || ''}
                          onChange={(text) => setMeasurements(prev => ({
                            ...prev,
                            [field.id]: parseFloat(text) || 0
                          }))}
                          placeholder={field.placeholder}
                          keyboardType={field.keyboardType || 'default'}
                        />
                      </View>
                      {nextField ? (
                        <View style={styles.inputFieldContainer}>
                          <TextField
                            label={nextField.label}
                            value={measurements[nextField.id]?.toString() || ''}
                            onChange={(text) => setMeasurements(prev => ({
                              ...prev,
                              [nextField.id]: parseFloat(text) || 0
                            }))}
                            placeholder={nextField.placeholder}
                            keyboardType={nextField.keyboardType || 'default'}
                          />
                        </View>
                      ) : (
                        <View style={styles.inputFieldContainer} />
                      )}
                    </View>
                  );
                }
                return null;
              })}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Notes</Text>
              <View style={styles.fullWidthFieldContainer}>
                <TextField
                  label="Notes for Tailor"
                  placeholder="e.g., prefer loose fit, specific style details, fabric choice"
                  value={notes}
                  onChange={setNotes}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.backButton]} 
          onPress={() => {
            if (currentStep === 'measurements') {
              setCurrentStep('consultant');
            } else {
              onBack();
            }
          }}
        >
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>
        {currentStep === 'measurements' && (
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
} 