/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { ContainerState, EmailDetails } from "./types";

import { Status } from "app/types";
import { emailDetailSaga } from "./saga";

// The initial state of the EmailDetail container
export const initialState: ContainerState = {
  emailDetail: undefined,
  status: Status.INITIAL,
};

const emailDetailSlice = createSlice({
  name: "emailDetail",
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    getEmailData(state, action: PayloadAction<string>) {},
    setEmailData(state, action: PayloadAction<EmailDetails>) {
      state.emailDetail = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    markAsRead(state,action:PayloadAction<string>){
      
    }
  },
});

export const {
  actions: emailDetailActions,
  reducer: emailDetailReducer,
  name: sliceKey,
} = emailDetailSlice;

export const useemailDetailSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
  useInjectSaga({ key: sliceKey, saga: emailDetailSaga });
  return { emailDetailActions };
};
