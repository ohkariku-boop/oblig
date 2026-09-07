import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, hasSupabase } from '@/lib/supabase';
import { setErrorLogUser } from '@/lib/errorLogging';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setErrorLogUser(data.session?.user?.id ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setErrorLogUser(session?.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string) {
    if (!supabase) return { error: 'Backend not configured yet.' };
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  }

  async function signIn(email: string, password: string) {
    if (!supabase) return { error: 'Backend not configured yet.' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function resetPassword(email: string) {
    if (!supabase) return { error: 'Backend not configured yet.' };
    const redirectTo = `${window.location.origin}/login?mode=update-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    return { error: error?.message ?? null };
  }

  async function updatePassword(password: string) {
    if (!supabase) return { error: 'Backend not configured yet.' };
    const { error } = await supabase.auth.updateUser({ password });
    return { error: error?.message ?? null };
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, resetPassword, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { hasSupabase };
