import { Status } from "app/types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { LocalStorageKeys, storage } from "store/storage";
import { useInboxSlice } from "../Inbox/slice";
import { customDateFormat } from "../Inbox/types";
import { Answers } from "./components/answer/answers";
import AnswerButton from "./components/answer/button";
import Editor from "./components/editor/editor";
import EmailDetailsSummary from "./components/summary";
import { emailDetailSaga } from "./saga";
import { EmailDetailselectors } from "./selectors";
import { emailDetailActions, emailDetailReducer, sliceKey } from "./slice";
import {
  AiActions,
  Container,
  EditorContainer,
  EmailContent,
  EmailField,
  EmailHeaderDiv,
  EmailInfo,
  EmailPartContainer,
  EmailPartTextContainer,
  EmailTitle,
  ProfileImage,
  SendToAndDate,
  ThreadDivider,
  ThreadImageAndEmail,
  ThreadInfo,
  Wrapper,
} from "./styles";
import { EmailHeader, decodeBase64, timeDifference } from "./types";

interface Props {}

export function EmailDetail(props: Props) {
  useInboxSlice();
  useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
  useInjectSaga({ key: sliceKey, saga: emailDetailSaga });
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const email = useSelector(EmailDetailselectors.emailDetail);
  const threadMessages = useSelector(EmailDetailselectors.threadMessages);
  const emailDetailStatus = useSelector(EmailDetailselectors.status);

  useEffect(() => {
    if (id) {
      dispatch(emailDetailActions.getEmailData(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(emailDetailActions.markAsRead(id));
    }
  }, [id, dispatch, emailDetailStatus]);

  useEffect(() => {
    return () => {
      dispatch(emailDetailActions.clearSummaryResponse());
      dispatch(emailDetailActions.clearPositiveAnswerResponse());
      dispatch(emailDetailActions.clearNegativeAnswerResponse());
    };
  }, []);

  if (emailDetailStatus === Status.LOADING) {
    return (
      <Container>
        <Skeleton height={20} width={700} style={{ margin: "20px 0 0 70px" }} />
        <EmailInfo style={{ padding: "0px 20px 20px 20px" }}>
          <Skeleton
            circle={true}
            height={35}
            width={35}
            style={{ marginRight: 15 }}
          />
          <div style={{ width: "100%" }}>
            <EmailField>
              <Skeleton height={15} width={150} />
            </EmailField>
            <SendToAndDate>
              <EmailField>
                <Skeleton height={15} width={300} />
              </EmailField>
              <EmailField>
                <Skeleton height={15} width={200} />
              </EmailField>
            </SendToAndDate>
          </div>
        </EmailInfo>
        <EmailContent style={{ background: "transparent" }}>
          <Skeleton
            height={"100vh"}
            width={"100%"}
            style={{ marginBottom: 10 }}
          />
        </EmailContent>
      </Container>
    );
  }
  if (!email) {
    return <div>Loading...</div>;
  }

  const renderPart = (part: any) => {
    const decodedData = decodeBase64(part.body.data);
    if (part.mimeType === "text/html") {
      const sanitizedHtml = DOMPurify.sanitize(decodedData);
      dispatch(emailDetailActions.setTextFromHTML(sanitizedHtml));
      return <div>{parse(sanitizedHtml)}</div>;
    }
    if (part.parts) {
      return part.parts.map((subPart: any, index: number) => (
        <div key={index}>{renderPart(subPart)}</div>
      ));
    }
    return null;
  };
  const renderEmailContent = () => {
    if (email.payload.parts) {
      return email.payload.parts.map((part: any, index: number) => (
        <EmailPartContainer key={index}>{renderPart(part)}</EmailPartContainer>
      ));
    } else if (email.payload.body && email.payload.body.data) {
      const decodedData = decodeBase64(email.payload.body.data);
      const sanitizedHtml = DOMPurify.sanitize(decodedData);
      dispatch(emailDetailActions.setTextFromHTML(sanitizedHtml));
      return (
        <EmailPartTextContainer>{parse(sanitizedHtml)}</EmailPartTextContainer>
      );
    }
    return <div>No content available</div>;
  };
  const renderEmailThreadContent = () => {
    return (
      threadMessages &&
      threadMessages.map((threadEmail, index) => (
        <EmailContent key={index}>
          {index !== 0 && <ThreadDivider />}
          <ThreadInfo>
            <ThreadImageAndEmail>
              <ProfileImage
                src={
                  threadEmail.payload.headers.find(
                    (header: EmailHeader) => header.name === "From"
                  )?.value === storage.read(LocalStorageKeys.USER_INFO)?.email
                    ? storage.read(LocalStorageKeys.USER_INFO).picture
                    : "https://lh3.googleusercontent.com/a/default-user=s80-p"
                }
                alt="Profile"
              />
              <EmailField>
                <strong>
                  {
                    threadEmail.payload.headers.find(
                      (header: EmailHeader) => header.name === "From"
                    )?.value
                  }
                </strong>
              </EmailField>
            </ThreadImageAndEmail>
            <EmailField style={{ marginRight: "24px" }}>
              {customDateFormat(
                threadEmail.payload.headers.find(
                  (header: EmailHeader) => header.name === "Date"
                )?.value as string
              )}{" "}
              {"("}
              {timeDifference(
                threadEmail.payload.headers.find(
                  (header: EmailHeader) => header.name === "Date"
                )?.value as string
              )}
              {")"}
            </EmailField>
          </ThreadInfo>
          {threadEmail.payload.parts ? (
            threadEmail.payload.parts.map((part: any, partIndex: number) => (
              <EmailPartContainer key={partIndex}>
                {renderPart(part)}
              </EmailPartContainer>
            ))
          ) : threadEmail.payload.body && threadEmail.payload.body.data ? (
            <EmailPartTextContainer>
              {parse(
                DOMPurify.sanitize(decodeBase64(threadEmail.payload.body.data))
              )}
            </EmailPartTextContainer>
          ) : (
            <div>No content available</div>
          )}
        </EmailContent>
      ))
    );
  };

  return (
    <Wrapper>
      <Container>
        <EmailHeaderDiv>
          <EmailTitle>
            {
              email.payload.headers.find(
                (header: EmailHeader) => header.name === "Subject"
              )?.value
            }
          </EmailTitle>
          <EmailInfo>
            <ProfileImage
              src={"https://lh3.googleusercontent.com/a/default-user=s80-p"}
              alt="Profile"
            />
            <div style={{ width: "100%" }}>
              <EmailField>
                {email.payload.headers.find(
                  (header: EmailHeader) => header.name === "From"
                )?.value || ""}
              </EmailField>
              <SendToAndDate>
                <EmailField>
                  To {""}
                  {"<" +
                    email.payload.headers.find(
                      (header: EmailHeader) => header.name === "To"
                    )?.value +
                    ">" || ""}
                </EmailField>
                <EmailField style={{ marginRight: "24px" }}>
                  {customDateFormat(
                    email.payload.headers.find(
                      (header: EmailHeader) => header.name === "Date"
                    )?.value as string
                  )}{" "}
                  {"("}
                  {timeDifference(
                    email.payload.headers.find(
                      (header: EmailHeader) => header.name === "Date"
                    )?.value as string
                  )}
                  {")"}
                </EmailField>
              </SendToAndDate>
            </div>
          </EmailInfo>
        </EmailHeaderDiv>
        <EmailContent>{renderEmailContent()}</EmailContent>
        {threadMessages && threadMessages?.length > 0 ? (
          <EmailContent>{renderEmailThreadContent()}</EmailContent>
        ) : (
          ""
        )}
      </Container>
      <EditorContainer
        initial={{ y: "100%" }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1,
          type: "just",
          stiffness: 50,
          damping: 15,
          duration: 0.5,
        }}
      >
        <AiActions
          initial={{ y: "100%", opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 2,
            type: "tween",
            duration: 0.3,
          }}
        >
          <EmailDetailsSummary />
          <AnswerButton />
        </AiActions>
        <Answers />
        <Editor />
      </EditorContainer>
    </Wrapper>
  );
}
