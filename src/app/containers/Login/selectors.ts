import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.login || initialState,
  work: (state: RootState) => state.login?.work || initialState.work,
  name: (state: RootState) => state.login?.name || initialState.name,
  from: (state: RootState) => state.login?.work || initialState.work,
  step: (state: RootState) => state.login?.step || initialState.step,
};
export const Loginselectors = {
  root: createSelector([domains.root], (state) => state),
  work: createSelector([domains.work], (state) => state),
  name: createSelector([domains.name], (state) => state),
  from: createSelector([domains.from], (state) => state),
  step: createSelector([domains.step], (state) => state),
};
