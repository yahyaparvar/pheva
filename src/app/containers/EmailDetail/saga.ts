import { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "app/types";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import axiosInstance from "service/apiClient";
import { LocalStorageKeys, storage } from "store/storage";
import { Inboxselectors } from "../Inbox/selectors";
import { InboxActions } from "../Inbox/slice";
import { Email } from "../Inbox/types";
import { EmailDetailselectors } from "./selectors";
import { emailDetailActions } from "./slice";
import { EmailDetails, EmailHeader } from "./types";

export function* getEmailData(action: PayloadAction<string>) {
  try {
    yield put(emailDetailActions.setStatus(Status.LOADING));
    const response: AxiosResponse = yield axiosInstance.get(
      `emails/email/${action.payload}`
    );
    yield put(
      emailDetailActions.setEmailData({
        ...response.data.emailDetails,
        threadMessages: response.data.threadMessages,
      })
    );
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

function* getSummary(action: PayloadAction<string>) {
  const emailRawText: string = yield select(EmailDetailselectors.textFromHTML);
  console.log(emailRawText);

  try {
    yield put(emailDetailActions.clearSummaryResponse());
    yield put(emailDetailActions.setSummaryStatus(Status.LOADING));

    const responseStream: Response = yield call(
      fetch,
      "http://localhost:8000/ai/emailsDetails/summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: emailRawText }),
      }
    );

    const reader = responseStream?.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = yield reader?.read()!;
      if (readerDone) {
        done = true;
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      if (chunk.includes("##END##")) {
        yield put(emailDetailActions.setSummary(chunk.replace("##END##", "")));
        done = true;
      } else {
        yield put(emailDetailActions.setSummary(chunk));
      }
    }

    yield put(emailDetailActions.setSummaryStatus(Status.SUCCESS));
  } catch (error) {
    console.error("Failed to get summary", error);
    yield put(emailDetailActions.setSummaryStatus(Status.ERROR));
  }
}

export function* getNegativeAnswer() {
  const emailRawText: string = yield select(EmailDetailselectors.textFromHTML);
  try {
    yield put(emailDetailActions.clearNegativeAnswerResponse());
    yield put(emailDetailActions.setNegativeAnswerStatus(Status.LOADING));
    const responseStream: Response = yield call(
      fetch,
      "http://localhost:8000/ai/emailsDetails/negativeAnswer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: emailRawText }),
      }
    );
    const reader = responseStream?.body?.getReader();
    const decoder = new TextDecoder();
    let done = false; // Set to true when the stream is done

    while (!done) {
      const { value, done: readerDone } = yield reader?.read()!;
      if (readerDone) {
        done = true;
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      if (chunk.includes("##END##")) {
        yield put(
          emailDetailActions.setNegativeAnswer(chunk.replace("##END##", ""))
        );
        done = true;
      } else {
        yield put(emailDetailActions.setNegativeAnswer(chunk));
      }
    }

    yield put(emailDetailActions.setNegativeAnswerStatus(Status.SUCCESS));
  } catch (error) {
    console.error("Failed to get negative answer", error);
    yield put(emailDetailActions.setNegativeAnswerStatus(Status.ERROR));
  }
}

export function* getPositiveAnswer() {
  const emailRawText: string = yield select(EmailDetailselectors.textFromHTML);
  try {
    yield put(emailDetailActions.clearPositiveAnswerResponse());
    yield put(emailDetailActions.setPositiveAnswerStatus(Status.LOADING));
    const responseStream: Response = yield call(
      fetch,
      "http://localhost:8000/ai/emailsDetails/positiveAnswer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: emailRawText }),
      }
    );
    const reader = responseStream?.body?.getReader();
    const decoder = new TextDecoder();
    let done = false; // Set to true when the stream is done

    while (!done) {
      const { value, done: readerDone } = yield reader?.read()!;
      if (readerDone) {
        done = true;
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      if (chunk.includes("##END##")) {
        yield put(
          emailDetailActions.setPositiveAnswer(chunk.replace("##END##", ""))
        );
        done = true;
      } else {
        yield put(emailDetailActions.setPositiveAnswer(chunk));
      }
    }

    yield put(emailDetailActions.setPositiveAnswerStatus(Status.SUCCESS));
  } catch (error) {
    console.error("Failed to get positive answer", error);
    yield put(emailDetailActions.setPositiveAnswerStatus(Status.ERROR));
  }
}

export function* replyToEmail(action: PayloadAction<string>) {
  yield put(emailDetailActions.setReplySendStatus(Status.LOADING));

  try {
    const emailDetails: EmailDetails = yield select(
      EmailDetailselectors.emailDetail
    );

    const toHeader = emailDetails.payload.headers.find(
      (header: EmailHeader) => header.name === "From"
    );
    const subjectHeader = emailDetails.payload.headers.find(
      (header: EmailHeader) => header.name === "Subject"
    );

    if (!toHeader || !subjectHeader) {
      console.error("Required email headers missing");
      return;
    }

    const toEmail = toHeader.value.split(/<(.+)>/)[1];
    const fromEmail = storage.read(LocalStorageKeys.USER_INFO)?.email;
    const subject = `Re: ${subjectHeader.value}`;

    if (!fromEmail) {
      console.error("Sender email not found in local storage");
      return;
    }

    const response: AxiosResponse = yield call(
      axiosInstance.post,
      `emails/send/reply`,
      {
        to: toEmail,
        from: fromEmail,
        subject: subject,
        message: action.payload,
        threadId: emailDetails.threadId,
        messageId: emailDetails.id,
      }
    );

    if (response.status === 200) {
      yield put(emailDetailActions.setReplySendStatus(Status.LOADING));
      toast.success("Email sent!");
      yield put(emailDetailActions.setReplySendStatus(Status.SUCCESS));
      yield delay(3000);
      window.location.reload();
    } else {
      yield put(emailDetailActions.setReplySendStatus(Status.ERROR));
    }
  } catch (error) {
    yield put(emailDetailActions.setReplySendStatus(Status.ERROR));
  }
}
export function* emailDetailSaga() {
  yield takeLatest(emailDetailActions.getEmailData.type, getEmailData);
  yield takeLatest(emailDetailActions.markAsRead.type, markAsRead);
  yield takeLatest(emailDetailActions.getSummary.type, getSummary);
  yield takeLatest(emailDetailActions.replyToEmail.type, replyToEmail);
  yield takeLatest(
    emailDetailActions.getNegativeAnswer.type,
    getNegativeAnswer
  );
  yield takeLatest(
    emailDetailActions.getPositiveAnswer.type,
    getPositiveAnswer
  );
}
