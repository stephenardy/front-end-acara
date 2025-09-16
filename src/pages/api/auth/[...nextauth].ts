import environment from "@/config/environtment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILogin, UserExtended } from "@/types/Auth";
import axios from "axios";

const BACKEND_URL = process.env.INTERNAL_API_URL || "http://localhost:3000/api";
const ACCESS_TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 minutes
// const ACCESS_TOKEN_LIFETIME_MS = 15 * 1000; // 15 seconds for testing

export default NextAuth({
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 30 days
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials): Promise<UserExtended | null> {
        try {
          const { identifier, password } = credentials as ILogin;

          const loginRes = await axios.post(`${BACKEND_URL}/auth/login`, {
            identifier,
            password,
          });

          const { accessToken, refreshToken } = loginRes.data.data;

          const me = await axios.get(`${BACKEND_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const user = me.data.data;

          if (user) {
            // Attach tokens to the user object to be passed to the jwt callback
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            return user;
          }

          return null;
        } catch (error: any) {
          console.error(
            "NextAuth authorize: Error during login:",
            error.response?.data || error.message,
          );
          return null;
        }
      },
    }),
  ],

  // callbacks -> what happens when someone logs in or when session is checked
  callbacks: {
    // Runs whenever a JWT is issued or updated (initial sign-in, subsequent requests, session checks)
    async jwt({ token, user }) {
      // 1. Initial sign-in: The `user` object is passed from the `authorize` callback.
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_LIFETIME_MS;
        token.user = user;
        return token;
      }

      // 2. Subsequent requests: The `user` object is not available.
      // If the access token is still valid, return the existing token.
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // 3. Access token has expired. Attempt to refresh it using the refresh token.
      if (!token.refreshToken) {
        return { ...token, error: "RefreshAccessTokenError" };
      }

      try {
        const response = await axios.post(`${BACKEND_URL}/auth/refresh`, {
          token: token.refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;

        if (!newAccessToken)
          throw new Error("No new access token from backend");

        token.accessToken = newAccessToken;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_LIFETIME_MS;
        token.refreshToken = newRefreshToken ?? token.refreshToken;
        token.error = undefined;

        return token;
      } catch (error) {
        console.error("NextAuth: Error refreshing access token.", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    // Runs whenever getSession()/useSession() is called
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },
});
