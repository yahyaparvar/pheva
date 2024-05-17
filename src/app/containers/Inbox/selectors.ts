import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.inbox || initialState,
  emails: (state: RootState) => state.inbox?.emails,
  emailsStatus: (state: RootState) => state.inbox?.status,
};
export const Inboxselectors = {
  root: createSelector([domains.root], (state) => state),
  emailsStatus: createSelector([domains.emailsStatus], (state) => state),
  emails: createSelector([domains.emails], (state) => state),
};
