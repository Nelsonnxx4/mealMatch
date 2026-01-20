import { AxiosError } from "axios";

import { supabaseApi } from "@/config/axios";
import { supabase } from "@/config/supabase";

export interface ProfileUpdate {
  email?: string;
  country_code?: string | null;
  country_name?: string | null;
  country_flag?: string | null;
  currency?: string | null;
  currency_symbol?: string | null;
}

export const updateUserProfile = async (
  userId: string,
  data: ProfileUpdate
) => {
  try {
    const { data: response } = await supabaseApi.patch(
      `/rest/v1/profiles?user_id=eq.${userId}`,
      data,
      {
        headers: {
          Prefer: "return=representation",
        },
      }
    );

    return {
      data: response && response.length > 0 ? response[0] : null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};

export const createUserProfile = async (userId: string, email: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        user_id: userId,
        email: email,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(); // Changed from .single() to .maybeSingle()

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);

    return {
      data: null,
      error: error as Error,
    };
  }
};

// Alternative implementation using headers explicitly
export const getUserProfileAlt = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);

    return {
      data: null,
      error: error as Error,
    };
  }
};
