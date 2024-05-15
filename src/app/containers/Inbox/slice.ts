/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { inboxSaga } from './saga';

// The initial state of the Inbox container
export const initialState: ContainerState = {};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:InboxActions, reducer:InboxReducer, name: sliceKey } = inboxSlice;

export const useInboxSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: InboxReducer });
useInjectSaga({ key: sliceKey, saga: inboxSaga });
return { InboxActions }
}