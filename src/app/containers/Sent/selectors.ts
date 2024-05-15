import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.sent|| initialState
} 
export const Sentselectors = { root: createSelector( [domains.root],
(state) => state,) }