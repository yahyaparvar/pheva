/**
 *
 * Calendar
 *
 */

import { useDispatch, useSelector } from "react-redux";

import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import styled from "styled-components";
import { ROW_ALIGN_START__JUSTIFY_CENTER } from "styles/globalStyles";
import EventCalendar from "./components/EventCalendar/eventCalendar";
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
      <EventCalendar />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_CENTER}
  width:100%;
  padding: 24px;
`;
