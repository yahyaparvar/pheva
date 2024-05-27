import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import styled from "styled-components";
import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";

export interface Event {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  recurrence?: string[];
  [key: string]: any; // For any other additional properties
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #eee;
`;

const DayHeader = styled.div`
  background-color: #f5f5f5;
  padding: 10px 0;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

interface CalendarCellProps {
  isCurrentMonth: boolean;
  isToday: boolean;
}

const CalendarCell = styled.div<CalendarCellProps>`
  border: 1px solid #ddd;
  padding: 10px;
  height: 120px;
  background-color: ${({ isCurrentMonth }) =>
    isCurrentMonth ? "#fff" : "#f5f5f5"};
  color: ${({ isToday }) => (isToday ? "red" : "inherit")};
  overflow-y: auto;
`;

const DateNumber = styled.div`
  font-weight: bold;
`;

const EventItem = styled.div`
  background-color: #4285f4;
  color: #fff;
  padding: 2px;
  border-radius: 2px;
  margin-top: 5px;
  font-size: 12px;
`;

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(Calendarselectors.selectedDate);
  const events = useSelector(Calendarselectors.eventsList) as Event[];
  const currentMonth = useMemo(() => new Date(selectedDate), [selectedDate]);

  const [expandedEvents, setExpandedEvents] = useState<Event[]>([]);

  useEffect(() => {
    dispatch(calendarActions.getEvents());
  }, [dispatch]);

  useEffect(() => {
    const expandRecurringEvents = () => {
      const expanded: Event[] = [];
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);

      events.forEach((event) => {
        if (event.recurrence) {
          const eventStart = parseISO(event.start.dateTime);
          event.recurrence.forEach((rule) => {
            const rruleSet = RRule.fromString(rule);
            const dates = rruleSet.between(startDate, endDate);
            dates.forEach((date) => {
              expanded.push({
                ...event,
                start: { dateTime: date.toISOString() },
              });
            });
          });
        } else {
          expanded.push(event);
        }
      });
      setExpandedEvents(expanded);
    };

    expandRecurringEvents();
  }, [events, currentMonth]);

  const renderCells = useCallback(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      const weekDays: JSX.Element[] = [];
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        weekDays.push(
          <CalendarCell
            key={day.toString()}
            isCurrentMonth={isSameMonth(day, monthStart)}
            isToday={isSameDay(day, new Date())}
          >
            <DateNumber>{formattedDate}</DateNumber>
            <div>
              {expandedEvents
                .filter((event) =>
                  event.start?.dateTime
                    ? isSameDay(parseISO(event.start.dateTime), cloneDay)
                    : false
                )
                .map((event) => (
                  <EventItem key={event.id}>{event.summary}</EventItem>
                ))}
            </div>
          </CalendarCell>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div style={{ display: "contents" }} key={weekDays[0].key}>
          {weekDays}
        </div>
      );
    }
    return rows;
  }, [currentMonth, expandedEvents]);

  const nextMonth = () => {
    dispatch(calendarActions.setDate(startOfMonth(addMonths(currentMonth, 1))));
  };

  const prevMonth = () => {
    dispatch(calendarActions.setDate(startOfMonth(subMonths(currentMonth, 1))));
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <HeaderButton onClick={prevMonth}>{"<"}</HeaderButton>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <HeaderButton onClick={nextMonth}>{">"}</HeaderButton>
      </CalendarHeader>
      <CalendarGrid>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {renderCells()}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
