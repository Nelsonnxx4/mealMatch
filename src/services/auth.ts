import { supabase } from "@/config/supabase";
import { supabaseApi } from "@/config/axios";

export const signUpWithEmail = async (email: string, password: string) => {
  const redirectUrl = `${window.location.origin}/`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });

  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signInWithGoogle = async () => {
  const redirectUrl = `${window.location.origin}/`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  return { data, error };
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
};
