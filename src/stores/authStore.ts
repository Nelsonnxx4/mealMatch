import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOut as authSignOut,
} from "@/services/auth";
import {
  updateUserProfile,
  createUserProfile,
  getUserProfile,
} from "@/services/profile";
import { Profile } from "@/types/profileType";
import { Country } from "@/types/countryType";

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  showCountryModal: boolean;
}

interface AuthActions {
  initialize: () => () => void;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  fetchProfile: (userId: string) => Promise<void>;
  updateCountry: (country: Country) => Promise<{ error: Error | null }>;
  setShowCountryModal: (show: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  initialized: false,
  showCountryModal: false,

  setShowCountryModal: (show: boolean) => {
    set({ showCountryModal: show });
  },

  initialize: () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      set({ session, user: session?.user ?? null, loading: false });

      if (session?.user) {
        await get().fetchProfile(session.user.id);

        // Check if country is not set and show modal
        const profile = get().profile;

        if (!profile?.country_code) {
          set({ showCountryModal: true });
        }
      } else {
        set({ profile: null });
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
        initialized: true,
      });

      if (session?.user) {
        await get().fetchProfile(session.user.id);

        // Check if country is not set and show modal
        const profile = get().profile;

        if (!profile?.country_code) {
          set({ showCountryModal: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  },

  fetchProfile: async (userId: string) => {
    const { data, error } = await getUserProfile(userId);

    if (!error && data) {
      set({ profile: data as Profile });
    } else if (!data) {
      // Create profile if it doesn't exist
      const user = get().user;

      if (user?.email) {
        const { data: newProfile } = await createUserProfile(
          userId,
          user.email
        );

        if (newProfile) {
          set({ profile: newProfile as Profile });
        }
      }
    }
  },

  updateCountry: async (country: Country) => {
    const userId = get().user?.id;

    if (!userId) {
      return { error: new Error("User not authenticated") };
    }

    const { data, error } = await updateUserProfile(userId, {
      country_code: country.code,
      country_name: country.name,
      country_flag: country.flag,
      currency: country.currency,
      currency_symbol: country.currencySymbol,
    });

    if (!error && data) {
      set({
        profile: data as Profile,
        showCountryModal: false,
      });
    }

    return { error: error as Error | null };
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
      set({
        user: null,
        session: null,
        profile: null,
        showCountryModal: false,
      });
    }

    return { error: error as Error | null };
  },
}));
