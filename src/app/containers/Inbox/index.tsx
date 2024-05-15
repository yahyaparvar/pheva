/**
*
* Inbox
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { InboxReducer, sliceKey } from './slice';
import { Inboxselectors } from './selectors';
import { inboxSaga } from './saga';

interface Props {}


export function Inbox(props: Props) {
useInjectReducer({ key: sliceKey, reducer: InboxReducer });
  useInjectSaga({ key: sliceKey, saga: inboxSaga });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inbox = useSelector(Inboxselectors.root);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dispatch = useDispatch();


return (
<>
     <div>
  </div>
</>
);

};
