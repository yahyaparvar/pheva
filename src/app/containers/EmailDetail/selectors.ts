import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.emailDetail || initialState,
  emailDetail: (state: RootState) =>
    state.emailDetail?.emailDetail || initialState.emailDetail,
  status: (state: RootState) =>
    state.emailDetail?.status || initialState.status,
};
export const EmailDetailselectors = {
  root: createSelector([domains.root], (state) => state),
  emailDetail: createSelector([domains.emailDetail], (state) => state),
  status: createSelector([domains.status], (state) => state),
};
