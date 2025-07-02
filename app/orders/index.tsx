import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OrderCard } from '../../components';
import { useTheme } from '../../contexts/theme-context';
import { useOrders } from '../../hooks/useOrders';

const STATUS_COLORS: Record<string, string> = {
  pending: '#F4A259',
  confirmed: '#4A90E2',
  measuring: '#9B59B6',
  stitching: '#3498DB',
  quality_check: '#F1C40F',
  shipping: '#2ECC71',
  delivered: '#34C759',
  cancelled: '#D7263D',
};

export default function OrdersListScreen() {
  const { theme } = useTheme();
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 24 }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="Orders List screen"
    >
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          orderId={order.id}
          date={new Date(order.created_at).toLocaleDateString()}
          status={order.status}
          total={`₹${order.total_amount.toFixed(2)}`}
          onDetailsPress={() => {}}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 24,
  },
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
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    elevation: 1,
  },
  detailsButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 