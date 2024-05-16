/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { inboxSaga } from "./saga";
import { ContainerState, Email } from "./types";

// The initial state of the Inbox container
export const initialState: ContainerState = {
  emails: [],
  loading: false,
  error: null,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    getEmails: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmailsSuccess: (state, action: PayloadAction<Email[]>) => {
      state.emails = action.payload;
      state.loading = false;
    },
    getEmailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  actions: InboxActions,
  reducer: InboxReducer,
  name: sliceKey,
} = inboxSlice;

export const useInboxSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: InboxReducer });
  useInjectSaga({ key: sliceKey, saga: inboxSaga });
  return { InboxActions };
};
