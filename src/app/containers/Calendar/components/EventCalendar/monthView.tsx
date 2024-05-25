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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "service/apiClient";
import styled from "styled-components";
import { Calendarselectors } from "../../selectors";
import { calendarActions } from "../../slice";

interface Event {
  id: string;
  summary: string;
  start?: { dateTime?: string };
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

const CalendarCell = styled.div<{ isCurrentMonth: boolean; isToday: boolean }>`
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
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>("");

  const currentMonth = selectedDate ? new Date(selectedDate) : new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const startDate = startOfMonth(subMonths(currentMonth, 3)); // start from three months back
        const endDate = endOfMonth(addMonths(currentMonth, 3)); // end three months ahead

        const response = await axiosInstance.post("calendar/events", {
          startDate,
          endDate,
        });

        setEvents(response.data);
      } catch (error) {
        setError("Failed to fetch events");
      }
    };

    fetchEvents();
  }, [currentMonth]);

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <CalendarCell
            key={day.toString()}
            isCurrentMonth={isSameMonth(day, monthStart)}
            isToday={isSameDay(day, new Date())}
          >
            <DateNumber>{formattedDate}</DateNumber>
            <div>
              {events
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
        <div style={{ display: "contents" }} key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  const nextMonth = () => {
    dispatch(calendarActions.setDate(addMonths(currentMonth, 1)));
  };

  const prevMonth = () => {
    dispatch(calendarActions.setDate(subMonths(currentMonth, 1)));
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
      {error && <div>{error}</div>}
    </CalendarContainer>
  );
};

export default Calendar;
