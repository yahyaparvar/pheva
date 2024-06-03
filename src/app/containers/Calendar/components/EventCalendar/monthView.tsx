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

// import dayGridPlugin from "@fullcalendar/daygrid";
// import FullCalendar from "@fullcalendar/react";
// import rrulePlugin from "@fullcalendar/rrule";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import React from "react";

// interface EventInput {
//   id: string;
//   title: string;
//   startRecur: string;
//   endRecur: string;
//   rrule: {
//     freq: string;
//     byweekday?: string;
//     bymonthday?: number;
//     dtstart: string;
//   };
//   duration: string;
// }

// // Helper function to calculate duration
// const calculateDuration = (start: string, end: string): string => {
//   const startTime = new Date(start);
//   const endTime = new Date(end);
//   const durationMs = endTime.getTime() - startTime.getTime(); // duration in milliseconds
//   const durationHours = Math.floor(durationMs / 3600000); // convert to hours
//   const durationMinutes = Math.floor((durationMs % 3600000) / 60000); // remaining minutes
//   return `${durationHours}:${durationMinutes.toString().padStart(2, "0")}`; // format as HH:mm
// };

// const events: EventInput[] = [
//   {
//     id: "1",
//     title: "Weekly Meeting",
//     startRecur: "2024-06-03T03:00:00",
//     endRecur: "2024-12-31T11:00:00",
//     rrule: {
//       freq: "weekly",
//       byweekday: "mo",
//       dtstart: "2024-06-03T03:00:00",
//     },
//     duration: calculateDuration("2024-06-03T03:00:00", "2024-06-03T11:00:00"),
//   },
//   {
//     id: "2",
//     title: "Monthly Check-in",
//     startRecur: "2024-06-15T09:00:00",
//     endRecur: "2024-12-31T10:00:00",
//     rrule: {
//       freq: "monthly",
//       bymonthday: 15,
//       dtstart: "2024-06-15T09:00:00",
//     },
//     duration: calculateDuration("2024-06-15T09:00:00", "2024-06-15T10:00:00"),
//   },
// ];

// const MyCalendar: React.FC = () => {
//   return (
//     <div style={{ height: "100vh" }}>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, rrulePlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridDay",
//         }}
//         events={events}
//         height="auto"
//       />
//     </div>
//   );
// };

// export default MyCalendar;

// import dayGridPlugin from "@fullcalendar/daygrid";
// import FullCalendar from "@fullcalendar/react";
// import rrulePlugin from "@fullcalendar/rrule";
// import timeGridPlugin from "@fullcalendar/timegrid"; // Import timeGridPlugin for day view

// const events = [
//   {
//     id: "1",
//     title: "Weekly Meeting",
//     start: "2024-06-03T03:00:00",
//     end: "2024-06-03T11:00:00",
//     rrule: "DTSTART:20240603T030000\nRRULE:FREQ=WEEKLY;BYDAY=MO", // Using RRule string
//     recurStart: "2024-06-03T03:00:00",
//     recurEnd: "2024-06-03T11:00:00",
//   },
//   {
//     id: "2",
//     title: "Monthly Check-in",
//     start: "2024-06-15T09:00:00",
//     end: "2024-06-15T10:00:00",
//     rrule: "DTSTART:20240615T090000\nRRULE:FREQ=MONTHLY;BYMONTHDAY=15", // Using RRule string
//     recurStart: "2024-06-15T09:00:00",
//     recurEnd: "2024-06-15T10:00:00",
//   },
// ];

// // Calculate the duration of an event
// const calculateDuration = (start: string, end: string): string => {
//   const startTime = new Date(start);
//   const endTime = new Date(end);
//   const durationMs = endTime.getTime() - startTime.getTime(); // duration in milliseconds
//   const durationHours = Math.floor(durationMs / 3600000); // convert to hours
//   const durationMinutes = Math.floor((durationMs % 3600000) / 60000); // remaining minutes
//   return `${durationHours}:${durationMinutes.toString().padStart(2, "0")}`; // format as HH:mm
// };

// // Add duration to each event
// const formattedEvents = events.map((event) => ({
//   ...event,
//   title: `${event.title} (${calculateDuration(event.recurStart, event.recurEnd)})`,
//   duration: calculateDuration(event.recurStart, event.recurEnd),
// }));

// const MyCalendar = () => {
//   return (
//     <div style={{ height: "100vh" }}>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, rrulePlugin]} // Add timeGridPlugin here
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridDay", // Add timeGridDay to switch views
//         }}
//         events={formattedEvents}
//         height="auto"
//       />
//     </div>
//   );
// };

// export default MyCalendar;
