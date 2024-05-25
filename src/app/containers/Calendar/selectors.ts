import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.calendar || initialState,
  selectedDate: (state: RootState) =>
    state.calendar?.selectedDate || initialState.selectedDate,
  eventsList: (state: RootState) =>
    state.calendar?.events.list || initialState.events.list,
  eventsStatus: (state: RootState) =>
    state.calendar?.events.status || initialState.events.status,
};
export const Calendarselectors = {
  root: createSelector([domains.root], (state) => state),
  selectedDate: createSelector([domains.selectedDate], (state) => state),
  eventsList: createSelector([domains.eventsList], (state) => state),
  eventsStatus: createSelector([domains.eventsStatus], (state) => state),
};
