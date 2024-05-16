/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "app/types";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { inboxSaga } from "./saga";
import { ContainerState, Email } from "./types";

// The initial state of the Inbox container
export const initialState: ContainerState = {
  emails: [],
  status: Status.INITIAL,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    getEmails(state) {},
    setEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload;
    },
    setEmailStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
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
