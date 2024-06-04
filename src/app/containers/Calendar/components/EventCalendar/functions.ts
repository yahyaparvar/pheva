import { RRule } from "rrule";
import { EventResponse, GoogleColorMap } from "../../types";

const calculateDuration = (start: string, end: string): string => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = Math.floor(durationMs / 3600000);
  const durationMinutes = Math.floor((durationMs % 3600000) / 60000);
  return `${durationHours}:${durationMinutes.toString().padStart(2, "0")}`;
};

const isMidnightToMidnight = (start: string, end: string): boolean => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  return (
    startTime.getHours() === 0 &&
    startTime.getMinutes() === 0 &&
    startTime.getSeconds() === 0 &&
    endTime.getHours() === 0 &&
    endTime.getMinutes() === 0 &&
    endTime.getSeconds() === 0 &&
    endTime.getDate() === startTime.getDate() + 1
  );
};

export const parseEvents = (event: EventResponse) => {
  const start = event?.start?.dateTime || event?.start?.date!;
  const end = event?.end?.dateTime || event?.end?.date!;
  const recurrenceRule = event.recurrence
    ? new RRule({
        ...RRule.parseString(event.recurrence[0]),
        dtstart: new Date(start),
      }).toString()
    : null;
  const isAllDay =
    event?.start?.date !== undefined || isMidnightToMidnight(start, end);

  return {
    id: event.id,
    title: event.summary || "(No Title)",
    start: start,
    end: end,
    rrule: recurrenceRule,
    backgroundColor: GoogleColorMap[event.colorId!],
    allDay: isAllDay,
    duration: calculateDuration(
      event?.start?.dateTime || event?.start?.date!,
      event?.end?.dateTime || event?.end?.date!
    ),
  };
};
