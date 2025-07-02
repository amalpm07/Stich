import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { AccessibilityRole, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { SecondaryButton } from '../buttons/secondary-button';

interface OrderCardProps {
  orderId: string;
  date: string;
  status: string;
  total: string;
  onDetailsPress?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#34C759',
  'In Progress': '#F4A259',
  Cancelled: '#D7263D',
};

export function OrderCard({
  orderId,
  date,
  status,
  total,
  onDetailsPress,
  accessibilityLabel = 'Order Card',
  accessibilityRole = 'button',
}: OrderCardProps) {
  const { theme } = useTheme();
  const statusColor = STATUS_COLORS[status] || theme.primary;

  return (
    <View
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      <View style={styles.headerRow}>
        <MaterialIcons name="shopping-basket" size={26} color={theme.primary} style={{ marginRight: 14 }} />
        <Text style={[styles.orderId, { color: theme.text }]}>Order #{orderId}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}> 
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{status}</Text>
        </View>
      </View>
      <Text style={[styles.date, { color: theme.muted }]}>Date: {date}</Text>
      <Text style={[styles.total, { color: theme.text }]}>Total: {total}</Text>
      <SecondaryButton
        title="View Details"
        iconName="arrow-forward"
        onPress={onDetailsPress ?? (() => {})}
        accessibilityLabel={`View details for order ${orderId}`}
        style={{ alignSelf: 'flex-start', marginTop: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    marginBottom: 2,
  },
  total: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
}); 