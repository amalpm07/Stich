import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ProfileMenuItem } from '../../components';
import { AlertModal } from '../../components/modals/alert-modal';
import { useTheme } from '../../contexts/theme-context';
import { useUser } from '../../contexts/user-context';
import { useAuth } from '../../hooks/useAuth';
import { useAuthActions } from '../../hooks/useAuthActions';

interface QuickAction {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}

function ProfileHeader() {
  const { theme } = useTheme();
  const { profile } = useUser();
  const { user } = useAuth();
  // Fallbacks for missing data
  const avatarUrl = profile?.avatarUrl || user?.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/women/44.jpg';
  const name = profile?.name || user?.user_metadata?.full_name || user?.email || user?.phone || 'User';
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.profileImage}
        accessibilityLabel="Profile photo"
      />
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.editButton,
          { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Edit Profile"
        onPress={() => {}}
      >
        <Text style={[styles.editButtonText, { color: theme.white }]}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

function QuickActionsRow() {
  const { theme } = useTheme();
  const router = useRouter();
  const actions: QuickAction[] = [
    { label: 'Orders', icon: 'shopping-basket', onPress: () => router.push('/orders') },
    { label: 'Measurements', icon: 'straighten', onPress: () => router.push('/measurements') },
    { label: 'Addresses', icon: 'location-on', onPress: () => router.push('/profile/addresses') },
  ];
  return (
    <View style={styles.quickActionsRow}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          style={({ pressed }) => [
            styles.quickAction,
            { backgroundColor: theme.card, opacity: pressed ? 0.8 : 1, borderColor: theme.border },
          ]}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.onPress}
        >
          <MaterialIcons name={action.icon} size={24} color={theme.primary} />
          <Text style={[styles.quickActionLabel, { color: theme.text }]}>{action.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function ProfileTabScreen() {
  const { height } = useWindowDimensions();
  const { theme } = useTheme();
  const router = useRouter();
  const { signOut, isLoading } = useAuthActions();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const menuItems = [
    { label: 'Account Details', icon: 'person-outline', route: '/profile/account-details' },
    { label: 'Support', icon: 'support-agent', route: '/profile/support' },
    { label: 'Application Settings', icon: 'settings', route: '/profile/application-settings' },
    { label: 'About StitchKaro', icon: 'info-outline', route: '/profile/about-stitchkaro' },
    { label: 'Logout', icon: 'logout', route: null },
  ];

  const handleMenuPress = (item: typeof menuItems[number]) => {
    if (item.route) router.push(item.route as any);
    else if (item.label === 'Logout') setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await signOut();
    router.replace('/');
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingTop: 48, paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        accessible
        accessibilityLabel="Profile screen"
      >
        <ProfileHeader />
        <QuickActionsRow />
        <View style={{ height: 32 }} />
        <View style={{ backgroundColor: theme.background, borderRadius: 18, overflow: 'hidden', marginBottom: 24 }}>
          {menuItems.map((item) => (
            <ProfileMenuItem
              key={item.label}
              label={item.label}
              icon={item.icon as any}
              onPress={() => handleMenuPress(item)}
              accessibilityLabel={item.label}
            />
          ))}
        </View>
      </ScrollView>
      <AlertModal
        visible={showLogoutModal}
        title="Log out?"
        description="Are you sure you want to log out of your account?"
        confirmLabel={isLoading ? 'Logging out...' : 'Log out'}
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
        confirmColor={theme.error}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
    elevation: 2,
  },
  editButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 8,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 2,
    elevation: 1,
  },
  quickActionLabel: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 2,
  },
  cardButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 16,
  },
  cardButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.2,
  },
}); 