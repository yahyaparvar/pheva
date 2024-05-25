import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.calendar || initialState,
  selectedDate: (state: RootState) =>
    state.calendar?.selectedDate || initialState.selectedDate,
};
export const Calendarselectors = {
  root: createSelector([domains.root], (state) => state),
  selectedDate: createSelector([domains.selectedDate], (state) => state),
};
