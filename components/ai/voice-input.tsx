import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface VoiceInputProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  transcript?: string;
}

export function VoiceInput({ isRecording, onStart, onStop, transcript }: VoiceInputProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.recordButton, { backgroundColor: isRecording ? '#FF3B30' : '#34C759' }]}
        onPress={isRecording ? onStop : onStart}
        accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
      >
        <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Record'}</Text>
      </TouchableOpacity>
      {transcript && <Text style={styles.transcript}>{transcript}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  recordButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transcript: {
    color: '#222',
    fontSize: 16,
    marginTop: 8,
  },
}); 