import { dishNetworkApi, endpoints } from "../../app/services";

import { OnboardType, RoleIdType, userRoleId } from "./authSlice";
export interface User {
  userInfo: UserInfo;
  nextPage?: string;
  // email?: string;
  // token: string;
  // userType?:string;
}

export interface UserInfo {
  token: string;
  user_id: number;
  roleId: number;
  userType: string;
  // Include properties that you actually use or expect to use
  userName?: string; // Optional
  email?: string; // Optional
  roleName?: string; // Optional
  //nextPage?: string;  // Optional, as it's part of the response

  userId: number;

  status: string | null;
  lastLogin: string | null;
  features: any[];
}

export interface ApiStandardResponse {
  status: number;
  message: string;
  success: boolean;
  data: any;
}

interface GetAuthResponse extends ApiStandardResponse {
  data: User;
}

export interface LogoutRequest {
  email: string;
  token: string;
}
export interface LogoutResponse {
  status: number;
  message: string;
}
export interface TokenStatusRequest {
  email: string;
  roleid: RoleIdType;
}

export interface ForgotPasswordRequest {
  email: string;
}
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}
export interface VerifyOtpResponse extends ApiStandardResponse {
  data: User;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}
export type ProfileImagePayload = {
  profileImgData: string;
};

export type FcmTokenPayload = {
  fcmToken: string;
};

export interface TokenStatusResponse extends ApiStandardResponse {
  user: OnboardType;
  estore: {
    cartridgestock: number;
    threshold: number;
  };
}

export interface AuthReq {
  email: string;
  password: string;
}

export const authApi = dishNetworkApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<GetAuthResponse | undefined, AuthReq>({
      query: (credentials) => ({
        url: endpoints.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),

    forgetPassword: builder.mutation<ApiStandardResponse | undefined, AuthReq>({
      query: (credentials) => ({
        url: endpoints.FORGET_PASSWORD,
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<LogoutResponse | undefined, LogoutRequest>({
      query: (credentials) => ({
        url: endpoints.LOGOUT,
        method: "POST",
        body: { ...credentials, roleid: userRoleId },
      }),
    }),
    tokenStatus: builder.mutation<TokenStatusResponse, TokenStatusRequest>({
      query: (credentials) => ({
        url: endpoints.TOKEN_STATUS,
        method: "POST",
        body: credentials,
      }),
      providesTags: ["TokenStatus"] as any,
    }),

    resetPassword: builder.mutation<ApiStandardResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: endpoints.RESET_PASSWORD,
        method: "POST",
        body: credentials,
      }),
    }),

    verifyOtp: builder.mutation<ApiStandardResponse, VerifyOtpRequest>({
      query: (credentials) => ({
        url: endpoints.VERIFY_OTP,
        method: "POST",
        body: credentials,
      }),
    }),
    updateFCM: builder.mutation<
      ApiStandardResponse | undefined,
      ProfileImagePayload
    >({
      query: (body) => ({
        url: `${endpoints.UPDATE_FCM}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["UserProfile"],
    }),

    updateProfileImage: builder.mutation<
      ApiStandardResponse | undefined,
      ProfileImagePayload
    >({
      query: (body) => ({
        url: `${endpoints.UPDATE_PROFILE_IMAGE}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["UserProfile"],
    }),

    getProfile: builder.mutation<
      ApiStandardResponse | undefined,
      { profileImgData: string }
    >({
      query: (body) => ({
        url: `${endpoints.GET_PROFILE}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useTokenStatusMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useGetProfileMutation,
  useUpdateFCMMutation,
  useUpdateProfileImageMutation,
} = authApi;
