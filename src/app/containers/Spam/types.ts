import { Status } from "app/types";
import { Email } from "../Inbox/types";

/* --- STATE --- */
export interface SpamState {
  showAiAnimation: boolean | undefined;
  emails: Email[];
  status: Status;
  nextPageToken: undefined | string;
  lastPageTokens: string[];
}

export type ContainerState = SpamState;