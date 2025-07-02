import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { PrimaryButton } from '../buttons/primary-button';
import { SecondaryButton } from '../buttons/secondary-button';

interface DateTimeStepProps {
  date: string;
  time: string;
  onChange: (field: 'date' | 'time', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DateTimeStep({ date, time, onChange, onNext, onBack }: DateTimeStepProps) {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Set business hours (9 AM to 6 PM)
  const getMinTime = () => {
    const minTime = new Date();
    minTime.setHours(9, 0, 0, 0);
    return minTime;
  };

  const getMaxTime = () => {
    const maxTime = new Date();
    maxTime.setHours(18, 0, 0, 0);
    return maxTime;
  };

  const handleDatePress = () => {
    console.log('Date button pressed');
    setShowDatePicker(true);
  };

  const handleTimePress = () => {
    console.log('Time button pressed');
    setShowTimePicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    console.log('Date picker event:', event);
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().slice(0, 10);
      console.log('Selected date:', formattedDate);
      onChange('date', formattedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    console.log('Time picker event:', event);
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      console.log('Selected time:', formattedTime);
      onChange('time', formattedTime);
    }
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          onChange={(e) => {
            const selectedDate = e.target.value;
            console.log('Web date selected:', selectedDate);
            onChange('date', selectedDate);
            setShowDatePicker(false);
          }}
          min={new Date().toISOString().split('T')[0]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      );
    }

    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={date ? new Date(date) : new Date()}
        mode="date"
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        onChange={handleDateChange}
        minimumDate={new Date()}
        themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
      />
    );
  };

  const renderTimePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="time"
          onChange={(e) => {
            const selectedTime = e.target.value;
            console.log('Web time selected:', selectedTime);
            onChange('time', selectedTime);
            setShowTimePicker(false);
          }}
          min="09:00"
          max="18:00"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      );
    }

    return (
      <DateTimePicker
        testID="timePicker"
        value={time ? new Date(`1970-01-01T${time}:00`) : new Date()}
        mode="time"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={handleTimeChange}
        minimumDate={getMinTime()}
        maximumDate={getMaxTime()}
        themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
      />
    );
  };

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: theme.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Select Date & Time</Text>
        <Text style={[styles.description, { color: theme.muted }]}>Choose a date and time for your appointment. We'll make sure your tailor is ready for you!</Text>
        <View style={styles.fieldsWrapper}>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>  
            <Text style={[styles.cardLabel, { color: theme.muted }]}>Appointment Date</Text>
            <Pressable
              style={({ pressed }) => [
                styles.pickerTrigger,
                { borderColor: pressed ? theme.primary : theme.border, backgroundColor: pressed ? theme.secondary : theme.background },
              ]}
              onPress={handleDatePress}
              accessibilityRole="button"
              accessibilityLabel="Select appointment date"
            >
              <MaterialIcons name="calendar-today" size={22} color={theme.primary} style={{ marginRight: 10 }} />
              <Text style={[styles.pickerValue, { color: date ? theme.text : theme.muted }]}>{date || 'Select date'}</Text>
            </Pressable>
            {showDatePicker && renderDatePicker()}
          </View>
          
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.cardLabel, { color: theme.muted }]}>Appointment Time</Text>
            <Pressable
              style={({ pressed }) => [
                styles.pickerTrigger,
                { borderColor: pressed ? theme.primary : theme.border, backgroundColor: pressed ? theme.secondary : theme.background },
              ]}
              onPress={handleTimePress}
              accessibilityRole="button"
              accessibilityLabel="Select appointment time"
            >
              <MaterialIcons name="schedule" size={22} color={theme.primary} style={{ marginRight: 10 }} />
              <Text style={[styles.pickerValue, { color: time ? theme.text : theme.muted }]}>{time || 'Select time'}</Text>
            </Pressable>
            {showTimePicker && renderTimePicker()}
          </View>
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
  fieldsWrapper: {
    marginBottom: 8,
    gap: 18,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 0,
    marginTop: 0,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 0,
  },
  pickerValue: {
    fontSize: 16,
    fontWeight: '600',
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
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
}); 