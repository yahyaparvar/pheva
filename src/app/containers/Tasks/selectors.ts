import { createSelector } from '@reduxjs/toolkit'; import { RootState } from
'store/types'; import { initialState } from './slice'; 
const domains = {
  root: (state: RootState) => state.tasks|| initialState
} 
export const Tasksselectors = { root: createSelector( [domains.root],
(state) => state,) }