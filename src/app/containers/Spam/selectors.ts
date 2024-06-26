import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.spam|| initialState
} 
export const Spamselectors = { root: createSelector( [domains.root],
(state) => state,) }