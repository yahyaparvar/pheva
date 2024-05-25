import styled from "styled-components";

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
