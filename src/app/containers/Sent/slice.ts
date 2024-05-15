/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { sentSaga } from './saga';

// The initial state of the Sent container
export const initialState: ContainerState = {};

const sentSlice = createSlice({
  name: 'sent',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:SentActions, reducer:SentReducer, name: sliceKey } = sentSlice;

export const useSentSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: SentReducer });
useInjectSaga({ key: sliceKey, saga: sentSaga });
return { SentActions }
}