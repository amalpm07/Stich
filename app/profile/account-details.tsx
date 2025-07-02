import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme-context';
import { useAuth } from '../../hooks/useAuth';
import { useUserMeta } from '../../hooks/useUserMeta';

interface UserData {
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
  gender: string | null;
  profile_url: string | null;
}

export default function AccountDetailsScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { getUserMeta, updateUserMeta } = useUserMeta();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      if (!user?.id) {
        setError('User not authenticated');
        return;
      }

      const userMeta = await getUserMeta(user.id);
      if (!userMeta) {
        setError('Failed to fetch user data');
        return;
      }

      setUserData({
        full_name: userMeta.full_name,
        email: userMeta.email,
        phone_number: userMeta.phone_number,
        gender: userMeta.gender,
        profile_url: userMeta.profile_url
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (field: keyof UserData, value: string) => {
    try {
      if (!user?.id) {
        setError('User not authenticated');
        return;
      }

      const updatedData = await updateUserMeta(user.id, {
        [field]: value
      });

      if (updatedData) {
        setUserData(prev => prev ? { ...prev, [field]: value } : null);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  const handleUpdateProfilePhoto = async () => {
    // TODO: Implement profile photo upload
    console.log('Profile photo update not implemented yet');
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.error }}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No user data found</Text>
      </View>
    );
  }

  const fields = [
    { label: 'Name', value: userData.full_name || 'Not set', icon: 'person', field: 'full_name' as const },
    { label: 'Email', value: userData.email || 'Not set', icon: 'email', field: 'email' as const },
    { label: 'Phone', value: userData.phone_number || 'Not set', icon: 'phone', field: 'phone_number' as const },
    { label: 'Gender', value: userData.gender || 'Not set', icon: 'wc', field: 'gender' as const },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 24 }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="Account Details screen"
    >
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
        <View style={styles.profilePhotoRow}>
          <Image
            source={{ uri: userData.profile_url || 'https://via.placeholder.com/90' }}
            style={styles.profileImage}
            accessibilityLabel="Profile photo"
          />
          <Pressable
            style={({ pressed }) => [
              styles.editPhotoButton,
              { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Edit Profile Photo"
            onPress={handleUpdateProfilePhoto}
          >
            <MaterialIcons name="edit" size={20} color={theme.white} />
          </Pressable>
        </View>
        <View style={{ height: 18 }} />
        {fields.map((field) => (
          <View key={field.label} style={styles.fieldRow}>
            <MaterialIcons name={field.icon as any} size={24} color={theme.primary} style={{ marginRight: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.fieldLabel, { color: theme.muted }]}>{field.label}</Text>
              <Text style={[styles.fieldValue, { color: theme.text }]}>{field.value}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                { backgroundColor: theme.secondary, opacity: pressed ? 0.8 : 1 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Edit ${field.label}`}
              onPress={() => handleUpdateProfile(field.field, field.value)}
            >
              <MaterialIcons name="edit" size={20} color={theme.white} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: 'center',
  },
  profilePhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  editPhotoButton: {
    marginLeft: 18,
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 17,
    fontWeight: '600',
  },
  editButton: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 16,
    elevation: 1,
  },
}); 