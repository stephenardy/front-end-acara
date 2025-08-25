import environment from "@/config/environtment";
import authServices from "@/services/auth.service";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

// for /refresh endpoint, since refreshToken stored in cookies
const refreshInstance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
  withCredentials: true, // include cookies on requests
});

// for public
const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

// --- Request Interceptors for main instance ---
instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();

    if (!request.headers.Authorization && session?.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh endpoint (cookie will be attached automatically)
        const { data } = await authServices.refresh();
        // Save new accessToken into your NextAuth session OR memory
        const newAccessToken = data.data.accessToken;

        // Update header for next request
        instance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest); // retry original request
      } catch (err) {
        signOut(); // Refresh failed → log out
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
export { refreshInstance };
