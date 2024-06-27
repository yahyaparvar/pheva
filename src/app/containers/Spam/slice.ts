/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { spamSaga } from './saga';
import { Email } from '../Inbox/types';
import { Status } from 'app/types';

// The initial state of the Spam container
export const initialState: ContainerState = {
  showAiAnimation: undefined,
  emails: [],
  status: Status.INITIAL,
  nextPageToken: undefined,
  lastPageTokens: [],
};

const spamSlice = createSlice({
  name: 'spam',
  initialState,
  reducers: {
    getEmails(state) {},
    setEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload;
    },
    setEmailStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setNextPageToken(state, action: PayloadAction<string>) {
      state.nextPageToken = action.payload;
    },
    appendPrevPageToken(state, action: PayloadAction<string>) {
      state.lastPageTokens.push(action.payload);
    },
    removePrevPageToken(state) {
      state.lastPageTokens.pop();
    },
    nextEmailPage() {},
    previousEmailPage() {},
    fetchEmailSummaries(state) {},
  },
});

export const { actions:spamActions, reducer:spamReducer, name: sliceKey } = spamSlice;

export const usespamSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: spamReducer });
useInjectSaga({ key: sliceKey, saga: spamSaga });
return { spamActions }
}