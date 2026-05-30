import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
  phone: string;
  address: Record<string, string>;
  created_at: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const createProfile = async (userId: string, fullName?: string) => {
    const profileData = {
      id: userId,
      full_name: fullName || '',
      avatar_url: '',
      phone: '',
      address: {},
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(profileData);
    if (error) {
      console.error('Could not create profile', error);
    }
    return error;
  };

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Fetch profile error', error);
      setProfile(null);
      return;
    }

    if (data) {
      setProfile(data);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const fullName = userData?.user?.user_metadata?.full_name || '';
    await createProfile(userId, fullName);
    setProfile({
      id: userId,
      full_name: fullName,
      avatar_url: '',
      phone: '',
      address: {},
      created_at: new Date().toISOString(),
    });
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: error.message || 'Invalid login credentials. Please try again.' };
    }

    if (!data?.user || !data?.session) {
      return {
        error:
          'Unable to sign in. Please verify your email address, password, or reset your password if needed.',
      };
    }

    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data?.user) {
      await createProfile(data.user.id, fullName);
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates });

    if (error) {
      return { error: error.message };
    }

    setProfile((prev) => prev ? { ...prev, ...updates } : null);
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
