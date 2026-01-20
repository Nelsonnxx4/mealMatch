export interface Profile {
  id: string;
  user_id: string;

  email: string | null;
  full_name: string | null;
  avatar_url: string | null;

  // Country/Location details
  country_code: string | null;
  country_name: string | null;
  country_flag: string | null;
  currency: string | null;
  currency_symbol: string | null;

  // Timestamps
  created_at: string;
  updated_at?: string;
}

export interface ProfileUpdateData {
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  country_code?: string | null;
  country_name?: string | null;
  country_flag?: string | null;
  currency?: string | null;
  currency_symbol?: string | null;
}
