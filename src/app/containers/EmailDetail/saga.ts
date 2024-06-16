import { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "app/types";
import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import axiosInstance from "service/apiClient";
import { Inboxselectors } from "../Inbox/selectors";
import { InboxActions } from "../Inbox/slice";
import { Email } from "../Inbox/types";
import { emailDetailActions } from "./slice";
import { EmailDetailselectors } from "./selectors";
import { EmailDetails } from "./types";

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
export function* markAsRead(action: PayloadAction<string>) {
  const emailDetailStatus: Status = yield select(EmailDetailselectors.status);
  const emailDetail: EmailDetails = yield select(
    EmailDetailselectors.emailDetail
  );

  if (emailDetailStatus === Status.SUCCESS) {
    if (emailDetail.labelIds.includes("UNREAD")) {
      const emailId = action.payload;
      const emails: Email[] = yield select(Inboxselectors.emails);

      try {
        const response: AxiosResponse = yield call(
          axiosInstance.get,
          `/emails/email/${emailId}/read`
        );

        if (response.status === 200) {
          const updatedEmails = emails.map((email) =>
            email.id === emailId
              ? {
                  ...email,
                  labels: email.labels.filter((label) => label !== "UNREAD"),
                }
              : email
          );

          yield put(InboxActions.setEmails(updatedEmails));
        }
      } catch (error) {
        console.error("Failed to mark email as read", error);
      }
    }
  }
}

export function* emailDetailSaga() {
  yield takeLatest(emailDetailActions.getEmailData.type, getEmailData);
  yield takeLatest(emailDetailActions.markAsRead.type, markAsRead);
}
