import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
  refreshToken?: string;
}

interface IProfile {
  _id?: string;
  email?: string;
  fullName?: string;
  isAcctive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
  username?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export type {
  IRegister,
  IActivation,
  UserExtended,
  SessionExtended,
  ILogin,
  IProfile,
  IUpdatePassword,
};
