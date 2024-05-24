import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.calendar|| initialState
} 
export const Calendarselectors = { root: createSelector( [domains.root],
(state) => state,) }