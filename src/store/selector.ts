import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

const selectDomains = {
  root: (state: RootState) => state.global || initialState,
  theme: (state: RootState) => state.global?.theme || initialState.theme,
  isLoggedIn: (state: RootState) =>
    state.global?.loggedIn || initialState.loggedIn,
};

export const globalSelectors = {
  root: createSelector([selectDomains.root], (root) => root),
  theme: createSelector([selectDomains.theme], (state) => state),
  isLoggedIn: createSelector([selectDomains.isLoggedIn], (state) => state),
};
