/**
*
* Tasks
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { tasksReducer, sliceKey } from './slice';
import { Tasksselectors } from './selectors';
import { tasksSaga } from './saga';

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
     <div>
  </div>
</>
);

};
