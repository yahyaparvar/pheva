import { call, put, takeLatest } from "redux-saga/effects";

import { Status } from "app/types";
import { toast } from "react-toastify";
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
  try {
    yield put(InboxActions.setEmailStatus(Status.LOADING));
    const emails: Email[] = yield call(fetchEmails);
    yield put(InboxActions.setEmails(emails));
    yield put(InboxActions.setEmailStatus(Status.SUCCESS));
  } catch (error: any) {
    yield put(InboxActions.setEmailStatus(Status.ERROR));
    toast.error("Could not fetch emails.");
  } finally {
  }
}

export function* inboxSaga() {
  yield takeLatest(InboxActions.getEmails.type, getEmails);
}
