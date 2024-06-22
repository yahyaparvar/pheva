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
const Header = styled.h2`
  font-size: 24px;
  color: #333;
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
  margin-top: 20px;
  width: 100%;
  padding: 0 80px;
  margin: 0 auto;
`;

const EmailPartContainer = styled.div`
  ${COLUMN_CENTER}
  margin-bottom: 10px;
  width: 100%;
  * {
    color: #a2a2a2;
  }
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
export function EmailDetail(props: Props) {
  useInboxSlice();
  useInjectReducer({ key: sliceKey, reducer: emailDetailReducer });
  useInjectSaga({ key: sliceKey, saga: emailDetailSaga });
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const email = useSelector(EmailDetailselectors.emailDetail);
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
  const extractTextFromHTML = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const textContent = tmp.textContent || tmp.innerText || "";
    return textContent.replace(/\s+/g, " ").trim();
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
        <EmailContent style={{ width: "100%", background: "transparent" }}>
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

  const renderEmailContent = () => {
    const renderPart = (part: any) => {
      if (part.mimeType === "text/html") {
        dispatch(
          emailDetailActions.setTextFromHTML(
            DOMPurify.sanitize(decodeBase64(part.body.data))
          )
        );

        return (
          <div>{parse(DOMPurify.sanitize(decodeBase64(part.body.data)))}</div>
        );
      }
      if (part.parts) {
        dispatch(
          emailDetailActions.setTextFromHTML(decodeBase64(part.body.data))
        );
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
