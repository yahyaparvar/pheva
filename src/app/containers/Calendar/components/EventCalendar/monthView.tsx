import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const APIEvents = useSelector(Calendarselectors.eventsList);
  const events: EventResponse[] = [
    {
      kind: "calendar#event",
      etag: '"3344552064018000"',
      id: "54pmjbe268o5bhpat11eveopa0",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NTRwbWpiZTI2OG81YmhwYXQxMWV2ZW9wYTBfMjAyMjEyMjRUMjAzMDAwWiB5YWh5YXBhcnZhcjFAbQ",
      created: "2022-12-29T01:06:36.000Z",
      updated: "2022-12-29T01:07:12.009Z",
      summary: "Free as a Bird 🦅 ",
      colorId: "9",
      creator: {
        email: "yahyaparvar1@gmail.com",
        self: true,
      },
      organizer: {
        email: "yahyaparvar1@gmail.com",
        self: true,
      },
      start: {
        date: "2022-12-25",
        timeZone: "Asia/Tehran",
      },
      end: {
        date: "2022-12-26",
        timeZone: "Asia/Tehran",
      },
      recurrence: ["RRULE:FREQ=WEEKLY;WKST=SU;BYDAY=SU"],
      iCalUID: "54pmjbe268o5bhpat11eveopa0@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3387711619126000"',
      id: "5eesi5t28jpi7vhfqhn9inei94",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NWVlc2k1dDI4anBpN3ZoZnFobjlpbmVpOTRfMjAyMjEyMjlUMjIwMDAwWiB5YWh5YXBhcnZhcjFAbQ",
      created: "2022-12-29T01:03:05.000Z",
      updated: "2024-05-11T13:55:58.781Z",
      summary: "Read",
      colorId: "5",
      creator: {
        email: "yahyaparvar1@gmail.com",
        self: true,
      },
      organizer: {
        email: "yahyaparvar1@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-12-30T01:30:00+03:30",
        timeZone: "Asia/Tehran",
      },
      end: {
        dateTime: "2022-12-30T02:00:00+03:30",
        timeZone: "Asia/Tehran",
      },
      recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=FR,MO,TH,TU,WE"],
      iCalUID: "5eesi5t28jpi7vhfqhn9inei94@google.com",
      sequence: 1,
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "popup",
            minutes: 30,
          },
        ],
      },
      eventType: "default",
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarActions.getEvents());
  }, [dispatch]);

  const parseEvent = (event: EventResponse) => {
    const recurrenceRule = event.recurrence ? event.recurrence[0] : null;
    const isAllDay = event?.start?.date !== undefined;
    const start = new Date(event?.start?.dateTime || event?.start?.date!);
    const end = new Date(event?.end?.dateTime || event?.end?.date!);

    let durationText = "All day";
    if (!isAllDay) {
      const durationMillis = end.getTime() - start.getTime();
      const durationMinutes = Math.floor((durationMillis / (1000 * 60)) % 60);
      const durationHours = Math.floor(
        (durationMillis / (1000 * 60 * 60)) % 24
      );
      const durationDays = Math.floor(durationMillis / (1000 * 60 * 60 * 24));

      durationText = `${durationMinutes} minutes`;
      if (durationHours > 0)
        durationText = `${durationHours} hours ${durationText}`;
      if (durationDays > 0)
        durationText = `${durationDays} days ${durationText}`;
    }

    return {
      id: event.id,
      title: `${event.summary} (${durationText})`,
      start,
      end,
      allDay: isAllDay,
      rrule: recurrenceRule,
      backgroundColor: event.colorId,
      url: event.htmlLink,
    };
  };

  const calendarEvents = APIEvents.map(parseEvent);

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
