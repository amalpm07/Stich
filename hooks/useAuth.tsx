import { useRouter, useSegments } from 'expo-router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../clients/supabase'; // Ensure this file exports a valid Supabase client

interface UserMetadata {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  address?: {
    formatted_address: string;
    lat: number;
    lng: number;
  };
}

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signUp: (
    email: string,
    password: string,
    metadata: UserMetadata
  ) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
        } else {
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else {
          setUser(session?.user ?? null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // If user is authenticated and in auth group, check if onboarding is needed
      const checkOnboarding = async () => {
        const { data: userMeta, error: metaError } = await supabase
          .from('user_meta')
          .select('is_onboarded')
          .eq('id', user.id)
          .single();

        if (!metaError && !userMeta?.is_onboarded) {
          router.replace('/auth/user-onboarding');
        } else {
          router.replace('/(tabs)');
        }
      };
      checkOnboarding();
    }
  }, [user, segments, isLoading]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(data?.user ?? null);
      return { data, error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: UserMetadata) => {
    setIsLoading(true);
    try {
      // Create the user in auth.users
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.fullName,
            email: metadata.email,
            phone_number: metadata.phoneNumber,
            gender: metadata.gender
          }
        }
      });

      if (error) {
        console.error('Error signing up:', error);
        return { data: null, error };
      }

      setUser(data?.user ?? null);
      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};