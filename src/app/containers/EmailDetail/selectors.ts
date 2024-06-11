import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.emailDetail|| initialState
} 
export const EmailDetailselectors = { root: createSelector( [domains.root],
(state) => state,) }