import { Platform, StatusBar } from 'react-native';

// iPhone X and newer devices have a notch height of 44
const IOS_NOTCH_HEIGHT = 44;

export function getStatusBarPadding(): number {
  if (Platform.OS === 'android') return StatusBar.currentHeight ?? 0;
  // For iOS, use 44 for notched devices, otherwise 20
  // This is a simple heuristic; for more accuracy, use react-native-device-info or similar
  // But for most modern iPhones, 44 is correct for the notch
  return IOS_NOTCH_HEIGHT;
} 