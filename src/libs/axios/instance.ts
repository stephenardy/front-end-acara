import environment from "@/config/environtment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
  accessToken?: string;
}

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

// Add a request interceptor
instance.interceptors.request.use(
  async (request) => {
    const session: CustomSession | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
