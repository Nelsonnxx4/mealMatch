import axios from "axios";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseApi = axios.create({
  baseURL: `${supabaseUrl}`,
  headers: {
    apikey: supabaseAnonKey,
    "Content-Type": "application/json",
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});

// Request interceptor to add token to requests
supabaseApi.interceptors.request.use(
  async (config) => {
    // Get session from storage or context
    const token = localStorage.getItem("supabase.auth.token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
supabaseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem("supabase.auth.refreshToken");

        if (refreshToken) {
          const { data } = await axios.post(
            `${supabaseUrl}/auth/v1/token?grant_type=refresh_token`,
            { refresh_token: refreshToken },
            {
              headers: {
                apikey: supabaseAnonKey,
                "Content-Type": "application/json",
              },
            }
          );

          // Update tokens in storage
          localStorage.setItem("supabase.auth.token", data.access_token);
          localStorage.setItem(
            "supabase.auth.refreshToken",
            data.refresh_token
          );

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

          return supabaseApi(originalRequest);
        }
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);
