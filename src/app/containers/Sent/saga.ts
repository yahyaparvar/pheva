import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { Status } from "app/types";
import axiosInstance from "service/apiClient";
import { LocalStorageKeys, storage } from "store/storage";
import { Sentselectors } from "./selectors";
import { SentActions } from "./slice";
import { Email, EmailResponse } from "../Inbox/types";

export const fetchEmails = async (
  pageToken?: string
): Promise<EmailResponse> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/emails/sent?pageToken=${pageToken || ""}`
  );
  return {
    emails: response.data.emails,
    nextPageToken: response.data.nextPageToken,
  };
};
export const getEmailSummaryAPI = async (
  prompt?: Email[]
): Promise<EmailResponse> => {
  const response = await axiosInstance.post(
    `http://localhost:8000/ai/emails/summary`,
    { prompt, name: storage.read(LocalStorageKeys.USER_INFO).name }
  );
  return response.data.emails;
};

export function* getEmails() {
  while (true) {
    try {
      yield put(SentActions.setEmailStatus(Status.LOADING));
      const { emails, nextPageToken }: EmailResponse = yield call(fetchEmails);
      yield put(SentActions.setEmails(emails));
      yield put(SentActions.setNextPageToken(nextPageToken));
      yield put(SentActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000); // Wait for 4 seconds before retrying
      } else {
        yield put(SentActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}
export function* nextEmailPage() {
  while (true) {
    try {
      yield put(SentActions.setEmailStatus(Status.LOADING));
      const nextPageToken: string = yield select(Sentselectors.nextPageToken);
      const { emails, nextPageToken: newPageToken }: EmailResponse = yield call(
        fetchEmails,
        nextPageToken
      );
      yield put(SentActions.appendPrevPageToken(nextPageToken));
      yield put(SentActions.setEmails(emails));
      yield put(SentActions.setNextPageToken(newPageToken));
      yield put(SentActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000);
      } else {
        yield put(SentActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}
export function* previousEmailPage() {
  while (true) {
    try {
      yield put(SentActions.setEmailStatus(Status.LOADING));
      const lastPageTokens: string[] = yield select(
        Sentselectors.lastPageTokens
      );
      if (lastPageTokens.length === 0) {
        yield put(SentActions.setEmailStatus(Status.SUCCESS));
        break;
      }
      const previousPageToken: string =
        lastPageTokens[lastPageTokens.length - 2];
      const { emails, nextPageToken }: EmailResponse = !previousPageToken
        ? yield call(fetchEmails)
        : yield call(fetchEmails, previousPageToken);
      yield put(SentActions.setEmails(emails));
      yield put(SentActions.setNextPageToken(nextPageToken));
      yield put(SentActions.removePrevPageToken());
      yield put(SentActions.setEmailStatus(Status.SUCCESS));
      break;
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000);
      } else {
        yield put(SentActions.setEmailStatus(Status.ERROR));
        break;
      }
    }
  }
}

export function* sentSaga() {
  yield takeLatest(SentActions.getEmails.type, getEmails);
  yield takeLatest(SentActions.nextEmailPage.type, nextEmailPage);
  yield takeLatest(SentActions.previousEmailPage.type, previousEmailPage);
}
