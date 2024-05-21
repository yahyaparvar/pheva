import { Status } from "app/types";

/* --- STATE --- */
export interface Email {
  id: string;
  sender: string;
  snippet: string;
  subject: string;
  date: string;
  labels: string[];
}
export interface EmailSummary {
  id: string;
  summary: string;
}
export interface InboxState {
  emails: Email[];
  status: Status;
  nextPageToken: undefined | string;
  lastPageTokens: string[];
  summaries: {
    status: Status;
    emails: EmailSummary[];
  };
}
export interface EmailResponse {
  emails: Email[];
  nextPageToken: string;
}
export type ContainerState = InboxState;

export function customDateFormat(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isThisYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    return `${formattedHours}:${minutes} ${ampm}`;
  } else if (isThisYear) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } else {
    const month = (date.getMonth() + 1).toString().padStart(1, "0");
    const day = date.getDate().toString().padStart(1, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
