import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { Status } from "app/types";
import axiosInstance from "service/apiClient";
import { LocalStorageKeys, storage } from "store/storage";
import { Spamselectors } from "./selectors";

import { Email, EmailResponse } from "../Inbox/types";
import { spamActions } from "./slice";

export const fetchEmails = async (
  pageToken?: string
): Promise<EmailResponse> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/emails/spam?pageToken=${pageToken || ""}`
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
      yield put(spamActions.setEmailStatus(Status.LOADING));
      const { emails, nextPageToken }: EmailResponse = yield call(fetchEmails);
      yield put(spamActions.setEmails(emails));
      yield put(spamActions.setNextPageToken(nextPageToken));
      yield put(spamActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000); // Wait for 4 seconds before retrying
      } else {
        yield put(spamActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}
export function* nextEmailPage() {
  while (true) {
    try {
      yield put(spamActions.setEmailStatus(Status.LOADING));
      const nextPageToken: string = yield select(Spamselectors.nextPageToken);
      const { emails, nextPageToken: newPageToken }: EmailResponse = yield call(
        fetchEmails,
        nextPageToken
      );
      yield put(spamActions.appendPrevPageToken(nextPageToken));
      yield put(spamActions.setEmails(emails));
      yield put(spamActions.setNextPageToken(newPageToken));
      yield put(spamActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000);
      } else {
        yield put(spamActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}
export function* previousEmailPage() {
  while (true) {
    try {
      yield put(spamActions.setEmailStatus(Status.LOADING));
      const lastPageTokens: string[] = yield select(
        Spamselectors.lastPageTokens
      );
      if (lastPageTokens.length === 0) {
        yield put(spamActions.setEmailStatus(Status.SUCCESS));
        break;
      }
      const previousPageToken: string =
        lastPageTokens[lastPageTokens.length - 2];
      const { emails, nextPageToken }: EmailResponse = !previousPageToken
        ? yield call(fetchEmails)
        : yield call(fetchEmails, previousPageToken);
      yield put(spamActions.setEmails(emails));
      yield put(spamActions.setNextPageToken(nextPageToken));
      yield put(spamActions.removePrevPageToken());
      yield put(spamActions.setEmailStatus(Status.SUCCESS));
      break;
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000);
      } else {
        yield put(spamActions.setEmailStatus(Status.ERROR));
        break;
      }
    }
  }
}

export function* spamSaga() {
  yield takeLatest(spamActions.getEmails.type, getEmails);
  yield takeLatest(spamActions.nextEmailPage.type, nextEmailPage);
  yield takeLatest(spamActions.previousEmailPage.type, previousEmailPage);
}
