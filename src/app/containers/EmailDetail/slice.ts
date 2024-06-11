/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { emailDetailSaga } from './saga';

// The initial state of the EmailDetail container
export const initialState: ContainerState = {};

const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:emailDetailActions, reducer:emailDetailReducer, name: sliceKey } = emailDetailSlice;

export const useemailDetailSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
useInjectSaga({ key: sliceKey, saga: emailDetailSaga });
return { emailDetailActions }
}