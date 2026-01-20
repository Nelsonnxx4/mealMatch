// src/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
  createUserProfile,
} from "@/services/profile";
import { Country } from "@/types/countryType";
import { usePopToast } from "./useToast";

export const PROFILE_QUERY_KEY = "profile";

export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [PROFILE_QUERY_KEY, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await getUserProfile(user.id);

      // If profile doesn't exist, create it
      if (error && user?.email) {
        const { data: newProfile } = await createUserProfile(
          user.id,
          user.email
        );
        return newProfile;
      }

      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateCountry = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { addToast } = usePopToast();

  return useMutation({
    mutationFn: async (country: Country) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await updateUserProfile(user.id, {
        country_code: country.code,
        country_name: country.name,
        country_flag: country.flag,
        currency: country.currency,
        currency_symbol: country.currencySymbol,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data, country) => {
      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });

      addToast({
        title: "Success!",
        description: `Your country has been set to ${country.name}`,
        variant: "success",
      });
    },
    onError: (error: Error) => {
      addToast({
        title: "Error",
        description: "Failed to update country. Please try again.",
        variant: "error",
      });
    },
  });
};
