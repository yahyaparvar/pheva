/**
*
* Sent
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { SentReducer, sliceKey } from './slice';
import { Sentselectors } from './selectors';
import { sentSaga } from './saga';

interface Props {}


export function Sent(props: Props) {
useInjectReducer({ key: sliceKey, reducer: SentReducer });
  useInjectSaga({ key: sliceKey, saga: sentSaga });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sent = useSelector(Sentselectors.root);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dispatch = useDispatch();


return (
<>
     <div>
  </div>
</>
);

};
