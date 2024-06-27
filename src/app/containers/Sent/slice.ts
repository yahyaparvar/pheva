/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { ContainerState } from "./types";

import { Status } from "app/types";
import { Email } from "../Inbox/types";
import { sentSaga } from "./saga";

// The initial state of the Sent container
export const initialState: ContainerState = {
  showAiAnimation: undefined,
  emails: [],
  status: Status.INITIAL,
  nextPageToken: undefined,
  lastPageTokens: [],
};

const sentSlice = createSlice({
  name: "sent",
  initialState,
  reducers: {
    getEmails(state) {},
    setEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload;
    },
    setEmailStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setNextPageToken(state, action: PayloadAction<string>) {
      state.nextPageToken = action.payload;
    },
    appendPrevPageToken(state, action: PayloadAction<string>) {
      state.lastPageTokens.push(action.payload);
    },
    removePrevPageToken(state) {
      state.lastPageTokens.pop();
    },
    nextEmailPage() {},
    previousEmailPage() {},
    fetchEmailSummaries(state) {},
  },
});

export const {
  actions: SentActions,
  reducer: SentReducer,
  name: sliceKey,
} = sentSlice;

export const useSentSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: SentReducer });
  useInjectSaga({ key: sliceKey, saga: sentSaga });
  return { SentActions };
};
