import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';

// Define allowed coupon statuses
const COUPON_STATUSES = ['Redeemed', 'Active', 'Expired'] as const;
type CouponStatus = typeof COUPON_STATUSES[number];

interface Coupon {
  code: string;
  description: string;
  status: CouponStatus;
}

const MOCK_COUPONS: Coupon[] = [
  { code: 'WELCOME10', description: '10% off on your first order', status: 'Redeemed' },
  { code: 'SUMMER20', description: '20% off summer tailoring', status: 'Active' },
  { code: 'EXPIRED50', description: '50% off (expired)', status: 'Expired' },
];

const STATUS_COLORS: Record<CouponStatus, string> = {
  Redeemed: '#34C759',
  Active: '#F4A259',
  Expired: '#D7263D',
};

export default function CouponsScreen() {
  const { theme } = useTheme();
  const [coupon, setCoupon] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);

  function handleRedeem() {
    if (!coupon.trim()) return;
    setCoupons([
      { code: coupon.trim().toUpperCase(), description: 'Custom coupon', status: 'Active' },
      ...coupons,
    ]);
    setCoupon('');
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 24 }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="Coupons screen"
    >
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
        <Text style={[styles.title, { color: theme.text }]}>Redeem Coupon</Text>
        <View style={styles.redeemRow}>
          <TextInput
            value={coupon}
            onChangeText={setCoupon}
            placeholder="Enter coupon code"
            placeholderTextColor={theme.muted}
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.background }]}
            accessibilityLabel="Coupon code input"
            autoCapitalize="characters"
          />
          <Pressable
            style={({ pressed }) => [
              styles.redeemButton,
              { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Redeem coupon"
            onPress={handleRedeem}
          >
            <MaterialIcons name="redeem" size={22} color={theme.white} />
            <Text style={[styles.redeemButtonText, { color: theme.white }]}>Redeem</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ height: 28 }} />
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
        <Text style={[styles.title, { color: theme.text }]}>Your Coupons</Text>
        {coupons.length === 0 ? (
          <Text style={{ color: theme.muted, marginTop: 12 }}>No coupons redeemed yet.</Text>
        ) : (
          coupons.map((c) => (
            <View key={c.code} style={styles.couponRow}>
              <MaterialIcons name="confirmation-number" size={24} color={theme.primary} style={{ marginRight: 14 }} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.couponCode, { color: theme.text }]}>{c.code}</Text>
                <Text style={[styles.couponDesc, { color: theme.muted }]}>{c.description}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[c.status] }]}> 
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{c.status}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  redeemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 10,
  },
  redeemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 1,
  },
  redeemButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  couponCode: {
    fontSize: 15,
    fontWeight: '600',
  },
  couponDesc: {
    fontSize: 13,
    color: '#888',
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
}); 