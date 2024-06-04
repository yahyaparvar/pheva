import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";
import { parseEvents } from "./functions";

const CalendarWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 10px;
`;

const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const EventCalendar: React.FC = () => {
  const events = useSelector(Calendarselectors.eventsList);
  const selectedDate = useSelector(Calendarselectors.selectedDate);
  const dispatch = useDispatch();
  const calendarRef = useRef<any>(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  useEffect(() => {
    dispatch(calendarActions.getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  const calendarEvents = events.map(parseEvents);

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const calendarApi = calendarRef.current.getApi();
    const newView = event.target.value;
    calendarApi.changeView(newView);
    setCurrentView(newView);
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    const newDate = calendarApi.getDate();
    dispatch(calendarActions.setDate(newDate.toISOString()));
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    const newDate = calendarApi.getDate();
    dispatch(calendarActions.setDate(newDate.toISOString()));
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day:
        currentView === "dayGridMonth" ||
        currentView === "timeGridWeek" ||
        currentView === "listWeek"
          ? undefined
          : "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <AppContainer>
      <CalendarWrapper>
        <Header>
          <button onClick={handlePrev}>Previous</button>
          <div>{formatDate(selectedDate?.toString())}</div>
          <button onClick={handleNext}>Next</button>
          <select onChange={handleViewChange}>
            <option value="dayGridMonth">Month</option>
            <option value="timeGridWeek">Week</option>
            <option value="timeGridDay">Day</option>
            <option value="listWeek">List</option>
          </select>
        </Header>
        <FullCalendar
          ref={calendarRef}
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
            left: "",
            center: "",
            right: "",
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

export default EventCalendar;
