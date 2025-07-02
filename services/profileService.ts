export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface UserMetaInput {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
}

import { supabase } from '../clients/supabase';

export async function profileExists(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_meta')
    .select('id')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function getProfile(id: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_meta')
    .select('id, full_name, email, phone_number, profile_url')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    name: data.full_name,
    email: data.email,
    phone: data.phone_number,
    avatarUrl: data.profile_url || undefined,
  };
}

export async function updateProfile(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
  // Check if profile exists first
  const exists = await profileExists(id);
  if (!exists) {
    throw new Error('Profile not found');
  }

  // Map UserProfile fields to user_meta columns
  const updateData: any = {};
  if (data.name !== undefined) updateData.full_name = data.name;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone_number = data.phone;
  if (data.avatarUrl !== undefined) updateData.profile_url = data.avatarUrl;

  const { error } = await supabase
    .from('user_meta')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;

  // Return the updated profile
  const updatedProfile = await getProfile(id);
  if (!updatedProfile) {
    throw new Error('Failed to fetch updated profile');
  }
  return updatedProfile;
}

export async function uploadProfileImage(userId: string, imageUri: string): Promise<string> {
  // Implement image upload logic
  return 'avatar-url';
}

export async function upsertUserMeta(data: UserMetaInput): Promise<void> {
  const { error } = await supabase.from('user_meta').upsert([
    {
      id: data.id,
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phoneNumber,
      gender: data.gender,
      is_onboarded: true,
      is_active: true,
    },
  ]);
  if (error) throw error;
} 