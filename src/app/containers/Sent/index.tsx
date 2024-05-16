/**
 *
 * Sent
 *
 */

import { useDispatch, useSelector } from "react-redux";

import MotionBox from "app/components/animated";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { sentSaga } from "./saga";
import { Sentselectors } from "./selectors";
import { SentReducer, sliceKey } from "./slice";

interface Props {}

export function Sent(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: SentReducer });
  useInjectSaga({ key: sliceKey, saga: sentSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sent = useSelector(Sentselectors.root);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <MotionBox>
      <div>This is sent!</div>
    </MotionBox>
  );
}
