import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
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
    const hasTimeComponent = (dateTimeString: string | undefined): boolean => {
      if (!dateTimeString) return false;
      const date = new Date(dateTimeString);
      return (
        date.getHours() !== 0 ||
        date.getMinutes() !== 0 ||
        date.getSeconds() !== 0
      );
    };

    const isAllDayEvent =
      event?.start?.date || !hasTimeComponent(event?.start?.dateTime);
    const start = new Date(event?.start?.dateTime || event?.start?.date!);
    const end = new Date(event?.end?.dateTime || event?.end?.date!);
    const allDay = isAllDayEvent;

    if (event.recurrence) {
      const rruleString = event.recurrence[0];
      const rruleOptions: Partial<Options> = RRule.parseString(rruleString);
      rruleOptions.dtstart = start;

      return {
        title: event.summary,
        rrule: rruleOptions,
        allDay: Boolean(allDay),
      };
    } else {
      return {
        title: event.summary,
        start,
        end,
        allDay: Boolean(allDay),
      };
    }
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
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            rrulePlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridDay",
          }}
          events={calendarEvents}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
        />
      </CalendarWrapper>
    </AppContainer>
  );
};

export default CalendarComponent;
