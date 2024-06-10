import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import Dropdown from "app/containers/Calendar/components/dropdown";
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
  const selectedDate = useSelector(Calendarselectors.selectedDate);
  const animationKey = useSelector(Calendarselectors.animationKey);
  const currentView = useSelector(Calendarselectors.currentView);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarActions.getEvents());
  }, [dispatch]);

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
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <FullCalendar
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
  );
};

export default EventCalendar;
