/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { spamSaga } from './saga';

// The initial state of the Spam container
export const initialState: ContainerState = {};

const spamSlice = createSlice({
  name: 'spam',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:spamActions, reducer:spamReducer, name: sliceKey } = spamSlice;

export const usespamSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: spamReducer });
useInjectSaga({ key: sliceKey, saga: spamSaga });
return { spamActions }
}