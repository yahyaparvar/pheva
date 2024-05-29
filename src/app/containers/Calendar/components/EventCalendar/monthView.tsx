// src/CalendarComponent.tsx

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Options, RRule } from "rrule";
import styled from "styled-components";
import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";
import { EventResponse } from "../../types";

const CalendarWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 10px;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
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

  const parseEvent = (event: EventResponse) => {
    const start = new Date(event?.start?.dateTime || event?.start?.date!);
    const end = new Date(event?.end?.dateTime || event?.end?.date!);
    if (event.recurrence) {
      const rruleString = event.recurrence[0];
      const rruleOptions: Partial<Options> = RRule.parseString(rruleString);
      rruleOptions.dtstart = start;

      return {
        title: event.summary,
        rrule: rruleOptions,
        allDay: event.start.date ? true : false,
      };
    } else {
      return {
        title: event.summary,
        start,
        end,
      };
    }
  };

  const calendarEvents = events.map(parseEvent);

  return (
    <AppContainer>
      <Header>
        <h1>FullCalendar with Repeating Events</h1>
      </Header>
      <CalendarWrapper>
        <FullCalendar
          fixedWeekCount={false}
          dayMaxEvents={3}
          height="auto"
          aspectRatio={1.4}
          plugins={[dayGridPlugin, rrulePlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
        />
      </CalendarWrapper>
    </AppContainer>
  );
};

export default CalendarComponent;
