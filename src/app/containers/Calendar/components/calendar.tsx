import {
  addDays,
  addMonths,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { COLUMN_CENTER, ROW_CENTER, UNSELECTABLE } from "styles/globalStyles";
import { Calendarselectors } from "../selectors";
import { calendarActions } from "../slice";

const CalendarExWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: fit-content;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 16px 6px;
  padding-top: 55px;
`;

const DaysWrapper = styled.div`
  display: grid;
  cursor: pointer;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekDaysWrapper = styled.div`
  display: grid;
  cursor: pointer;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  padding: 12px 0;
`;

interface DayProps {
  isCurrentMonth: boolean;
  date: Date;
  isSelected: boolean;
}

const Day = styled.div`
  width: 30px;
  height: 30px;
  font-size: 11px;
  padding: 3px;
`;

const DayContent = styled.div<DayProps>`
  width: 100%;
  ${COLUMN_CENTER}
  font-size: 11px;
  background-color: white;
  border-radius: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isSelected ? "maroon" : props.isCurrentMonth ? "#000" : "#494949"};
  color: #fff;
  cursor: pointer;
  ${(props) =>
    props.isCurrentMonth &&
    !props.isSelected &&
    isToday(props.date) &&
    `
    background: #560808;
  `}
  transition: ${(props) =>
    props.isCurrentMonth ? "background-color 0.2s" : "none"};

  &:hover {
    background-color: ${(props) => !props.isSelected && "#313131"};
  }
`;

const WeekdayHeader = styled.div`
  text-align: center;
  font-size: 11px;
`;

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const CalendarEx: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(Calendarselectors.selectedDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    setCurrentMonth(selectedDate);
  }, [selectedDate]);

  const handleDayClick = (day: Date) => {
    const normalizedDay = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );
    if (!isSameMonth(normalizedDay, currentMonth)) {
      if (normalizedDay < currentMonth) {
        setCurrentMonth(subMonths(currentMonth, 1));
      } else {
        setCurrentMonth(addMonths(currentMonth, 1));
      }
    }
    dispatch(calendarActions.setDate(normalizedDay.toISOString()));
  };

  const renderDays = (): JSX.Element => {
    const startMonth = startOfMonth(currentMonth);
    const startDate = startOfWeek(startMonth);

    const days: JSX.Element[] = [];
    let day = startDate;

    while (days.length < 42) {
      // Ensure 6 weeks (7 days per week)
      const currentDay = day; // Capture the current value of day
      days.push(
        <Day
          key={currentDay.toISOString()}
          onClick={() => handleDayClick(currentDay)}
        >
          <DayContent
            key={`${currentDay.toISOString()}-${isSameMonth(currentDay, currentMonth)}`}
            isCurrentMonth={isSameMonth(currentDay, currentMonth)}
            date={currentDay}
            isSelected={
              selectedDate
                ? format(currentDay, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd")
                : false
            }
          >
            {format(currentDay, "d")}
          </DayContent>
        </Day>
      );
      day = addDays(day, 1);
    }

    return <DaysWrapper>{days}</DaysWrapper>;
  };

  const renderWeekdays = (): JSX.Element => {
    return (
      <WeekDaysWrapper>
        {weekdays.map((day) => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}
      </WeekDaysWrapper>
    );
  };

  const nextMonth = (): void => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = (): void => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <CalendarExWrapper>
      <Header>
        <Title>{format(currentMonth, "MMMM yyyy")}</Title>
        <PrevNextButtonWrapper>
          <NextPrevButton onClick={prevMonth}>
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
          <NextPrevButton onClick={nextMonth}>
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
        </PrevNextButtonWrapper>
      </Header>
      {renderWeekdays()}
      {renderDays()}
    </CalendarExWrapper>
  );
};

const Title = styled.div`
  font-weight: 700;
  font-size: 14px;
`;

const NextPrevButton = styled.div<{ disabled?: "true" | "false" }>`
  ${UNSELECTABLE}
  ${({ disabled }) =>
    disabled === "true" &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
  width: 20px;
  padding: 5px;
  box-sizing: initial;
  cursor: pointer;
  height: 20px;
`;

const PrevNextButtonWrapper = styled.div`
  ${ROW_CENTER}
`;

export default CalendarEx;
