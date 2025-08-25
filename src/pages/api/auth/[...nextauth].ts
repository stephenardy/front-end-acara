import environment from "@/config/environtment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  ILogin,
  JWTExended,
  SessionExtended,
  UserExtended,
} from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 hari
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
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { identifier, password } = credentials as ILogin;

        const result = await authServices.login({
          identifier,
          password,
        });

        const { accessToken } = result.data.data;

        const me = await authServices.getProfileWithToken(accessToken);
        const user = me.data.data;

        if (accessToken && user._id) {
          user.accessToken = accessToken;
          // user.refreshToken = refreshToken;
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      // session.refreshToken = token.user?.refreshToken;
      return session;
    },
  },
});
