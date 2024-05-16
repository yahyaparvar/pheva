/**
 *
 * Inbox
 *
 */

import { useDispatch, useSelector } from "react-redux";

import MotionBox from "app/components/animated";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { inboxSaga } from "./saga";
import { Inboxselectors } from "./selectors";
import { InboxReducer, sliceKey } from "./slice";

interface Props {}

export function Inbox(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: InboxReducer });
  useInjectSaga({ key: sliceKey, saga: inboxSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inbox = useSelector(Inboxselectors.root);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <MotionBox>
      <div>This is Inbox</div>
    </MotionBox>
  );
}
