import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.login|| initialState
} 
export const Loginselectors = { root: createSelector( [domains.root],
(state) => state,) }