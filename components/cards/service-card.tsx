import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { AccessibilityRole, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { SecondaryButton } from '../buttons/secondary-button';

interface ServiceCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  rating?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function ServiceCard({
  image,
  title,
  price,
  description,
  onPress = () => {},
  accessibilityLabel = 'Service Card',
  accessibilityRole = 'button',
}: ServiceCardProps) {
  const { theme, colorScheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      activeOpacity={0.85}
      style={modernCardStyles.cardContainer}
    >
      <View style={modernCardStyles.imageWrapper}>
        <Image source={{ uri: image }} style={modernCardStyles.image} resizeMode="cover" accessibilityIgnoresInvertColors />
        <LinearGradient
          colors={colorScheme === 'dark'
            ? ['rgba(24,23,28,0.99)', 'rgba(24,23,28,0.7)', 'transparent']
            : ['rgba(255,255,255,0.99)', 'rgba(255,255,255,0.7)', 'transparent']}
          locations={[0, 0.5, 1]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={modernCardStyles.gradientOverlay}
        />
      </View>
      <View style={modernCardStyles.info}>
        <Text style={[modernCardStyles.title, { color: theme.text }]} numberOfLines={1}>{title}</Text>
        <Text style={[modernCardStyles.price, { color: theme.primary }]} numberOfLines={1}>{price}</Text>
        <Text style={[modernCardStyles.description, { color: theme.muted }]} numberOfLines={2}>{description}</Text>
        <SecondaryButton
          title="Book Now"
          onPress={onPress}
          style={modernCardStyles.button}
          accessibilityLabel="Book Now"
        />
      </View>
    </TouchableOpacity>
  );
}

const modernCardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
    minHeight: 120,
  },
  imageWrapper: {
    width: 110,
    height: 120,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  info: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
  },
});

interface ServiceTallCardV3Props {
  image: string;
  title: string;
  price: string;
  estimatedTime: string;
  buttonLabel: string;
  onButtonPress: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export function ServiceTallCard({
  image,
  title,
  price,
  estimatedTime,
  buttonLabel,
  onButtonPress,
  accessibilityLabel = 'Service Card',
  accessibilityRole = 'button',
}: ServiceTallCardV3Props) {
  const { theme, colorScheme } = useTheme();

  return (
    <View
      style={tallV3Styles.cardContainer}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      <Image
        source={{ uri: image }}
        style={tallV3Styles.backgroundImage}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <LinearGradient
        colors={colorScheme === 'dark'
          ? ['rgba(24,23,28,0.99)', 'rgba(24,23,28,0.98)', 'rgba(24,23,28,0.7)', 'rgba(24,23,28,0.4)', 'transparent']
          : ['rgba(255,255,255,0.99)', 'rgba(255,255,255,0.98)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)', 'transparent']}
        locations={[0, 0.12, 0.32, 0.55, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={tallV3Styles.gradientOverlay}
      />
      <View style={tallV3Styles.content} pointerEvents="box-none">
        <View style={tallV3Styles.textBlock}>
          <Text style={[tallV3Styles.title, { color: theme.text }]} numberOfLines={2}>{title}</Text>
          <Text style={[tallV3Styles.price, { color: theme.primary }]}>{price}</Text>
        </View>
        <SecondaryButton
          title={buttonLabel}
          onPress={onButtonPress}
          style={tallV3Styles.button}
          accessibilityLabel={buttonLabel}
        />
      </View>
    </View>
  );
}

const tallV3Styles = StyleSheet.create({
  cardContainer: {
    width: 260,
    height: 420,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    marginRight: 20,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 28,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 28,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 60,
    zIndex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  textBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  estimatedTime: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
}); 