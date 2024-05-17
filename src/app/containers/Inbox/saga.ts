import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { Status } from "app/types";
import axiosInstance from "service/apiClient";
import { Inboxselectors } from "./selectors";
import { InboxActions } from "./slice";
import { EmailResponse } from "./types";

export const fetchEmails = async (
  pageToken?: string
): Promise<EmailResponse> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/emails/inbox?pageToken=${pageToken || ""}`
  );
  return {
    emails: response.data.emails,
    nextPageToken: response.data.nextPageToken,
  };
};

export function* getEmails() {
  while (true) {
    try {
      yield put(InboxActions.setEmailStatus(Status.LOADING));
      const { emails, nextPageToken }: EmailResponse = yield call(fetchEmails);
      yield put(InboxActions.setEmails(emails));
      yield put(InboxActions.setNextPageToken(nextPageToken));
      yield put(InboxActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000); // Wait for 4 seconds before retrying
      } else {
        yield put(InboxActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}
export function* nextEmailPage() {
  while (true) {
    try {
      yield put(InboxActions.setEmailStatus(Status.LOADING));
      const nextPageToken: string = yield select(Inboxselectors.nextPageToken);
      const { emails, nextPageToken: newPageToken }: EmailResponse = yield call(
        fetchEmails,
        nextPageToken
      );
      yield put(InboxActions.appendPrevPageToken(nextPageToken));
      yield put(InboxActions.setEmails(emails));
      yield put(InboxActions.setNextPageToken(newPageToken));
      yield put(InboxActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000);
      } else {
        yield put(InboxActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}

export function* inboxSaga() {
  yield takeLatest(InboxActions.getEmails.type, getEmails);
  yield takeLatest(InboxActions.nextEmailPage.type, nextEmailPage);
}
