/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { loginSaga } from './saga';

// The initial state of the Login container
export const initialState: ContainerState = {};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:LoginActions, reducer:LoginReducer, name: sliceKey } = loginSlice;

export const useLoginSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: LoginReducer });
useInjectSaga({ key: sliceKey, saga: loginSaga });
return { LoginActions }
}