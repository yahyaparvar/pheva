/**
*
* Spam
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { spamReducer, sliceKey } from './slice';
import { Spamselectors } from './selectors';
import { spamSaga } from './saga';

interface Props {}


export function Spam(props: Props) {
useInjectReducer({ key: sliceKey, reducer: spamReducer });
  useInjectSaga({ key: sliceKey, saga: spamSaga });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const spam = useSelector(Spamselectors.root);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dispatch = useDispatch();


return (
<>
     <div>
  </div>
</>
);

};
