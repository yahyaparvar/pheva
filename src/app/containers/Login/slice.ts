/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { ContainerState } from "./types";

import { LocalStorageKeys, storage } from "store/storage";
import { loginSaga } from "./saga";

// The initial state of the Login container
export const initialState: ContainerState = {
  work: "",
  name: "",
  from: "",
  step: 1,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setWork(state, action: PayloadAction<string>) {
      state.work = action.payload;
    },
    setFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      state.step -= 1;
    },
    clearLoginData(state) {
      state.step = 0;
      state.from = "";
      state.name = "";
      state.work = "";
    },
    saveLoginData(state) {
      const data = {
        from: state.from,
        loginName: state.name,
        job: state.work,
      };
      storage.write(LocalStorageKeys.LOGIN_INFO, data);
    },
  },
});

export const {
  actions: LoginActions,
  reducer: LoginReducer,
  name: sliceKey,
} = loginSlice;

export const useLoginSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: LoginReducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });
  return { LoginActions };
};
