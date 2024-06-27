import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.spam || initialState,
  emails: (state: RootState) => state.spam?.emails || initialState.emails,
  emailsStatus: (state: RootState) =>
    state.spam?.status || initialState.status,
  nextPageToken: (state: RootState) =>
    state.spam?.nextPageToken || initialState.nextPageToken,
  lastPageTokens: (state: RootState) =>
    state.spam?.lastPageTokens || initialState.lastPageTokens,
};
export const Spamselectors = {
  root: createSelector([domains.root], (state) => state),
  emailsStatus: createSelector([domains.emailsStatus], (state) => state),
  emails: createSelector([domains.emails], (state) => state),
  nextPageToken: createSelector([domains.nextPageToken], (state) => state),
  lastPageTokens: createSelector([domains.lastPageTokens], (state) => state),
};
