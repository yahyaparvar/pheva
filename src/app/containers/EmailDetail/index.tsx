// EmailDetail.tsx
import { useEffect } from "react";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import Editor from "./editor";
import { emailDetailSaga } from "./saga";
import { emailDetailReducer, sliceKey } from "./slice";

interface Props {}

export function EmailDetail(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
  useInjectSaga({ key: sliceKey, saga: emailDetailSaga });

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Email Detail</h2>
      <Editor></Editor>
    </div>
  );
}
