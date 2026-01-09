import { AxiosError } from "axios";

import { supabaseApi } from "@/config/axios";
import { supabase } from "@/config/supabase";

export interface AuthResponse {
  data: any;
  error: Error | AxiosError | null;
}

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const redirectUrl = `${window.location.origin}/`;

  try {
    const { data } = await supabaseApi.post("/auth/v1/signup", {
      email,
      password,
      options: {
        email_redirect_to: redirectUrl,
      },
    });

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await supabaseApi.post(
      "/auth/v1/token?grant_type=password",
      {
        email,
        password,
      }
    );

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
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

export const signOut = async (): Promise<{
  error: Error | AxiosError | null;
}> => {
  try {
    await supabaseApi.post("/auth/v1/logout");

    return { error: null };
  } catch (error) {
    return { error: error as AxiosError };
  }
};

export const getSession = async (): Promise<AuthResponse> => {
  try {
    const { data } = await supabaseApi.get("/auth/v1/session");

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};

export const getUser = async (): Promise<AuthResponse> => {
  try {
    const { data } = await supabaseApi.get("/auth/v1/user");

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data } = await supabaseApi.get("/rest/v1/profiles", {
      params: {
        user_id: `eq.${userId}`,
        select: "*",
        limit: 1,
      },
    });

    return {
      data: data && data.length > 0 ? data[0] : null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};

// Optional: Add a refresh token function
export const refreshSession = async (
  refreshToken: string
): Promise<AuthResponse> => {
  try {
    const { data } = await supabaseApi.post(
      "/auth/v1/token?grant_type=refresh_token",
      {
        refresh_token: refreshToken,
      }
    );

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};
