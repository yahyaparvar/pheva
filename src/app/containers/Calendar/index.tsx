/**
 *
 * Calendar
 *
 */

import { useDispatch, useSelector } from "react-redux";

import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import styled from "styled-components";
import { ROW_CENTER } from "styles/globalStyles";
import CalendarView from "./components/EventCalendar/calendar";
import CalendarEx from "./components/calendar";
import { calendarSaga } from "./saga";
import { Calendarselectors } from "./selectors";
import { calendarReducer, sliceKey } from "./slice";

interface Props {}

export function Calendar(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: calendarReducer });
  useInjectSaga({ key: sliceKey, saga: calendarSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const calendar = useSelector(Calendarselectors.root);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <CalendarEx />
      <CalendarView />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  ${ROW_CENTER}
  width:100%;
`;
