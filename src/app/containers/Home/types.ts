import { EventResponse } from "../Calendar/types";

/* --- STATE --- */
export interface HomeState {
  unreadEmails: number | undefined;
  todayEvents: EventResponse[] | undefined;
  visits: number | undefined;
  tasks: [] | undefined;
}

export type ContainerState = HomeState;
