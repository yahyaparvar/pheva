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
  currentView: (state: RootState) =>
    state.calendar?.currentView || initialState.currentView,
  animationKey: (state: RootState) =>
    state.calendar?.animationKey || initialState.animationKey,
};
export const Calendarselectors = {
  root: createSelector([domains.root], (state) => state),
  selectedDate: createSelector([domains.selectedDate], (state) => state),
  eventsList: createSelector([domains.eventsList], (state) => state),
  eventsStatus: createSelector([domains.eventsStatus], (state) => state),
  currentView: createSelector([domains.currentView], (state) => state),
  animationKey: createSelector([domains.animationKey], (state) => state),
};
