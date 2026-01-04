import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOut as authSignOut,
  getUserProfile,
} from "@/services/auth";

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  created_at: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
}

interface AuthActions {
  initialize: () => () => void;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  fetchProfile: (userId: string) => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  initialized: false,

  initialize: () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      set({ session, user: session?.user ?? null, loading: false });

      if (session?.user) {
        setTimeout(() => {
          get().fetchProfile(session.user.id);
        }, 0);
      } else {
        set({ profile: null });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
        initialized: true,
      });

      if (session?.user) {
        get().fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  },

  fetchProfile: async (userId: string) => {
    const { data, error } = await getUserProfile(userId);

    if (!error && data) {
      set({ profile: data as Profile });
    }
  },

  signUp: async (email: string, password: string) => {
    const { error } = await signUpWithEmail(email, password);

    return { error: error as Error | null };
  },

  signIn: async (email: string, password: string) => {
    const { error } = await signInWithEmail(email, password);

    return { error: error as Error | null };
  },

  signInWithGoogle: async () => {
    const { error } = await signInWithGoogle();

    return { error: error as Error | null };
  },

  signOut: async () => {
    const { error } = await authSignOut();

    if (!error) {
      set({ user: null, session: null, profile: null });
    }

    return { error: error as Error | null };
  },
}));
