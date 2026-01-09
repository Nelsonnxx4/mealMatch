import { AxiosError } from "axios";

import { supabaseApi } from "@/config/axios";

export interface UpdateProfileData {
  country_code?: string;
  country_name?: string;
  country_flag?: string;
  currency?: string;
}

export const updateUserProfile = async (
  userId: string,
  data: UpdateProfileData
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
    const { data } = await supabaseApi.post(
      "/rest/v1/profiles",
      {
        user_id: userId,
        email: email,
      },
      {
        headers: {
          Prefer: "return=representation",
        },
      }
    );

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
