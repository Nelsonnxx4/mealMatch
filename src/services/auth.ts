import { supabase } from "@/config/supabase";

export interface AuthResponse {
  data: any;
  error: Error | null;
}

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    
    console.error("Signup error:", error);

    return {
      data: null,
      error: error as Error,
    };
  }
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const signInWithGoogle = async () => {
  const redirectUrl = `${window.location.origin}/auth/callback`;

  console.log("Starting Google sign-in with redirect:", redirectUrl);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Google sign-in error:", error);
  } else {
    console.log("Google sign-in initiated successfully");
  }

  return { data, error };
};

export const signOut = async (): Promise<{
  error: Error | null;
}> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};

export const getSession = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const getUser = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};
