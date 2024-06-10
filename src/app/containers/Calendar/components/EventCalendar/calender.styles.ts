import styled, { css } from "styled-components";
import { ROW_CENTER, UNSELECTABLE } from "styles/globalStyles";
export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const ViewSwitcher = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;
  }
`;

export const Dropdown = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  margin: 10px 0;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Optionally, you can style the options as well if needed
export const Option = styled.option`
  padding: 10px;
  font-size: 16px;
`;

export const CalendarWrapper = styled.div`
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

export const AppContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NextPrevButton = styled.div<{ disabled?: "true" | "false" }>`
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

export const PrevNextButtonWrapper = styled.div`
  ${ROW_CENTER}
`;

export const FormattedDate = styled.div`
  font-size: 22px;
  font-weight: 500;
`;
