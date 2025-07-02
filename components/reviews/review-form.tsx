import React, { useState } from 'react';
import { AccessibilityRole, Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function ReviewForm({
  onSubmit,
  accessibilityLabel = 'Review Form',
  accessibilityRole = 'none',
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  function handleStarPress(star: number) {
    setRating(star);
  }

  function handleSubmit() {
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  }

  return (
    <View style={styles.formContainer} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole}>
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text
            key={star}
            onPress={() => handleStarPress(star)}
            accessibilityLabel={`Rate ${star} star${star > 1 ? 's' : ''}`}
            style={[styles.star, star <= rating && styles.starSelected]}
          >
            ★
          </Text>
        ))}
      </View>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write your review..."
        multiline
        accessibilityLabel="Review comment"
        style={styles.commentInput}
      />
      <Button title="Submit" onPress={handleSubmit} accessibilityLabel="Submit review" />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    fontSize: 24,
    color: '#ccc',
    marginRight: 4,
  },
  starSelected: {
    color: '#FFD700',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
  },
}); 