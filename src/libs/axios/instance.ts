import { SessionExtended } from "@/types/Auth";
import { getSession, signOut } from "next-auth/react";
import { instance } from "./axios";

// will be called before request is sent
// what it do is basically set the access token to authorization header
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

// will be called before then or catch
instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      // By setting _retry, we prevent an infinite loop if signOut() itself causes a 401.
      originalRequest._retry = true;

      console.error("Axios Interceptor: Caught 401 error. Forcing sign out.");
      // Redirect to login page after signing out
      signOut({ callbackUrl: "/auth/login" });
    }

    return Promise.reject(error);
  },
);

export default instance;
