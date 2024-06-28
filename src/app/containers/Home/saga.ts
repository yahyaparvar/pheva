// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import axiosInstance from "service/apiClient";
import { homeActions } from "./slice";

export function* getUnreadEmails() {
  try {
    const response: AxiosResponse =
      yield axiosInstance.get("home/unread-emails");
    yield put(homeActions.setUnreadEmailsCount(response.data.unreadCount));
  } catch (error) {
    console.log(error);
  }
}
export function* getEvents() {
  try {
    const response: AxiosResponse = yield axiosInstance.post("home/events");
    yield put(homeActions.setEvents(response.data.items));
  } catch (error) {
    console.log(error);
  }
}

export function* homeSaga() {
  yield takeLatest(homeActions.getUnreadEmails.type, getUnreadEmails);
  yield takeLatest(homeActions.getEvents.type, getEvents);
}
