import { call, put, takeLatest } from "redux-saga/effects";
import { LocalStorageKeys, storage } from "store/storage";
import { fetchBatchEmailDetails, fetchEmails } from "./api";
import { InboxActions } from "./slice";
import { Email, FetchEmailsResponse } from "./types";

export function* getEmails() {
  try {
    // Get access token from local storage
    const accessToken: string | undefined = storage.read(
      LocalStorageKeys.USER_INFO
    )?.access_token;
    if (!accessToken) {
      yield put(InboxActions.getEmailsFailure("No access-token Found!"));
      return;
    }

    // Fetch emails from Gmail API
    const { messages }: FetchEmailsResponse = yield call(
      fetchEmails,
      accessToken
    );

    // Extract email IDs from messages
    const emailIds: string[] = messages.map((message) => message.id);

    // Fetch email details in batch
    const emailDetails: Email[] = yield call(
      fetchBatchEmailDetails,
      accessToken,
      emailIds
    );
    console.log("Email details:", emailDetails);

    if (emailDetails.length === 0) {
      console.error("No email details found.");
    }

    yield put(InboxActions.getEmailsSuccess(emailDetails));
  } catch (error: any) {
    console.error("Error fetching emails:", error);
    yield put(InboxActions.getEmailsFailure(error.message));
  }
}

export function* inboxSaga() {
  yield takeLatest(InboxActions.getEmails.type, getEmails);
}
