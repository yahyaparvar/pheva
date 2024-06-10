import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Dropdown from "app/containers/Calendar/components/dropdown";
import { Status } from "app/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { ROW_CENTER, UNSELECTABLE } from "styles/globalStyles";
import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";
import { CalendarViews } from "../../types";
import { parseEvents } from "./functions";

const CalendarWrapper = styled.div`
  width: 100%;
  margin: 40px auto;
  padding: 0 10px;
  margin-top: 0;
  .fc-col-header-cell {
    color: #333; /* Change text color */
    font-weight: 500; /* Make text bold */
    text-align: center; /* Center-align text */
    padding-top: 8px;
    font-size: 12px;
    border: 1px solid transparent; /* Add border */
    border-right: 1px solid #fff; /* Add border */
    text-transform: uppercase;
  }
  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 12px;
  }
  /* Customize the font size of each event */
  .fc-event {
    font-size: 12px; /* Change this value to your desired font size */
  }
  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  /* Highlight today's date */
  .fc-day-today {
    background-color: unset !important; /* Reset the cell background color */
  }

  .fc-day-today .fc-daygrid-day-number {
    color: #ffffff; /* Change the day number color to white */
    background-color: red; /* Change the background color to red */
    border-radius: 50%; /* Make it a circle */
    width: 18px; /* Adjust the width for better appearance */
    height: 18px; /* Adjust the height for better appearance */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px auto; /* Center it within the cell */
  }
`;

const AppContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

const EventCalendar: React.FC = () => {
  const events = useSelector(Calendarselectors.eventsList);
  const eventsStatus = useSelector(Calendarselectors.eventsStatus);
  const selectedDate = useSelector(Calendarselectors.selectedDate);
  const animationKey = useSelector(Calendarselectors.animationKey);
  const currentView = useSelector(Calendarselectors.currentView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsStatus !== Status.SUCCESS) {
      dispatch(calendarActions.getEvents());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "m" || event.key === "M") {
        dispatch(calendarActions.setView("dayGridMonth"));
      }
      if (event.key === "w" || event.key === "W") {
        dispatch(calendarActions.setView("timeGridWeek"));
      }
      if (event.key === "d" || event.key === "D") {
        dispatch(calendarActions.setView("timeGridDay"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleViewChange = (value: string) => {
    dispatch(calendarActions.setView(value as CalendarViews));
  };

  const handleNext = () => {
    dispatch(calendarActions.moveNext());
  };

  const handlePrev = () => {
    dispatch(calendarActions.movePrev());
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day:
        currentView === "dayGridMonth" || currentView === "timeGridWeek"
          ? undefined
          : "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calendarEvents = events.map(parseEvents);

  return (
    <>
      {eventsStatus === Status.LOADING && (
        <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
          <LinearProgress />
        </Box>
      )}
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
              ]}
            />
          </Header>
          <AnimatePresence mode="wait">
            <motion.div
              key={animationKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14, ease: "easeIn" }}
            >
              <FullCalendar
                editable
                height={"90vh"}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  listPlugin,
                  rrulePlugin,
                  interactionPlugin,
                ]}
                initialView={currentView}
                initialDate={selectedDate}
                headerToolbar={{
                  left: "",
                  center: "",
                  right: "",
                }}
                //@ts-ignore
                events={calendarEvents}
                nextDayThreshold={"01:00:00"}
                views={{
                  timeGridWeek: {
                    dayHeaderFormat: { weekday: "short", day: "numeric" }, // Custom format for week view
                  },
                }}
                dayMaxEvents={3}
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </CalendarWrapper>
      </AppContainer>
    </>
  );
};

export default EventCalendar;
