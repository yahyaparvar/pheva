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
  summary: {
    status: Status.INITIAL,
    streamText: [],
  },
  answer: {
    negative: {
      status: Status.INITIAL,
      streamText: [],
    },
    positive: {
      status: Status.INITIAL,
      streamText: [],
    },
  },
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
    markAsRead(state, action: PayloadAction<string>) {},
    getSummary() {},
    setSummary(state, action: PayloadAction<string>) {
      state.summary.streamText = [...state.summary.streamText, action.payload];
    },
    setSummaryStatus(state, action: PayloadAction<Status>) {
      state.summary.status = action.payload;
    },
    clearSummaryResponse(state) {
      state.summary.streamText = [];
      state.summary.status = Status.INITIAL;
    },
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
