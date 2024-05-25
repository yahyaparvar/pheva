import { Status } from "app/types";

/* --- STATE --- */
export interface CalendarState {
  selectedDate: Date;
  events: {
    list: any[];
    status: Status;
  };
}

export type ContainerState = CalendarState;
