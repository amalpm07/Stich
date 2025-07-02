import { useCallback, useState } from 'react';
import { useUser } from '../contexts/user-context';
import {
  AuthUser,
  sendPasswordResetForEmail,
  signInWithPhone,
  signInWithProvider,
  signOut,
  signUpWithEmail,
  signUpWithPhone,
  updatePassword,
} from '../services/authService';
import { upsertUserMeta, UserMetaInput } from '../services/profileService';
import { useAuth } from './useAuth';

interface AuthActionResult {
  user: AuthUser | null;
  error: string | null;
}

export function useAuthActions() {
  useAuth(); // Only to trigger re-render and access context if needed
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { clearProfile } = useUser();

  const signUp = useCallback(async (phone: string, password: string): Promise<AuthActionResult> => {
    setIsLoading(true);
    const result = await signUpWithPhone(phone, password);
    setIsLoading(false);
    return result;
  }, []);

  const signUpWithEmailAction = useCallback(async (email: string, password: string): Promise<AuthActionResult> => {
    setIsLoading(true);
    const result = await signUpWithEmail(email, password);
    setIsLoading(false);
    return result;
  }, []);

  const signIn = useCallback(async (phone: string, password: string): Promise<AuthActionResult> => {
    setIsLoading(true);
    const result = await signInWithPhone(phone, password);
    setIsLoading(false);
    return result;
  }, []);

  const signInWithSocial = useCallback(async (provider: 'google' | 'facebook' | 'apple'): Promise<AuthActionResult> => {
    setIsLoading(true);
    const result = await signInWithProvider(provider);
    setIsLoading(false);
    return result;
  }, []);

  const requestPasswordResetForEmail = useCallback(async (email: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    const result = await sendPasswordResetForEmail(email);
    setIsLoading(false);
    return result;
  }, []);

  const resetPassword = useCallback(async (newPassword: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    const result = await updatePassword(newPassword);
    setIsLoading(false);
    return result;
  }, []);

  const signOutUser = useCallback(async (): Promise<{ error: string | null }> => {
    setIsLoading(true);
    const result = await signOut();
    if (!result.error) clearProfile();
    setIsLoading(false);
    return result;
  }, [clearProfile]);

  const upsertUserMetaAction = useCallback(
    async ({ fullName, email, phoneNumber, gender }: Omit<UserMetaInput, 'id'>) => {
      if (!user?.id) throw new Error('User not authenticated');
      await upsertUserMeta({
        id: user.id,
        fullName,
        email,
        phoneNumber,
        gender,
      });
    },
    [user]
  );

  return {
    isLoading,
    signUp,
    signUpWithEmail: signUpWithEmailAction,
    signIn,
    signInWithSocial,
    requestPasswordResetForEmail,
    resetPassword,
    signOut: signOutUser,
    upsertUserMeta: upsertUserMetaAction,
  };
} 