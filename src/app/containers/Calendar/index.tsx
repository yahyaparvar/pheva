/**
 *
 * Calendar
 *
 */

import { useDispatch, useSelector } from "react-redux";

import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
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
    <>
      <div>
        <CalendarEx />
      </div>
    </>
  );
}
