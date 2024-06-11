/**
*
* EmailDetail
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { emailDetailReducer, sliceKey } from './slice';
import { EmailDetailselectors } from './selectors';
import { emailDetailSaga } from './saga';

interface Props {}


export function EmailDetail(props: Props) {
useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
  useInjectSaga({ key: sliceKey, saga: emailDetailSaga });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emailDetail = useSelector(EmailDetailselectors.root);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dispatch = useDispatch();


return (
<>
     <div>
  </div>
</>
);

};
