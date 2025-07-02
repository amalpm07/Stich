import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { AccessibilityRole, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { TertiaryButton } from '../buttons/tertiary-button';

interface AppointmentCardProps {
  date: string;
  time: string;
  appointmentName: string;
  serviceName: string;
  location: string;
  onViewDetails?: () => void;
  onReschedule?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function AppointmentCard({
  date,
  time,
  appointmentName,
  serviceName,
  location,
  onViewDetails,
  onReschedule,
  accessibilityLabel = 'Appointment Card',
  accessibilityRole = 'button',
}: AppointmentCardProps) {
  const { theme } = useTheme();

  function getDateParts(dateStr: string) {
    const d = new Date(dateStr);
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate();
    return { month, day };
  }
  const { month, day } = getDateParts(date);

  return (
    <View
      style={[styles.cardContainer, { backgroundColor: theme.card, borderColor: theme.border, shadowColor: theme.text + '10' }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      <View style={styles.topRow}>
        <View style={styles.infoContainer}>
          <Text style={[styles.appointmentName, { color: theme.text }]} numberOfLines={1}>{appointmentName}</Text>
          <Text style={[styles.serviceName, { color: theme.muted }]} numberOfLines={1}>{serviceName}</Text>
          <Text style={[styles.location, { color: theme.muted }]} numberOfLines={1}>{location}</Text>
          <View style={styles.timeRow}>
            <MaterialIcons name="schedule" size={18} color={theme.text} style={{ marginRight: 4 }} />
            <Text style={[styles.time, { color: theme.text }]}>{time}</Text>
          </View>
        </View>
        <View style={[styles.dateBadge, { backgroundColor: theme.background, borderColor: theme.border }]}
          accessible accessibilityLabel={`Date: ${month} ${day}`}
        >
          <Text style={[styles.dateMonth, { color: theme.muted }]}>{month}</Text>
          <Text style={[styles.dateDay, { color: theme.text }]}>{day}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TertiaryButton
          title="View Details"
          onPress={onViewDetails || (() => {})}
          accessibilityLabel="View appointment details"
          style={styles.detailsButton}
        />
        <TouchableOpacity
          onPress={onReschedule || (() => {})}
          accessibilityLabel="Reschedule appointment"
          accessibilityRole="button"
          style={styles.iconButton}
        >
          <MaterialIcons name="event" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 18,
    borderWidth: 1,
    paddingTop: 18,
    paddingRight: 18,
    paddingLeft: 18,
    paddingBottom: 10,
    marginBottom: 18,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    minHeight: 120,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  appointmentName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: undefined,
    marginBottom: 2,
  },
  dateBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    width: 48,
    height: 48,
    marginLeft: 12,
    paddingVertical: 2,
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    marginRight: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
}); 