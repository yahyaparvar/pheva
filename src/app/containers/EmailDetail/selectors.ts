import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
const domains = {
  root: (state: RootState) => state.emailDetail || initialState,
  emailDetail: (state: RootState) =>
    state.emailDetail?.emailDetail || initialState.emailDetail,
  status: (state: RootState) =>
    state.emailDetail?.status || initialState.status,
  summaryStreamText: (state: RootState) =>
    state.emailDetail?.summary.streamText || initialState.summary.streamText,
  summaryStatus: (state: RootState) =>
    state.emailDetail?.summary.status || initialState.summary.status,
  negativeAnswer: (state: RootState) =>
    state.emailDetail?.answer.negative.streamText ||
    initialState.answer.negative.streamText,
  negativeAnswerStatus: (state: RootState) =>
    state.emailDetail?.answer.negative.status ||
    initialState.answer.negative.status,

  positiveAnswer: (state: RootState) =>
    state.emailDetail?.answer.positive.streamText ||
    initialState.answer.positive.streamText,
  positiveAnswerStatus: (state: RootState) =>
    state.emailDetail?.answer.positive.status ||
    initialState.answer.positive.status,
  textFromHTML: (state: RootState) =>
    state.emailDetail?.textFromHTML || initialState?.textFromHTML,
};
export const EmailDetailselectors = {
  root: createSelector([domains.root], (state) => state),
  emailDetail: createSelector([domains.emailDetail], (state) => state),
  status: createSelector([domains.status], (state) => state),
  summaryStreamText: createSelector(
    [domains.summaryStreamText],
    (state) => state
  ),
  summaryStatus: createSelector([domains.summaryStatus], (state) => state),
  negativeAnswer: createSelector([domains.negativeAnswer], (state) => state),
  positiveAnswer: createSelector([domains.positiveAnswer], (state) => state),
  negativeAnswerStatus: createSelector(
    [domains.negativeAnswerStatus],
    (state) => state
  ),
  positiveAnswerStatus: createSelector(
    [domains.positiveAnswerStatus],
    (state) => state
  ),
};
