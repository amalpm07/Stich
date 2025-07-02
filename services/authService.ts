/**
 * Authentication service for Supabase + Expo.
 * Provides phone/password and social login flows, password reset, and logout.
 * Uses Zod for validation and Expo AuthSession/WebBrowser for OAuth.
 */
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as z from 'zod';
import { supabase } from '../clients/supabase';

/**
 * AuthUser represents a minimal user object returned by auth flows.
 */
export interface AuthUser {
  id: string;
  email?: string; // Kept for social logins that might return email
  phone?: string;
}

/**
 * AuthResponse is the standard return type for all auth actions.
 * - user: the authenticated user (if successful)
 * - error: error message (if any)
 */
export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

// --- Zod Schemas for validation ---
// Basic phone validation: starts with +, followed by 10-14 digits.
// For robust validation, consider a library like libphonenumber-js.
const phoneSchema = z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number format (e.g., +1234567890)");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const emailSchema = z.string().email("Invalid email address");

/**
 * Register a new user with phone and password.
 * @param phone - user's phone number (e.g., +1234567890)
 * @param password - user's password
 * @returns AuthResponse with user or error
 */
export async function signUpWithPhone(phone: string, password: string): Promise<AuthResponse> {
  try {
    console.log('=== Starting Phone Sign Up Process ===');
    console.log('1. Validating input...');
    
    const phoneResult = phoneSchema.safeParse(phone);
    const passwordResult = passwordSchema.safeParse(password);
    
    if (!phoneResult.success) {
      console.log('Phone validation failed:', phoneResult.error);
      return { user: null, error: phoneResult.error.issues[0]?.message || 'Invalid phone number' };
    }
    if (!passwordResult.success) {
      console.log('Password validation failed:', passwordResult.error);
      return { user: null, error: passwordResult.error.issues[0]?.message || 'Password too short' };
    }

    console.log('2. Validation passed, preparing Supabase call...');
    console.log('Phone:', phone);
    console.log('Password length:', password.length);

    // Format phone number to ensure it has + prefix
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    console.log('3. Formatted phone number:', formattedPhone);

    console.log('4. Calling Supabase auth.signUp...');
    const { data, error } = await supabase.auth.signUp({
      phone: formattedPhone,
      password,
      options: {
        data: {
          phone: formattedPhone,
        }
      }
    });

    if (error) {
      console.error('5. Supabase sign up error:', error);
      return { user: null, error: error.message };
    }
    
    if (!data.user) {
      console.error('5. No user returned from Supabase');
      return { user: null, error: 'No user returned after sign up' };
    }

    console.log('5. Sign up successful, user:', data.user);
    console.log('=== Phone Sign Up Process Complete ===');
    
    // Create user metadata
    try {
      console.log('6. Creating user metadata...');
      await supabase.from('user_meta').insert([
        {
          id: data.user.id,
          phone_number: formattedPhone,
          is_active: true,
          is_onboarded: false
        }
      ]);
      console.log('7. User metadata created successfully');
    } catch (metaError) {
      console.error('Error creating user metadata:', metaError);
      // Don't return error here as the user is already created
    }
    
    return { 
      user: { 
        id: data.user.id, 
        phone: data.user.phone ?? undefined, 
        email: data.user.email ?? undefined 
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Unexpected error in signUpWithPhone:', error);
    return { user: null, error: 'An unexpected error occurred during sign up' };
  }
}

/**
 * Log in a user with phone and password.
 * @param phone - user's phone number (e.g., +1234567890)
 * @param password - user's password
 * @returns AuthResponse with user or error
 */
export async function signInWithPhone(phone: string, password: string): Promise<AuthResponse> {
  try {
    console.log('Starting phone sign in with:', phone); // Debug log
    
    const phoneResult = phoneSchema.safeParse(phone);
    const passwordResult = passwordSchema.safeParse(password);
    
    if (!phoneResult.success) {
      console.log('Phone validation failed:', phoneResult.error); // Debug log
      return { user: null, error: phoneResult.error.issues[0]?.message || 'Invalid phone number' };
    }
    if (!passwordResult.success) {
      console.log('Password validation failed:', passwordResult.error); // Debug log
      return { user: null, error: passwordResult.error.issues[0]?.message || 'Password too short' };
    }

    // Format phone number to ensure it has + prefix
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    console.log('Attempting Supabase sign in with formatted phone:', formattedPhone); // Debug log

    const { data, error } = await supabase.auth.signInWithPassword({
      phone: formattedPhone,
      password,
    });

    if (error) {
      console.error('Supabase sign in error:', error); // Debug log
      return { user: null, error: error.message };
    }
    
    if (!data.user) {
      console.error('No user returned from Supabase'); // Debug log
      return { user: null, error: 'No user returned after sign in' };
    }

    console.log('Sign in successful, user:', data.user); // Debug log
    return { 
      user: { 
        id: data.user.id, 
        phone: data.user.phone ?? undefined, 
        email: data.user.email ?? undefined 
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Unexpected error in signInWithPhone:', error); // Debug log
    return { user: null, error: 'An unexpected error occurred during sign in' };
  }
}

/**
 * Send a password reset email to the user.
 * Note: Supabase's default resetPasswordForEmail sends an email.
 * For phone-based password reset, you'd typically use an OTP flow, which is different.
 * This function remains for email-based recovery if accounts can also have emails.
 * If primary identifier is phone, this flow needs to be re-thought (e.g. reset via OTP to phone).
 * @param email - user's email (if they have one and it's used for recovery)
 * @returns { error } - error message if any
 */
export async function sendPasswordResetForEmail(email: string): Promise<{ error: string | null }> {
  const emailSchema = z.string().email(); // Local email schema for this function
  const emailResult = emailSchema.safeParse(email);
  if (!emailResult.success) return { error: 'Invalid email' };
  // TODO: Clarify redirect URL for password reset if needed, or set in Supabase dashboard
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // redirectTo: 'your-app://reset-password-screen', // Example redirect
  });
  if (error) return { error: error.message };
  return { error: null };
}

/**
 * Update the user's password (after reset or while logged in).
 * @param newPassword - new password
 * @returns { error } - error message if any
 */
export async function updatePassword(newPassword: string): Promise<{ error: string | null }> {
  const passwordResult = passwordSchema.safeParse(newPassword);
  if (!passwordResult.success) return { error: passwordResult.error.issues[0]?.message || 'Password too short' };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };
  return { error: null };
}

/**
 * Register a new user with email and password.
 * @param email - user's email address
 * @param password - user's password
 * @returns AuthResponse with user or error
 */
export async function signUpWithEmail(email: string, password: string): Promise<AuthResponse> {
  const emailResult = emailSchema.safeParse(email);
  const passwordResult = passwordSchema.safeParse(password);
  if (!emailResult.success) return { user: null, error: emailResult.error.issues[0]?.message || 'Invalid email' };
  if (!passwordResult.success) return { user: null, error: passwordResult.error.issues[0]?.message || 'Password too short' };

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { user: null, error: error.message };
  if (!data.user) return { user: null, error: 'No user returned after sign up' };
  return { user: { id: data.user.id, email: data.user.email ?? undefined, phone: data.user.phone ?? undefined }, error: null };
}

// --- Social Logins (OAuth) ---
// Call this at the top level of your app for web compatibility
WebBrowser.maybeCompleteAuthSession();

const getRedirectUrl = () => AuthSession.makeRedirectUri({
  // For usage in bare and standalone apps, the scheme must be set here explicitly
  // scheme: 'your-app-scheme' // e.g., from app.json
});

/**
 * Sign in with a social provider (Google, Facebook, Apple).
 * Handles the OAuth flow using Supabase and Expo WebBrowser.
 * @param provider - 'google' | 'facebook' | 'apple'
 * @returns AuthResponse with user or error
 */
export async function signInWithProvider(provider: 'google' | 'facebook' | 'apple'): Promise<AuthResponse> {
  const redirectTo = getRedirectUrl();
  // 1. Get the OAuth URL from Supabase
  const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });
  if (oauthError) return { user: null, error: oauthError.message };
  if (!data?.url) return { user: null, error: 'No OAuth URL returned' };

  // 2. Open the OAuth URL in a browser and wait for redirect
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  // Ensure the session is handled correctly after redirect
  // For Expo Go, this might involve handling the URL.
  // For standalone/bare apps, deep linking setup is crucial.

  if (result.type === 'success' && result.url) {
    // With PKCE flow, the session is exchanged automatically by the Supabase client library
    // if deep linking is correctly configured and the app receives the URL.
    // We might need to explicitly handle the session from the URL if `detectSessionInUrl` isn't working as expected.
    // Example: const { session, error } = await supabase.auth.getSessionFromUrl(result.url);
    // However, usually getSession() after the redirect is enough if the client handles it.
  } else if (result.type !== 'success') {
    return { user: null, error: 'OAuth cancelled or failed' };
  }

  // 3. Supabase client library should handle setting the session.
  // Wait a brief moment for the session to be potentially processed by the listener in Supabase client
  await new Promise(resolve => setTimeout(resolve, 500)); 

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) return { user: null, error: sessionError.message };
  
  const user = sessionData.session?.user;
  if (!user) {
    // This can happen if the redirect wasn't processed correctly by the Supabase client.
    // Or if user closed the tab before Supabase could set the session.
    return { user: null, error: 'OAuth sign-in successful, but no user session found. Please try again or check deep link setup.' };
  }
  return { user: { id: user.id, email: user.email ?? undefined, phone: user.phone ?? undefined }, error: null };
}

/**
 * Log out the current user and clear the session.
 * @returns { error } - error message if any
 */
export async function signOut(): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.signOut();
  if (error) return { error: error.message };
  return { error: null };
} 