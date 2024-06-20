import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Button } from "app/components/buttons";
import { Status } from "app/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useOnClickOutside } from "usehooks-ts";
import { EmailDetailselectors } from "../../selectors";
import { emailDetailActions, useemailDetailSlice } from "../../slice";
const Container = styled(motion.div)``;

const SummaryAndButtonWrapper = styled.div`
  position: relative;
  width: fit-content;
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
  position: absolute;
  bottom: 100%;
  left: 100%;
  width: 500px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto;
`;

const EmailDetailSummary: React.FC = () => {
  useemailDetailSlice();
  const summaryStreamText = useSelector(EmailDetailselectors.summaryStreamText);
  const summaryStatus = useSelector(EmailDetailselectors.summaryStatus);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const handleSendPrompt = async () => {
    setShowPopup(true);
    dispatch(emailDetailActions.getSummary());
  };

  const handleClosePopup = () => {
    dispatch(emailDetailActions.clearSummaryResponse());
    setShowPopup(false);
  };

  useOnClickOutside(popupRef, handleClosePopup);

  return (
    <Container>
      <SummaryAndButtonWrapper>
        <Button
          loading={summaryStatus === Status.LOADING}
          rightIcon={<TipsAndUpdatesIcon />}
          disabled={summaryStatus === Status.LOADING}
          onClick={
            summaryStatus === Status.INITIAL || summaryStatus === Status.SUCCESS
              ? handleSendPrompt
              : () => {}
          }
        >
          Summarize
        </Button>
        {summaryStatus !== Status.INITIAL && showPopup && (
          <AnimatePresence>
            <Popup
              ref={popupRef}
              key="popup"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {summaryStreamText.map((chunk, index) => (
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
          </AnimatePresence>
        )}
      </SummaryAndButtonWrapper>
    </Container>
  );
};

export default EmailDetailSummary;
//
//
//
//
//
// key={index}
// initial={{ opacity: 0, filter: "blur(10px)" }}
// animate={{ opacity: 1, filter: "blur(0px)" }}
// transition={{ duration: 0.5, delay: index * 0.1 }}
// style={{
//  display: "inline-block"
// display: "inline-block",
// hyphens: "auto",
// overflowWrap: "break-word",
// whiteSpace: "pre-wrap",
// wordBreak: "break-word",
// }}
//
//
//
// key={index}
// initial={{ opacity: 0, scale: 0.5 }}
// animate={{ opacity: 1, scale: 1 }}
// transition={{
//   type: "spring",
//   stiffness: 300,
//   damping: 20,
//   delay: index * 0.1,
// }}
// style={{
//  display: "inline-block"
// display: "inline-block",
// hyphens: "auto",
// overflowWrap: "break-word",
// whiteSpace: "pre-wrap",
// wordBreak: "break-word",
// }}
