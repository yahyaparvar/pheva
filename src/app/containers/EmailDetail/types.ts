import { Status } from "app/types";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from "date-fns";

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
  summary: {
    status: Status;
    streamText: string[];
  };
  answer: {
    negative: {
      status: Status;
      streamText: string[];
    };
    positive: {
      status: Status;
      streamText: string[];
    };
  };
}
export function timeDifference(givenDate: string) {
  const now = new Date();

  const years = differenceInYears(now, givenDate);
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

  const months = differenceInMonths(now, givenDate);
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  const days = differenceInDays(now, givenDate);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  const hours = differenceInHours(now, givenDate);
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const minutes = differenceInMinutes(now, givenDate);
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const seconds = differenceInSeconds(now, givenDate);
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;

  return "just now";
}
export type ContainerState = EmailDetailState;
