import { Status } from "app/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ROW_ALIGN_START__JUSTIFY_CENTER } from "styles/globalStyles";
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
    <AnswersWrapper ref={popupRef}>
      <AnimatePresence>
        {positiveAnswerStatus !== Status.INITIAL && showPopup && (
          <Popup
            style={{ height: "100%" }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {chunk}
              </ResponseChunk>
            ))}
          </Popup>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {negativeAnswerStatus !== Status.INITIAL && showPopup && (
          <Popup
            style={{ height: "100%" }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {chunk}
              </ResponseChunk>
            ))}
          </Popup>
        )}
      </AnimatePresence>
    </AnswersWrapper>
  );
};

const AnswersWrapper = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_CENTER}
  gap:24px;
  width: 100%;
  padding: 10px;
  position: static;
  background: white;
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

const Popup = styled(motion.div)`
  width: 80%;
  max-width: 500px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  height: 100%;
`;
