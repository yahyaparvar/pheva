import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

const selectDomain = {
  root: (state: RootState) => state.home || initialState,
  unreadEmails: (state: RootState) =>
    state.home?.unreadEmails || initialState.unreadEmails,
  events: (state: RootState) =>
    state.home?.todayEvents || initialState?.todayEvents,
};

export const homeSelectors = {
  root: createSelector([selectDomain.root], (homeState) => homeState),
  unreadEmails: createSelector([selectDomain.unreadEmails], (homeState) => homeState),
  events: createSelector([selectDomain.events], (homeState) => homeState),
};
