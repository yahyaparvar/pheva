import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";
import { useInboxSlice } from "../Inbox/slice";
import Editor from "./editor";
import { emailDetailSaga } from "./saga";
import { EmailDetailselectors } from "./selectors";
import { emailDetailActions, emailDetailReducer, sliceKey } from "./slice";
import { EmailHeader } from "./types";

interface Props {}

const Container = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;
`;

const Header = styled.h2`
  font-size: 24px;
  color: #333;
`;

const EmailInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const EmailTitle = styled.h3`
  font-size: 20px;
  color: #555;
`;

const EmailField = styled.p`
  font-size: 16px;
  color: #666;
`;

const EmailSnippet = styled.p`
  font-size: 14px;
  color: #999;
`;

const EmailContent = styled.div`
  margin-top: 20px;
`;

const EmailPartContainer = styled.div`
  ${COLUMN_CENTER}
  margin-bottom: 10px;
  width: 100%;
  * {
    box-sizing: unset !important;
  }
`;

const PlainText = styled.pre`
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  margin-right: 15px;
  width: 50px;
  height: 50px;
`;

export function EmailDetail(props: Props) {
  useInboxSlice();
  useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
  useInjectSaga({ key: sliceKey, saga: emailDetailSaga });
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const email = useSelector(EmailDetailselectors.emailDetail);

  useEffect(() => {
    if (id) {
      dispatch(emailDetailActions.getEmailData(id));
      dispatch(emailDetailActions.markAsRead(id));
    }
  }, [id, dispatch]);

  const decodeBase64 = (str: string | undefined): string => {
    if (!str) return "";
    try {
      return decodeURIComponent(
        escape(window.atob(str.replace(/-/g, "+").replace(/_/g, "/")))
      );
    } catch (e) {
      console.error("Failed to decode base64 string:", e);
      return "";
    }
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  const renderEmailContent = () => {
    const renderPart = (part: any) => {
      // if (part.mimeType === "text/plain") {
      //   return <PlainText>{decodeBase64(part.body.data)}</PlainText>;
      // }
      if (part.mimeType === "text/html") {
        return (
          <div>{parse(DOMPurify.sanitize(decodeBase64(part.body.data)))}</div>
        );
      }
      if (part.parts) {
        return part.parts.map((subPart: any, index: number) => (
          <div key={index}>{renderPart(subPart)}</div>
        ));
      }
      return null;
    };

    if (email.payload.parts) {
      return email.payload.parts.map((part, index) => (
        <EmailPartContainer key={index}>{renderPart(part)}</EmailPartContainer>
      ));
    } else if (email.payload.body && email.payload.body.data) {
      return (
        <EmailPartContainer>{renderPart(email.payload)}</EmailPartContainer>
      );
    }
    return <div>No content available</div>;
  };

  return (
    <Container>
      <Header>Email Detail</Header>
      <EmailInfo>
        <ProfileImage
          src={"https://lh3.googleusercontent.com/a/default-user=s80-p"}
          alt="Profile"
        />
        <div>
          <EmailTitle>
            Subject:{" "}
            {
              email.payload.headers.find(
                (header: EmailHeader) => header.name === "Subject"
              )?.value
            }
          </EmailTitle>
          <EmailField>
            From:{" "}
            {
              email.payload.headers.find(
                (header: EmailHeader) => header.name === "From"
              )?.value
            }
          </EmailField>
          <EmailField>
            To:{" "}
            {
              email.payload.headers.find(
                (header: EmailHeader) => header.name === "To"
              )?.value
            }
          </EmailField>
          <EmailField>
            Date:{" "}
            {
              email.payload.headers.find(
                (header: EmailHeader) => header.name === "Date"
              )?.value
            }
          </EmailField>
          <EmailSnippet>Snippet: {email.snippet}</EmailSnippet>
        </div>
      </EmailInfo>
      <EmailContent>
        <EmailTitle>Email Content</EmailTitle>
        {renderEmailContent()}
      </EmailContent>
      <Editor />
    </Container>
  );
}
