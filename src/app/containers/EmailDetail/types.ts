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
  threadMessages: EmailDetails[];
}
export interface EmailDetailState {
  emailDetail: EmailDetails | undefined;
  replySendStatus: Status;
  status: Status;
  textFromHTML: string;
  md: string;
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
export const extractTextFromHTML = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const textContent = tmp.textContent || tmp.innerText || "";
  return textContent.replace(/\s+/g, " ").trim();
};
export function arrayToString(arr: string[]) {
  return arr.filter(Boolean).join("");
}

export const decodeBase64 = (str: string | undefined): string => {
  if (!str) return "";
  try {
    return decodeURIComponent(
      escape(window.atob(str.replace(/-/g, "+").replace(/_/g, "/")))
    );
  } catch (e) {
    console.error("Failed to decode base64 string:", e);
    return "";
  }
};
export type ContainerState = EmailDetailState;
