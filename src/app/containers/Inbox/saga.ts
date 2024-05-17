import { call, delay, put, takeLatest } from "redux-saga/effects";

import { Status } from "app/types";
import axiosInstance from "service/apiClient";
import { InboxActions } from "./slice";
import { Email } from "./types";

export const fetchEmails = async (): Promise<Email[]> => {
  const response = await axiosInstance.get(
    "http://localhost:8000/emails/inbox"
  );
  return response.data.messages as Email[];
};

export function* getEmails() {
  while (true) {
    try {
      yield put(InboxActions.setEmailStatus(Status.LOADING));
      const emails: Email[] = yield call(fetchEmails);
      yield put(InboxActions.setEmails(emails));
      yield put(InboxActions.setEmailStatus(Status.SUCCESS));
      break; // Exit loop if call is successful
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(3000); // Wait for 4 seconds before retrying
      } else {
        yield put(InboxActions.setEmailStatus(Status.ERROR)); // Handle other errors
        break;
      }
    }
  }
}

export function* inboxSaga() {
  yield takeLatest(InboxActions.getEmails.type, getEmails);
}
