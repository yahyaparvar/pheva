import { Status } from "app/types";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { LocalStorageKeys, storage } from "store/storage";
import styled from "styled-components";
import {
  COLUMN_ALIGN_START__JUSTIFY_CENTER,
  COLUMN_CENTER,
  ROW_ALIGN_CENTER__SPACE_B,
  ROW_ALIGN_START__JUSTIFY_START,
} from "styles/globalStyles";
import { useInboxSlice } from "../Inbox/slice";
import { customDateFormat } from "../Inbox/types";
import { Answers } from "./components/answer/answers";
import AnswerButton from "./components/answer/button";
import Editor from "./components/editor/editor";
import EmailDetailsSummary from "./components/summary";
import { emailDetailSaga } from "./saga";
import { EmailDetailselectors } from "./selectors";
import { emailDetailActions, emailDetailReducer, sliceKey } from "./slice";
import { EmailHeader, timeDifference } from "./types";

interface Props {}
const Container = styled.div`
  padding-bottom: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
`;

const Wrapper = styled.div`
  ${COLUMN_CENTER}
  min-height:100vh;
  background-color: var(--background);
  position: relative;
`;

const EmailInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const EmailTitle = styled.h3`
  font-size: 20px;
  color: var(--text);
  font-weight: 600;
  margin: 7px 0;
  margin-top: 4px;
  margin-left: 48px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 700px;
`;

const EmailField = styled.p`
  font-size: 13px;
  margin: 4px 0;
  color: var(--text);
  strong {
    color: var(--text);
    margin-right: 12px;
  }
`;

const EmailContent = styled.div`
  box-sizing: border-box !important;
  width: 97%;
  margin: 0 auto;
  margin-top: 24px;
  background-color: #747171;
  padding: 12px;
  border-radius: 8px;
  * {
    color: unset;
  }
`;

const EmailPartContainer = styled.div`
  ${COLUMN_CENTER}
  margin-bottom: 10px;
  width: 100%;
`;
const EmailPartTextContainer = styled.div`
  ${COLUMN_ALIGN_START__JUSTIFY_CENTER}
  margin-bottom: 10px;
  width: 100%;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  margin-right: 15px;
  width: 35px;
  height: 35px;
`;
const SendToAndDate = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
`;
const AiActions = styled(motion.div)`
  ${ROW_ALIGN_START__JUSTIFY_START}
  gap:8px;
  padding: 14px;
`;
const EditorContainer = styled(motion.div)`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
`;
const EmailHeaderDiv = styled.div`
  box-sizing: border-box;
  background: var(--dark-gray);
  padding: 5px 20px 3px 20px;
`;

const ThreadInfo = styled.div`
  ${ROW_ALIGN_CENTER__SPACE_B}
`;
const ThreadImageAndEmail = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_START}
`;
const ThreadDivider = styled.div`
  height: 1px;
  width: 100%;
  margin-bottom: 24px;
  background-color: var(--background);
`;
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
                <strong>
                  {
                    email.payload.headers
                      .find((header: EmailHeader) => header.name === "From")
                      ?.value.split(/<(.+)>/)[0]
                  }
                </strong>
                {`<`}
                {
                  email.payload.headers
                    .find((header: EmailHeader) => header.name === "From")
                    ?.value.split(/<(.+)>/)[1]
                }
                {`>`}
              </EmailField>
              <SendToAndDate>
                <EmailField>
                  To {"<"}
                  {storage.read(LocalStorageKeys.USER_INFO)?.email}
                  {">"}
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
