/* --- STATE --- */
export interface Email {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    partId: string;
    mimeType: string;
    filename: string;
    headers: {
      name: string;
      value: string;
    }[];
    body: {
      size: number;
    };
    parts: {
      partId: string;
      mimeType: string;
      filename: string;
      headers: {
        name: string;
        value: string;
      }[];
      body: {
        size: number;
        data?: string;
      };
      parts?: {
        partId: string;
        mimeType: string;
        filename: string;
        headers: {
          name: string;
          value: string;
        }[];
        body: {
          size: number;
          data?: string;
        };
      }[];
    }[];
  };
}
export interface FetchEmailsResponse {
  messages: { id: string; threadId: string }[];
}

export interface InboxState {
  emails: Email[];
  loading: boolean;
  error: string | null;
}

export type ContainerState = InboxState;
