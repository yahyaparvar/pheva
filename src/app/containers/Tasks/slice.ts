/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { tasksSaga } from './saga';

// The initial state of the Tasks container
export const initialState: ContainerState = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:tasksActions, reducer:tasksReducer, name: sliceKey } = tasksSlice;

export const usetasksSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: tasksReducer });
useInjectSaga({ key: sliceKey, saga: tasksSaga });
return { tasksActions }
}