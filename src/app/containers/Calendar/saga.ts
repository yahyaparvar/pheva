// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { Status } from "app/types";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import axiosInstance from "service/apiClient";
import { calendarActions } from "./slice";

export function* getEvents() {
  try {
    yield put(calendarActions.setEventStatus(Status.LOADING));
    const response: AxiosResponse = yield axiosInstance.post("calendar/events");

    yield put(calendarActions.setEvents(response.data.items));
    yield put(calendarActions.setEventStatus(Status.SUCCESS));
  } catch (error) {
    yield put(calendarActions.setEventStatus(Status.ERROR));
    console.log(error);
  }
}

export function* calendarSaga() {
  yield takeLatest(calendarActions.getEvents.type, getEvents);
}
