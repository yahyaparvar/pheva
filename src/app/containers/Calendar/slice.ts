/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { calendarSaga } from './saga';

// The initial state of the Calendar container
export const initialState: ContainerState = {};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:calendarActions, reducer:calendarReducer, name: sliceKey } = calendarSlice;

export const usecalendarSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: calendarReducer });
useInjectSaga({ key: sliceKey, saga: calendarSaga });
return { calendarActions }
}