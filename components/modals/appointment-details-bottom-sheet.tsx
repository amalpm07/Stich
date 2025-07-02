import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import React, { forwardRef, useMemo } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { PrimaryButton } from '../buttons/primary-button';
import { TertiaryButton } from '../buttons/tertiary-button';

export interface AppointmentDetailsBottomSheetProps extends Omit<BottomSheetModalProps, 'children'> {
  serviceImage?: string;
  appointmentName: string;
  serviceName: string;
  addressName: string;
  addressLine: string;
  createdDate: string;
  notes?: string;
  consultationFees?: string;
  status: string;
  onRequestClose?: () => void;
}

export const AppointmentDetailsBottomSheet = forwardRef<BottomSheetModal, AppointmentDetailsBottomSheetProps>(
  (
    {
      serviceImage,
      appointmentName,
      serviceName,
      addressName,
      addressLine,
      createdDate,
      notes,
      consultationFees,
      status,
      onRequestClose,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    const snapPoints = useMemo(() => ['100%'], []);
    
    // Function to determine status background color
    const getStatusColor = (statusText: string) => {
      switch(statusText.toLowerCase()) {
        case 'scheduled':
          return 'rgba(52, 199, 89, 0.1)';
        case 'canceled':
          return 'rgba(255, 59, 48, 0.1)';
        case 'completed':
          return 'rgba(0, 122, 255, 0.1)';
        default:
          return 'rgba(142, 142, 147, 0.1)';
      }
    };
    
    // Function to determine status text color
    const getStatusTextColor = (statusText: string) => {
      switch(statusText.toLowerCase()) {
        case 'scheduled':
          return theme.success;
        case 'canceled':
          return theme.error;
        case 'completed':
          return theme.primary;
        default:
          return theme.muted;
      }
    };

    // Generate date for the visual date bubble
    const dateObj = new Date(createdDate);
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = dateObj.getDate();
    
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={props => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.6} />}
        backgroundStyle={{ backgroundColor: theme.card }}
        handleIndicatorStyle={{ backgroundColor: theme.muted, width: 40, height: 4 }}
        style={{ flex: 1 }}
        {...rest}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.container, { backgroundColor: theme.card }]}>
            {/* Close button */}
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.overlayButtonBackground }]}
              onPress={onRequestClose}
              accessibilityLabel="Close details"
              accessibilityRole="button"
            >
              <MaterialIcons name="close" size={22} color={theme.text} />
            </TouchableOpacity>
            
            {/* Hero section with image */}
            <View style={styles.heroSection}>
              <View style={styles.serviceImageContainer}>
                {serviceImage ? (
                  <Image
                    source={{ uri: serviceImage }}
                    style={styles.serviceImage}
                    contentFit="cover"
                    accessibilityLabel="Service image"
                    transition={300}
                  />
                ) : (
                  <View style={[styles.placeholderImage, { backgroundColor: theme.placeholderBackground }]}>
                    <MaterialIcons name="image" size={48} color={theme.muted} />
                  </View>
                )}
              </View>
              
              {/* Date badge */}
              <View style={[styles.dateBadge, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.dateMonth, { color: theme.muted }]}>{month}</Text>
                <Text style={[styles.dateDay, { color: theme.text }]}>{day}</Text>
              </View>
              
              {/* Title and service info */}
              <View style={styles.titleContainer}>
                <Text style={[styles.appointmentName, { color: theme.text }]}>{appointmentName}</Text>
                <Text style={[styles.serviceName, { color: theme.primary }]}>{serviceName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
                  <Text style={[styles.statusText, { color: getStatusTextColor(status) }]}>{status}</Text>
                </View>
              </View>
            </View>
            
            {/* Location card */}
            <View style={[styles.detailCard, { backgroundColor: theme.subtleCardBackground, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="location-on" size={22} color={theme.secondary} />
                <Text style={[styles.cardTitle, { color: theme.text }]}>Location</Text>
              </View>
              
              {/* Location details */}
              <View style={styles.locationContent}>
                <View style={styles.locationTextContainer}>
                  <Text style={[styles.addressName, { color: theme.text }]}>{addressName}</Text>
                  <Text style={[styles.addressLine, { color: theme.muted }]}>{addressLine}</Text>
                </View>
                
                {/* Map preview placeholder */}
                <View style={[styles.mapPreview, { backgroundColor: theme.placeholderBackground }]}>
                  <MaterialIcons name="map" size={24} color={theme.muted} />
                </View>
              </View>
            </View>
            
            {/* Details card */}
            <View style={[styles.detailCard, { backgroundColor: theme.subtleCardBackground, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="info-outline" size={22} color={theme.primary} />
                <Text style={[styles.cardTitle, { color: theme.text }]}>Details</Text>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialIcons name="event-note" size={18} color={theme.muted} style={styles.detailIcon} />
                <Text style={[styles.detailLabel, { color: theme.muted }]}>Created:</Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>{new Date(createdDate).toLocaleDateString()}</Text>
              </View>
              
              {consultationFees && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="attach-money" size={18} color={theme.success} style={styles.detailIcon} />
                  <Text style={[styles.detailLabel, { color: theme.muted }]}>Fee:</Text>
                  <Text style={[styles.detailValue, { color: theme.success }]}>{consultationFees}</Text>
                </View>
              )}
              
              {notes && (
                <View style={styles.notesContainer}>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="notes" size={18} color={theme.muted} style={styles.detailIcon} />
                    <Text style={[styles.detailLabel, { color: theme.muted }]}>Notes:</Text>
                  </View>
                  <Text style={[styles.notesText, { color: theme.text }]}>"{notes}"</Text>
                </View>
              )}
            </View>
            
            {/* Action buttons */}
            <View style={styles.actionButtonsContainer}>
              <TertiaryButton
                title="Reschedule"
                onPress={() => {}}
                accessibilityLabel="Reschedule appointment"
                iconName="event"
                style={styles.rescheduleButton}
              />
              <PrimaryButton
                title="Call Tailor"
                onPress={() => {}}
                accessibilityLabel="Call tailor"
                iconName="call"
                style={styles.callButton}
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 4 : 0,
    paddingBottom: 32,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  serviceImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 16,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBadge: {
    position: 'absolute',
    right: 20,
    top: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    width: 54,
    height: 54,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  dateDay: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -2,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  appointmentName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },
  detailCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationTextContainer: {
    flex: 1,
  },
  addressName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
  },
  mapPreview: {
    width: 64,
    height: 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    width: 70,
    fontSize: 14,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
  },
  notesContainer: {
    marginTop: 4,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    paddingLeft: 26,
    marginTop: 4,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  rescheduleButton: {
    flex: 1,
    marginRight: 8,
  },
  callButton: {
    flex: 1,
    marginLeft: 8,
  },
}); 