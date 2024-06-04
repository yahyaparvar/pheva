import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import styled from "styled-components";
import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";
import { EventResponse, GoogleColorMap } from "../../types";

const CalendarWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 10px;
`;

const AppContainer = styled.div`
  text-align: center;
`;

const CalendarComponent: React.FC = () => {
  const events = useSelector(Calendarselectors.eventsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarActions.getEvents());
  }, [dispatch]);

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

  const parseEvent = (event: EventResponse) => {
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

  const calendarEvents = events.map(parseEvent);

  return (
    <AppContainer>
      <CalendarWrapper>
        <FullCalendar
          fixedWeekCount={false}
          dayMaxEvents={3}
          height="auto"
          aspectRatio={1.4}
          editable
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            rrulePlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "today prev,next",
            center: "title",
            right: "dayGridMonth,timeGridDay",
          }}
          //@ts-ignore
          events={calendarEvents}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
        />
      </CalendarWrapper>
    </AppContainer>
  );
};

export default CalendarComponent;
