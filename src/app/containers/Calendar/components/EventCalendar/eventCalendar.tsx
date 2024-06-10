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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";
import { CalendarViews } from "../../types";
import { parseEvents } from "./functions";
import { EditModal } from "../dateModal";
import { AppContainer, CalendarWrapper, Header, PrevNextButtonWrapper, NextPrevButton, FormattedDate } from "./calender.styles";


const EventCalendar: React.FC = () => {
  const events = useSelector(Calendarselectors.eventsList);
  const eventsStatus = useSelector(Calendarselectors.eventsStatus);
  const selectedDate = useSelector(Calendarselectors.selectedDate);
  const animationKey = useSelector(Calendarselectors.animationKey);
  const currentView = useSelector(Calendarselectors.currentView);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (eventsStatus !== Status.SUCCESS) {
      dispatch(calendarActions.getEvents());
    }
  }, [dispatch, eventsStatus]);

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

  const handleDateSelect = (selectInfo: any) => {
    const { start, end } = selectInfo;
    setSelectedRange({ start, end });
    handleOpen();
  };

  return (
    <AppContainer>
      {eventsStatus === Status.LOADING && (
        <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
          <LinearProgress />
        </Box>
      )}
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
              selectable
              selectMirror
              select={handleDateSelect}
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
      <EditModal
        open={open}
        handleClose={handleClose}
        selectedRange={selectedRange}
      />
    </AppContainer>
  );
};

export default EventCalendar;
