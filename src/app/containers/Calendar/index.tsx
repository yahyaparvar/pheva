/**
*
* Calendar
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { calendarReducer, sliceKey } from './slice';
import { Calendarselectors } from './selectors';
import { calendarSaga } from './saga';

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
  </div>
</>
);

};
