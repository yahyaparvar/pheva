import { Status } from "app/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { ROW } from "styles/globalStyles";
import { EmailDetailselectors } from "../../selectors";

export const Answers = () => {
  const negativeAnswerStreamText = useSelector(
    EmailDetailselectors.negativeAnswer
  );
  const negativeAnswerStatus = useSelector(
    EmailDetailselectors.negativeAnswerStatus
  );
  const positiveAnswerStreamText = useSelector(
    EmailDetailselectors.positiveAnswer
  );
  const positiveAnswerStatus = useSelector(
    EmailDetailselectors.positiveAnswerStatus
  );
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = React.useState(false);

  useEffect(() => {
    if (
      positiveAnswerStatus !== Status.INITIAL &&
      negativeAnswerStatus !== Status.INITIAL
    ) {
      setShowPopup(true);
    }
  }, [positiveAnswerStatus, negativeAnswerStatus]);

  return (
    <AnswersWrapper
      ref={popupRef}
      isEmpty={
        positiveAnswerStatus === Status.INITIAL &&
        negativeAnswerStatus === Status.INITIAL
      }
    >
      <AnimatePresence>
        {positiveAnswerStatus !== Status.INITIAL && showPopup && (
          <PositivePopup
            key="popup"
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: 100,
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
          >
            {positiveAnswerStreamText.map((chunk, index) => (
              <ResponseChunk
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {chunk}
              </ResponseChunk>
            ))}
          </PositivePopup>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {negativeAnswerStatus !== Status.INITIAL && showPopup && (
          <NegativePopup
            key="popup2"
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: 100,
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
          >
            {negativeAnswerStreamText.map((chunk, index) => (
              <ResponseChunk
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {chunk}
              </ResponseChunk>
            ))}
          </NegativePopup>
        )}
      </AnimatePresence>
    </AnswersWrapper>
  );
};

const AnswersWrapper = styled.div<{ isEmpty: boolean }>`
  ${ROW}
  justify-content:center;
  padding: 15px 10px;
  ${({ isEmpty }) =>
    isEmpty &&
    css`
      display: none;
    `}
  position: relative;
  background: var(--dark-gray);
  gap: 24px;
  overflow: hidden;
`;

const ResponseChunk = styled(motion.div)`
  display: inline-block;
  hyphens: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 5px;
  text-align: justify;
`;

const NegativePopup = styled(motion.div)`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 500px;
  background: var(--dark-gray);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto;
  cursor: pointer;
  transition: background 0.2s;
  &:before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 14px; /* Same border-radius as Popup plus border width */
    background: linear-gradient(to right, #d32f2f, #bc6413);
    z-index: -1;
    padding: 6px; /* Border width */
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  &:hover {
    background-color: var(--dark-gray-hover);
  }
`;
const PositivePopup = styled(motion.div)`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 500px;
  background: var(--dark-gray);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto;
  cursor: pointer;

  transition: background 0.2s;
  &:before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 14px; /* Same border-radius as Popup plus border width */
    background: linear-gradient(to right, #139ebc, #1ecd3a);
    z-index: -1;
    padding: 6px; /* Border width */
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  &:hover {
    background-color: var(--dark-gray-hover);
  }
`;
