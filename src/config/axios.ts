import axios from "axios";

import { supabase } from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseApi = axios.create({
  baseURL: `${supabaseUrl}`,
  headers: {
    apikey: supabaseAnonKey,
    "Content-Type": "application/json",
  },
});

supabaseApi.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    } else {
      config.headers.Authorization = `Bearer ${supabaseAnonKey}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

supabaseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.refreshSession();

        if (session?.access_token) {
          originalRequest.headers.Authorization = `Bearer ${session.access_token}`;

          return supabaseApi(originalRequest);
        }
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      }
    }

    return Promise.reject(error);
  }
);
