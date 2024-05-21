import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.inbox || initialState,
  emails: (state: RootState) => state.inbox?.emails || initialState.emails,
  emailsStatus: (state: RootState) =>
    state.inbox?.status || initialState.status,
  nextPageToken: (state: RootState) =>
    state.inbox?.nextPageToken || initialState.nextPageToken,
  lastPageTokens: (state: RootState) =>
    state.inbox?.lastPageTokens || initialState.lastPageTokens,
  emailsSummaries: (state: RootState) =>
    state.inbox?.summaries.emails || initialState?.summaries.emails,
  emailsSummariesStatus: (state: RootState) =>
    state.inbox?.summaries.status || initialState?.summaries.status,
};
export const Inboxselectors = {
  root: createSelector([domains.root], (state) => state),
  emailsStatus: createSelector([domains.emailsStatus], (state) => state),
  emails: createSelector([domains.emails], (state) => state),
  nextPageToken: createSelector([domains.nextPageToken], (state) => state),
  lastPageTokens: createSelector([domains.lastPageTokens], (state) => state),
  emailsSummaries: createSelector([domains.emailsSummaries], (state) => state),
  emailsSummariesStatus: createSelector(
    [domains.emailsSummariesStatus],
    (state) => state
  ),
};
