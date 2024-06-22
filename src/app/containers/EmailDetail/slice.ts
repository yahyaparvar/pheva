/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { ContainerState, EmailDetails, extractTextFromHTML } from "./types";

import { Status } from "app/types";
import { emailDetailSaga } from "./saga";

// The initial state of the EmailDetail container
export const initialState: ContainerState = {
  emailDetail: undefined,
  status: Status.INITIAL,
  md: "",
  textFromHTML: "",
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
    getNegativeAnswer(state) {},
    setNegativeAnswer(state, action: PayloadAction<string>) {
      state.answer.negative.streamText = [
        ...state.answer.negative.streamText,
        action.payload,
      ];
    },
    setNegativeAnswerStatus(state, action: PayloadAction<Status>) {
      state.answer.negative.status = action.payload;
    },
    clearNegativeAnswerResponse(state) {
      state.answer.negative.streamText = [];
      state.answer.negative.status = Status.INITIAL;
    },
    getPositiveAnswer(state) {},
    setPositiveAnswer(state, action: PayloadAction<string>) {
      state.answer.positive.streamText = [
        ...state.answer.positive.streamText,
        action.payload,
      ];
    },
    setPositiveAnswerStatus(state, action: PayloadAction<Status>) {
      state.answer.positive.status = action.payload;
    },
    clearPositiveAnswerResponse(state) {
      state.answer.positive.streamText = [];
      state.answer.positive.status = Status.INITIAL;
    },
    setTextFromHTML(state, action: PayloadAction<string>) {
      state.textFromHTML = extractTextFromHTML(action.payload);
    },
    setEmailMd(state, action: PayloadAction<string>) {
      state.md = action.payload;
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
