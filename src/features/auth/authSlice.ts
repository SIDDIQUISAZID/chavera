/* istanbul ignore file */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UserInfo } from "./authAPI";
import { parseJSON } from "../../utils";
export const userRoleId = 14;
export type RoleIdType = typeof userRoleId;
export type OnboardType = {
  biography: string;

  email: string;
  experience: string;
  phone: string;
  profile: string;
  selfie: string;
  specialist: string;
  username: string;
  zipcode: string;
  isphysician?: boolean;
};


export type SaveEmailOrPassword = {
  email: string;
  password: string;
 
};
type AuthState = {
  user: UserInfo | null; //for user data
  email: string;
  token: string;
  roleid: RoleIdType; //for physician

  onboard: OnboardType | null; // for onboard screen
  emailPassword: SaveEmailOrPassword | null; // for onboard screen
};
export const LOCALAUTH = {
  USER: "USER", // Localstorage key to save user data
  ISAUTH: "ISAUTH", // Localstorage key to check user is authentication or not
  EMAIL_PASSWORD: "EMAIL_PASSWORD", // Localstorage key to check user is authentication or not
} as const;

//get user data from localstorage
export const getUserFromLocal: () => UserInfo | null = () => {
  return parseJSON(localStorage.getItem(LOCALAUTH.USER)) || null;
};

//get user data from localstorage
export const getEmailPassword: () => SaveEmailOrPassword | null = () => {
  return parseJSON(localStorage.getItem(LOCALAUTH.EMAIL_PASSWORD)) || null;
};

//get token from localstorage
export const getTokenFromLocal = () => {
  return localStorage.getItem(LOCALAUTH.ISAUTH) || "";
};
const user = getUserFromLocal();
// parseJSON(localStorage.getItem(LOCALAUTH.USER)) || null;
const token = getTokenFromLocal();
const emailPassword = getEmailPassword();


//localStorage.getItem(LOCALAUTH.ISAUTH) || "";
// console.log({ token }, "reducer");

export const initialState = {
  user,
  email: "",
  token,
  roleid: userRoleId,
  onboard: null,
  emailPassword
} as AuthState;
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //for saving user data and auth in redux and localstorage after auth success
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: UserInfo | null; token: string | null }>
    ) => {
      if (user && token) {
        localStorage.setItem(LOCALAUTH.USER, JSON.stringify(user));
        localStorage.setItem(LOCALAUTH.ISAUTH, token);
      } else {
        localStorage.removeItem(LOCALAUTH.USER);
        localStorage.removeItem(LOCALAUTH.ISAUTH);
      }
      state.user = user;
      state.token = token || "";
    },
    //for removing user data and auth check from redux and localstorage
    logoutAction: (state) => {
      localStorage.removeItem(LOCALAUTH.USER);
      localStorage.removeItem(LOCALAUTH.ISAUTH);
      state.user = null;
      state.token = "";
    },
    //for saving user email in redux store
    setEmail: (
      state,
      { payload: { email } }: PayloadAction<{ email: string }>
    ) => {
      state.email = email;
    },

    //responsible for onboard popup screen
    setOnboard: (state, { payload }: PayloadAction<OnboardType>) => {
      state.onboard = payload;
    },

    ///Save email id and password for pre-fill
    // setEmailPassword: (state, { payload }: PayloadAction<SaveEmailOrPassword>) => {
    //   state.emailPassword = payload;
    // },



    setEmailPassword: (
      state,
      {
        payload: { emailPassword },
      }: PayloadAction<{ emailPassword: SaveEmailOrPassword|null  }>
    ) => {

     
      if (emailPassword) {
        localStorage.setItem(LOCALAUTH.EMAIL_PASSWORD, JSON.stringify(emailPassword));
        
      }
      state.emailPassword = emailPassword;
     
    },
  },
});

export const { setCredentials, setEmail, logoutAction, setOnboard,setEmailPassword } =
  slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentEmail = (state: RootState) => state.auth.email;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectRoleId = (state: RootState): RoleIdType => state.auth.roleid;

export const shouldOnboard = (state: RootState) => state.auth.onboard;
export const selectEmailPassword = (state: RootState) => state.auth.emailPassword;
