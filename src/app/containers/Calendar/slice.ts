/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { ContainerState } from "./types";

import { calendarSaga } from "./saga";

// The initial state of the Calendar container
export const initialState: ContainerState = {
  events: [],
  selectedDate: new Date(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    setDate(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  actions: calendarActions,
  reducer: calendarReducer,
  name: sliceKey,
} = calendarSlice;

export const useCalendarSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: calendarReducer });
  useInjectSaga({ key: sliceKey, saga: calendarSaga });
  return { calendarActions };
};
