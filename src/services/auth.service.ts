import instance, { refreshInstance } from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IActivation,
  IRegister,
  ILogin,
  IProfile,
  IUpdatePassword,
} from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) =>
    instance.post(`${endpoint.AUTH}/login`, payload, { withCredentials: true }), //withCredentials:true karena perlu simpan refreshToken di cookies
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  updateProfile: (payload: IProfile) =>
    instance.put(`${endpoint.AUTH}/update-profile`, payload),
  updatePassword: (payload: IUpdatePassword) =>
    instance.put(`${endpoint.AUTH}/update-password`, payload),
  refresh: () =>
    refreshInstance.post(
      // pakai refreshInstance karena beda handle yg pakai cookie beda sama instance biasa
      `${endpoint.AUTH}/refresh`,
      {},
      { withCredentials: true }, //withCredentials:true karena ambil refreshToken dari cookies
    ),
};

export default authServices;
