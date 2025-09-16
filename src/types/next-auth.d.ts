import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Your custom User type from your existing types/Auth.ts file
interface UserExtended {
  _id?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}

// Augment the default JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: UserExtended; // Your user object
  }
}

// Augment the default Session and User types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
    // Add your extended user type to the session
    user?: UserExtended & DefaultSession["user"];
  }

  // You can also extend the default User type if needed
  interface User extends DefaultUser, UserExtended {}
}
