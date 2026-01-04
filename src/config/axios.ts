import axios from "axios";

import { supabase } from "./supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseApi = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  },
});

supabaseApi.interceptors.request.use(async (config) => {
  // Get current session token if available
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

// Storage API instance
export const storageApi = axios.create({
  baseURL: `${SUPABASE_URL}/storage/v1`,
  // headers: {
  //   apikey: SUPABASE_ANON_KEY,
  //   Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  // },
});

storageApi.interceptors.request.use(async (config) => {
  // Get current session token if available
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  config.headers["Content-Type"] = "multipart/form-data";

  return config;
});
