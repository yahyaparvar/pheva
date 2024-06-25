import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.sent || initialState,
  emails: (state: RootState) => state.sent?.emails || initialState.emails,
  emailsStatus: (state: RootState) =>
    state.sent?.status || initialState.status,
  nextPageToken: (state: RootState) =>
    state.sent?.nextPageToken || initialState.nextPageToken,
  lastPageTokens: (state: RootState) =>
    state.sent?.lastPageTokens || initialState.lastPageTokens,
};
export const Sentselectors = {
  root: createSelector([domains.root], (state) => state),
  emailsStatus: createSelector([domains.emailsStatus], (state) => state),
  emails: createSelector([domains.emails], (state) => state),
  nextPageToken: createSelector([domains.nextPageToken], (state) => state),
  lastPageTokens: createSelector([domains.lastPageTokens], (state) => state),
};
