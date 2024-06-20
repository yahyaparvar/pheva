import { Button } from "app/components/buttons";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ROW_ALIGN_START__JUSTIFY_CENTER } from "styles/globalStyles";
import { EmailDetailselectors } from "../../selectors";
import { emailDetailActions } from "../../slice";

const Container = styled.div`
  ${ROW_ALIGN_START__JUSTIFY_CENTER}
`;

const AnswerButton: React.FC = () => {
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
  const summaryStatus = useSelector(EmailDetailselectors.summaryStatus);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const handleSendPrompt = async () => {
    setShowPopup(true);
    dispatch(emailDetailActions.getNegativeAnswer());
    dispatch(emailDetailActions.getPositiveAnswer());
  };
  const handleClosePopup = () => {
    dispatch(emailDetailActions.clearNegativeAnswerResponse());
    dispatch(emailDetailActions.clearPositiveAnswerResponse());
    setShowPopup(false);
  };

  return (
    <Container>
      <Button onClick={handleSendPrompt}>Answer</Button>
    </Container>
  );
};

export default AnswerButton;

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
//
//
//
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
