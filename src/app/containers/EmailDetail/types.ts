import { Status } from "app/types";

/* --- STATE --- */
export interface EmailHeader {
  name: string;
  value: string;
}

interface EmailBody {
  size: number;
  data?: string;
}

export interface EmailPart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: EmailHeader[];
  body: EmailBody;
}

interface EmailPayload {
  partId: string;
  mimeType: string;
  filename: string;
  headers: EmailHeader[];
  body: EmailBody;
  parts: EmailPart[];
}

export interface EmailDetails {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: EmailPayload;
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}
export interface EmailDetailState {
  emailDetail: EmailDetails | undefined;
  status: Status;
}

export type ContainerState = EmailDetailState;
