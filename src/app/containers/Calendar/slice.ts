import { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "app/types";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { createSlice } from "store/toolkit";
import { calendarSaga } from "./saga";
import { CalendarViews, ContainerState } from "./types";

// The initial state of the Calendar container
export const initialState: ContainerState = {
  events: { list: [], status: Status.INITIAL },
  selectedDate: new Date(),
  currentView: "dayGridMonth",
  animationKey: 0,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = new Date(action.payload);
      state.animationKey += 1;
    },
    setEvents(state, action: PayloadAction<any[]>) {
      state.events.list = action.payload;
    },
    setEventStatus(state, action: PayloadAction<Status>) {
      state.events.status = action.payload;
    },
    getEvents(state) {},
    moveNext(state) {
      const currentDate = new Date(state.selectedDate);
      switch (state.currentView) {
        case "dayGridMonth":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case "timeGridWeek":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "timeGridDay":
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        default:
          break;
      }
      state.selectedDate = currentDate;
      state.animationKey += 1;
    },
    movePrev(state) {
      const currentDate = new Date(state.selectedDate);
      switch (state.currentView) {
        case "dayGridMonth":
          currentDate.setMonth(currentDate.getMonth() - 1);
          break;
        case "timeGridWeek":
          currentDate.setDate(currentDate.getDate() - 7);
          break;
        case "timeGridDay":
          currentDate.setDate(currentDate.getDate() - 1);
          break;
        default:
          break;
      }
      state.selectedDate = currentDate;
      state.animationKey += 1;
    },
    setView(state, action: PayloadAction<CalendarViews>) {
      state.currentView = action.payload;
      state.animationKey += 1;
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
