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
export interface InboxState {
  emails: Email[];
  status: Status;
  nextPageToken: undefined | string;
  lastPageTokens: string[];
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
  const isThisMonthAndYear =
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const isLastYear = date.getFullYear() === now.getFullYear() - 1;

  let options: Intl.DateTimeFormatOptions;

  if (isToday) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    return `${formattedHours}:${minutes} ${ampm}`;
  } else if (isThisMonthAndYear) {
    options = { month: "long", day: "numeric" };
  } else if (isLastYear) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  } else {
    options = { month: "long", day: "numeric", year: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
