import React from 'react';
import { AccessibilityRole, StyleSheet, Text, View } from 'react-native';

interface ReviewCardProps {
  rating: number;
  user: string;
  date: string;
  comment: string;
  onHelpful?: () => void;
  onReport?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function ReviewCard({
  rating,
  user,
  date,
  comment,
  onHelpful,
  onReport,
  accessibilityLabel = 'Review Card',
  accessibilityRole = 'text',
}: ReviewCardProps) {
  return (
    <View style={styles.cardContainer} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole}>
      <View style={styles.row}>
        <Text>⭐ {rating}</Text>
        <Text>{user}</Text>
        <Text>{date}</Text>
      </View>
      <Text>{comment}</Text>
      <View style={styles.row}>
        <Text onPress={onHelpful} accessibilityLabel="Mark as helpful">Helpful</Text>
        <Text onPress={onReport} accessibilityLabel="Report review">Report</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 