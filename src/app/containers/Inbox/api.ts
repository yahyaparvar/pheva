import axios, { AxiosResponse } from "axios";
import { Email, FetchEmailsResponse } from "./types";

// Fetch emails from Gmail API
export const fetchEmails = async (
  accessToken: string
): Promise<FetchEmailsResponse> => {
  const response: AxiosResponse<FetchEmailsResponse> =
    await axios.get<FetchEmailsResponse>(
      "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  return response.data;
};

// Helper function to parse multipart response
const parseMultipartResponse = (response: string): any[] => {
  const boundaryMatch = response.match(/--batch_\w+/);
  if (!boundaryMatch) {
    throw new Error("Unable to find boundary in response");
  }
  const boundary = boundaryMatch[0];
  const parts = response.split(boundary).slice(1, -1);
  return parts
    .map((part) => {
      const [headers, ...bodyParts] = part.split("\r\n\r\n").slice(1);
      const body = bodyParts.join("\r\n\r\n").trim();
      if (!body) {
        return null;
      }
      try {
        return JSON.parse(body);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    })
    .filter((part) => part !== null);
};

// Fetch email details in batch from Gmail API
export const fetchBatchEmailDetails = async (
  accessToken: string,
  emailIds: string[]
): Promise<Email[]> => {
  const boundary = "batch_boundary";

  const body =
    emailIds
      .map((id) => {
        return [
          `--${boundary}`,
          "Content-Type: application/http",
          "",
          `GET /gmail/v1/users/me/messages/${id}`,
          "",
        ].join("\r\n");
      })
      .join("\r\n") + `\r\n--${boundary}--`;

  const response: AxiosResponse<any> = await axios.post(
    "https://www.googleapis.com/batch/gmail/v1",
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/mixed; boundary=${boundary}`,
      },
    }
  );

  // Log the raw response for debugging
  const rawResponse = response.data;
  console.log("Raw batch response:", rawResponse);

  // Parse the raw response and extract email details
  const emailDetails = parseMultipartResponse(rawResponse);

  return emailDetails;
};
// front fetching

// import { call, put, takeLatest } from "redux-saga/effects";
// import { LocalStorageKeys, storage } from "store/storage";
// import { fetchBatchEmailDetails, fetchEmails } from "./api";
// import { InboxActions } from "./slice";
// import { Email, FetchEmailsResponse } from "./types";

// export function* getEmails() {
//   try {
//     // Get access token from local storage
//     const accessToken: string | undefined = storage.read(
//       LocalStorageKeys.USER_INFO
//     )?.access_token;
//     if (!accessToken) {
//       yield put(InboxActions.getEmailsFailure("No access-token Found!"));
//       return;
//     }

//     // Fetch emails from Gmail API
//     const { messages }: FetchEmailsResponse = yield call(
//       fetchEmails,
//       accessToken
//     );

//     // Extract email IDs from messages
//     const emailIds: string[] = messages.map((message) => message.id);

//     // Fetch email details in batch
//     const emailDetails: Email[] = yield call(
//       fetchBatchEmailDetails,
//       accessToken,
//       emailIds
//     );
//     console.log("Email details:", emailDetails);

//     if (emailDetails.length === 0) {
//       console.error("No email details found.");
//     }

//     yield put(InboxActions.getEmailsSuccess(emailDetails));
//   } catch (error: any) {
//     console.error("Error fetching emails:", error);
//     yield put(InboxActions.getEmailsFailure(error.message));
//   }
// }

// export function* inboxSaga() {
//   yield takeLatest(InboxActions.getEmails.type, getEmails);
// }
