/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import history from "app/router/history";
import { AppPages, Themes } from "app/types";
import { parseJwt } from "config/parseJwt";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "./redux-injectors";
import { globalSaga } from "./saga";
import { LocalStorageKeys, storage } from "./storage";
interface GoogleAuthResponse {
  access_token: string;
  at_hash: string;
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  expires_in: number;
  family_name: string;
  given_name: string;
  iat: number;
  id_token: string;
  iss: string;
  name: string;
  picture: string;
  refresh_token: string;
  scope: string;
  sub: string;
  token_type: string;
}
export interface GlobalState {
  loggedIn: boolean;
  theme: string;
  userInfo: GoogleAuthResponse;
}
const isUserLoggedIn = () => {
  const token = storage.read(LocalStorageKeys.USER_INFO);
  if (token) {
    return true;
  } else {
    return false;
  }
};
// The initial state of the LoginPage container
export const initialState: GlobalState = {
  loggedIn: isUserLoggedIn(),
  userInfo: storage.read(LocalStorageKeys.USER_INFO),
  theme: storage.read(LocalStorageKeys.THEME) || Themes.LIGHT,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {},
    setLoggedIn(state, action: PayloadAction<any>) {
      state.loggedIn = true;
      storage.write(LocalStorageKeys.USER_INFO, {
        ...parseJwt(action.payload.id_token),
        ...action.payload,
      });
      state.userInfo = storage.read(LocalStorageKeys.USER_INFO);
    },
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
    logOut() {
      storage.clear();
      history.replace(AppPages.Login);
    },
    getAndSetTheme() {},
  },
});

export const {
  actions: globalActions,
  reducer: globalReducer,
  name: sliceKey,
} = globalSlice;
export const useglobalSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: globalReducer });
  useInjectSaga({ key: sliceKey, saga: globalSaga });
  return { globalActions };
};
