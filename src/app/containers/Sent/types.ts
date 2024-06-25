import { Status } from "app/types";
import { Email } from "../Inbox/types";

/* --- STATE --- */
export interface SentState {
  showAiAnimation: boolean | undefined;
  emails: Email[];
  status: Status;
  nextPageToken: undefined | string;
  lastPageTokens: string[];
}

export type ContainerState = SentState;
