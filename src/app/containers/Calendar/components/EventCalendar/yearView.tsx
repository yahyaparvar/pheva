import {
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDaysInMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React from "react";
import styled from "styled-components";

const YearContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
`;

const MonthName = styled.h3`
  margin: 0;
  margin-bottom: 10px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

const Day = styled.div<{ isHeader?: boolean; isToday?: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.isHeader ? "12px" : "10px")};
  background-color: ${(props) =>
    props.isHeader ? "#eee" : props.isToday ? "#ff0" : "#fff"};
  border: 1px solid #ddd;
`;

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const YearView: React.FC = () => {
  const year = new Date().getFullYear();

  const renderMonth = (date: Date) => {
    const monthName = format(date, "MMMM");
    const daysInMonth = getDaysInMonth(date);
    const startDay = startOfMonth(date);
    const startWeekDay = startOfWeek(startDay, { weekStartsOn: 0 });
    const endWeekDay = endOfWeek(addMonths(startDay, 1), { weekStartsOn: 0 });

    const days = eachDayOfInterval({ start: startWeekDay, end: endWeekDay });

    return (
      <MonthContainer key={monthName}>
        <MonthName>{monthName}</MonthName>
        <DaysGrid>
          {daysOfWeek.map((day) => (
            <Day key={day} isHeader>
              {day}
            </Day>
          ))}
          {days.map((day) => (
            <Day key={day.toString()} isToday={isToday(day)}>
              {format(day, "d")}
            </Day>
          ))}
        </DaysGrid>
      </MonthContainer>
    );
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(new Date(year, 0), i)
  );

  return (
    <YearContainer>
      <h2>{year} Year View</h2>
      <MonthsGrid>{months.map((month) => renderMonth(month))}</MonthsGrid>
    </YearContainer>
  );
};

export default YearView;
