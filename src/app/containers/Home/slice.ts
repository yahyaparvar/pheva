/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { ContainerState } from "./types";

import { EventResponse } from "../Calendar/types";
import { homeSaga } from "./saga";

// The initial state of the Home container
export const initialState: ContainerState = {
  unreadEmails: undefined,
  todayEvents: undefined,
  visits: undefined,
  tasks: undefined,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getUnreadEmails() {},
    setUnreadEmailsCount(state, action: PayloadAction<number>) {
      state.unreadEmails = action.payload;
    },
    getEvents() {},
    setEvents(state, action: PayloadAction<EventResponse[]>) {
      state.todayEvents = action.payload;
    },
  },
});

export const {
  actions: homeActions,
  reducer: homeReducer,
  name: sliceKey,
} = homeSlice;

export const usehomeSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: homeReducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });
  return { homeActions };
};
