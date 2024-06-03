import { Status } from "app/types";

/* --- STATE --- */
export interface CalendarState {
  selectedDate: Date;
  events: {
    list: EventResponse[];
    status: Status;
  };
}
export interface EventResponse {
  kind: string; // "calendar#event"
  etag: string;
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: string; // date-time
  updated: string; // date-time
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator: {
    id?: string;
    email: string;
    displayName?: string;
    self?: boolean;
  };
  organizer: {
    id?: string;
    email: string;
    displayName?: string;
    self?: boolean;
  };
  start: {
    date?: string; // date
    dateTime?: string; // date-time
    timeZone?: string;
  };
  end: {
    date?: string; // date
    dateTime?: string; // date-time
    timeZone?: string;
  };
  endTimeUnspecified?: boolean;
  recurrence?: string[];
  recurringEventId?: string;
  originalStartTime?: {
    date?: string; // date
    dateTime?: string; // date-time
    timeZone?: string;
  };
  transparency?: "opaque" | "transparent";
  visibility?: "default" | "public" | "private" | "confidential";
  iCalUID: string;
  sequence: number;
  attendees?: {
    id?: string;
    email: string;
    displayName?: string;
    organizer?: boolean;
    self?: boolean;
    resource?: boolean;
    optional?: boolean;
    responseStatus: "needsAction" | "declined" | "tentative" | "accepted";
    comment?: string;
    additionalGuests?: number;
  }[];
  attendeesOmitted?: boolean;
  extendedProperties?: {
    private?: { [key: string]: string };
    shared?: { [key: string]: string };
  };
  hangoutLink?: string;
  conferenceData?: {
    createRequest?: {
      requestId: string;
      conferenceSolutionKey?: {
        type: string;
      };
      status?: {
        statusCode: string;
      };
    };
    entryPoints?: {
      entryPointType: string;
      uri: string;
      label?: string;
      pin?: string;
      accessCode?: string;
      meetingCode?: string;
      passcode?: string;
      password?: string;
    }[];
    conferenceSolution?: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId?: string;
    signature?: string;
    notes?: string;
  };
  gadget?: {
    type: string;
    title: string;
    link: string;
    iconLink: string;
    width: number;
    height: number;
    display: string;
    preferences: { [key: string]: string };
  };
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked?: boolean;
  reminders?: {
    useDefault: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };
  source?: {
    url: string;
    title: string;
  };
  attachments?: {
    fileUrl: string;
    title: string;
    mimeType?: string;
    iconLink?: string;
    fileId?: string;
  }[];
  eventType?: "default" | "outOfOffice" | "focusTime" | "workingLocation";
}
export const GoogleColorMap: { [key: string]: string } = {
  "1": "#7986CB", // Lavender
  "2": "#33B679", // Sage
  "3": "#8E24AA", // Grape
  "4": "#E67C73", // Flamingo
  "5": "#F6BF26", // Banana
  "6": "#F4511E", // Tangerine
  "7": "#039BE5", // Peacock
  "8": "#616161", // Graphite
  "9": "#3F51B5", // Blueberry
  "10": "#0B8043", // Basil
  "11": "#D50000", // Tomato
};
export type ContainerState = CalendarState;
