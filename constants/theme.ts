export const lightTheme = {
  primary: '#800020',
  secondary: '#F4A259',
  background: '#FAF9F6',
  text: '#222222',
  error: '#D7263D',
  success: '#34C759',
  card: '#FFFFFF',
  border: '#E0E0E0',
  muted: '#757575',
  white: '#FFFFFF',
  shadow: 'rgba(0,0,0,0.08)',
  overlayButtonBackground: 'rgba(0,0,0,0.05)',
  placeholderBackground: '#EEEEEE',
  subtleCardBackground: 'rgba(0,0,0,0.02)',
};

export const darkTheme = {
  primary: '#B22234',
  secondary: '#F4A259',
  background: '#18171C',
  text: '#F2F2F7',
  error: '#FF5A5F',
  success: '#30D158',
  card: '#232129',
  border: '#2C2C34',
  muted: '#A0A0A0',
  white: '#FFFFFF',
  shadow: 'rgba(0,0,0,0.15)',
  overlayButtonBackground: 'rgba(255,255,255,0.1)',
  placeholderBackground: '#333333',
  subtleCardBackground: 'rgba(255,255,255,0.05)',
};

export type Theme = typeof lightTheme; 