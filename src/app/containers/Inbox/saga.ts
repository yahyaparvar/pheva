import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { Status } from "app/types";
import axiosInstance from "service/apiClient";
import { LocalStorageKeys, storage } from "store/storage";
import { Inboxselectors } from "./selectors";
import { InboxActions } from "./slice";
import { Email, EmailResponse, EmailSummary } from "./types";

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
export const getEmailSummaryAPI = async (
  prompt?: Email[]
): Promise<EmailResponse> => {
  const response = await axiosInstance.post(
    `http://localhost:8000/ai/emails/summary`,
    { prompt, name: storage.read(LocalStorageKeys.USER_INFO).name }
  );
  return response.data.emails;
};

export function* fetchEmailSummaries() {
  try {
    yield put(InboxActions.setEmailSummariesStatus(Status.LOADING)); // Handle
    const emails: Email[] = yield select(Inboxselectors.emails); // Assuming emails are already fetched
    const emailSummaries: EmailSummary[] = yield call(
      getEmailSummaryAPI,
      emails
    );
    yield put(InboxActions.setEmailSummaries(emailSummaries)); // Assuming you have this action to update the state
    yield put(InboxActions.setEmailSummariesStatus(Status.SUCCESS));
  } catch (error: any) {
    console.log(`error:${JSON.parse(error)}`);

    yield put(InboxActions.setEmailStatus(Status.ERROR)); // Handle the error
  }
}
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
  yield put(InboxActions.setEmailSummariesStatus(Status.INITIAL));
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
export function* previousEmailPage() {
  yield put(InboxActions.setEmailSummariesStatus(Status.INITIAL));
  while (true) {
    try {
      yield put(InboxActions.setEmailStatus(Status.LOADING));
      const lastPageTokens: string[] = yield select(
        Inboxselectors.lastPageTokens
      );
      if (lastPageTokens.length === 0) {
        yield put(InboxActions.setEmailStatus(Status.SUCCESS));
        break;
      }
      const previousPageToken: string =
        lastPageTokens[lastPageTokens.length - 2];
      const { emails, nextPageToken }: EmailResponse = !previousPageToken
        ? yield call(fetchEmails)
        : yield call(fetchEmails, previousPageToken);
      yield put(InboxActions.setEmails(emails));
      yield put(InboxActions.setNextPageToken(nextPageToken));
      yield put(InboxActions.removePrevPageToken());
      yield put(InboxActions.setEmailStatus(Status.SUCCESS));
      break;
    } catch (error: any) {
      if (error.message === "Request failed with status code 500") {
        yield delay(4000);
      } else {
        yield put(InboxActions.setEmailStatus(Status.ERROR));
        break;
      }
    }
  }
}

export function* inboxSaga() {
  yield takeLatest(InboxActions.getEmails.type, getEmails);
  yield takeLatest(InboxActions.nextEmailPage.type, nextEmailPage);
  yield takeLatest(InboxActions.previousEmailPage.type, previousEmailPage);
  yield takeLatest(InboxActions.fetchEmailSummaries.type, fetchEmailSummaries);
}
