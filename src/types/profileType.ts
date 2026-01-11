export interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  country_code: string | null;
  country_name: string | null;
  country_flag: string | null;
  currency: string | null;
  currency_symbol: string | null;
  created_at: string;
  updated_at?: string;
}
