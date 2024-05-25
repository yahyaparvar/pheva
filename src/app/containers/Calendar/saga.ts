// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { Status } from "app/types";
import { AxiosResponse } from "axios";
import { addMonths, endOfMonth, startOfMonth, subMonths } from "date-fns";
import { put, select, takeLatest } from "redux-saga/effects";
import axiosInstance from "service/apiClient";
import { Calendarselectors } from "./selectors";
import { calendarActions } from "./slice";

export function* getEvents() {
  try {
    yield put(calendarActions.setEventStatus(Status.LOADING));
    const selectedDate: Date = yield select(Calendarselectors.selectedDate);
    const currentMonth = new Date(selectedDate);
    const startDate = startOfMonth(subMonths(currentMonth, 2)); // start from three months back
    const endDate = endOfMonth(addMonths(currentMonth, 2)); // end three months ahead

    const response: AxiosResponse = yield axiosInstance.post(
      "calendar/events",
      {
        startDate,
        endDate,
      }
    );
    yield put(calendarActions.setEvents(response.data));
    yield put(calendarActions.setEventStatus(Status.SUCCESS));
  } catch (error) {
    yield put(calendarActions.setEventStatus(Status.ERROR));
    console.log(error);
  }
}

export function* calendarSaga() {
  yield takeLatest(calendarActions.getEvents.type, getEvents);
}
