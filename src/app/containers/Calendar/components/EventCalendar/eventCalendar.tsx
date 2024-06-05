import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import Dropdown from "app/components/dropdown";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { ROW_CENTER, UNSELECTABLE } from "styles/globalStyles";
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

  const handleViewChange = (value: string) => {
    const calendarApi = calendarRef.current.getApi();
    const newView = value;
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
          <PrevNextButtonWrapper>
            <NextPrevButton onClick={handlePrev}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </NextPrevButton>
            <NextPrevButton onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </NextPrevButton>
            <FormattedDate>
              {formatDate(selectedDate?.toString())}
            </FormattedDate>
          </PrevNextButtonWrapper>
          <Dropdown
            onChange={handleViewChange}
            items={[
              { label: "Month", value: "dayGridMonth" },
              { label: "Week", value: "timeGridWeek" },
              { label: "Day", value: "timeGridDay" },
              { label: "List", value: "listWeek" },
            ]}
          ></Dropdown>
        </Header>
        <FullCalendar
          ref={calendarRef}
          nextDayThreshold={"01:00:00"}
          fixedWeekCount={false}
          dayMaxEvents={2}
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
const NextPrevButton = styled.div<{ disabled?: "true" | "false" }>`
  ${UNSELECTABLE}
  ${({ disabled }) =>
    disabled === "true" &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
  padding: 5px;
  cursor: pointer;
  width: 32px;
  height: 32px;
`;
const PrevNextButtonWrapper = styled.div`
  ${ROW_CENTER}
`;
const FormattedDate = styled.div`
  font-size: 22px;
  font-weight: 500;
`;
