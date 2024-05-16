import { Status } from "app/types";

/* --- STATE --- */
export interface Email {
  id: string;
  snippet: string;
  subject: string;
  date: string;
  labels: string[];
}
export interface InboxState {
  emails: Email[];
  status: Status;
}

export type ContainerState = InboxState;
