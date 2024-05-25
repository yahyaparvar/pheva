import { addHours, format, startOfToday } from "date-fns";
import React from "react";
import styled from "styled-components";

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  width: 100%;
`;

const HourCell = styled.div<{ isHeader?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isHeader ? "center" : "flex-start")};
  padding: 10px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.isHeader ? "#eee" : "#fff")};
`;

const EventCell = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
`;

const DayView: React.FC = () => {
  const today = startOfToday();
  const hours = Array.from({ length: 24 }, (_, i) => addHours(today, i));

  return (
    <DayContainer>
      <h2>{format(today, "EEEE, MMMM d, yyyy")}</h2>
      <HoursGrid>
        <HourCell isHeader>Time</HourCell>
        <HourCell isHeader>Events</HourCell>
        {hours.map((hour) => (
          <React.Fragment key={hour.toString()}>
            <HourCell>{format(hour, "h a")}</HourCell>
            <EventCell>{/* Add events here */}</EventCell>
          </React.Fragment>
        ))}
      </HoursGrid>
    </DayContainer>
  );
};

export default DayView;
