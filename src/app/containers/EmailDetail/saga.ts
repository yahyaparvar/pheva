import { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "app/types";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import axiosInstance from "service/apiClient";
import { emailDetailActions } from "./slice";

export function* getEmailData(action: PayloadAction<string>) {
  try {
    yield put(emailDetailActions.setStatus(Status.LOADING));
    const response: AxiosResponse = yield axiosInstance.get(
      `emails/email/${action.payload}`
    );
    yield put(emailDetailActions.setEmailData(response.data.emailDetails));
    yield put(emailDetailActions.setStatus(Status.SUCCESS));
  } catch (error) {
    yield put(emailDetailActions.setStatus(Status.ERROR));
  }
}

export function* emailDetailSaga() {
  yield takeLatest(emailDetailActions.getEmailData.type, getEmailData);
}
