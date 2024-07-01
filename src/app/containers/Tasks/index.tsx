/**
 *
 * Tasks
 *
 */

import { useDispatch, useSelector } from "react-redux";

import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { tasksSaga } from "./saga";
import { Tasksselectors } from "./selectors";
import { sliceKey, tasksReducer } from "./slice";

interface Props {}

export function Tasks(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: tasksReducer });
  useInjectSaga({ key: sliceKey, saga: tasksSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tasks = useSelector(Tasksselectors.root);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <div>Tasks</div>
    </>
  );
}
