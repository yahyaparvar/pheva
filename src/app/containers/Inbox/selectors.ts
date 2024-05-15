import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.inbox|| initialState
} 
export const Inboxselectors = { root: createSelector( [domains.root],
(state) => state,) }