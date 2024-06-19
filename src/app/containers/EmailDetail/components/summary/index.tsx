import { Button } from "app/components/buttons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

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
  z-index: 1002;
  overflow-y: auto;
`;

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string[]>([]);

  const handleSendPrompt = async () => {
    setResponse([]);

    const responseStream = await fetch(
      "http://localhost:8000/ai/emailsDetails/summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const reader = responseStream?.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader?.read()!;
      if (readerDone) {
        done = true;
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      if (chunk.includes("##END##")) {
        setResponse((prev) => [...prev, chunk.replace("##END##", "")]);
        done = true;
      } else {
        setResponse((prev) => [...prev, chunk]);
      }
    }
  };

  return (
    <Container>
      <SummaryAndButtonWrapper>
        <Button onClick={handleSendPrompt}>Summarize</Button>

        <AnimatePresence>
          {response.length > 0 && (
            <Popup
              key="popup"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {response.map((chunk, index) => (
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
      </SummaryAndButtonWrapper>
    </Container>
  );
};

export default App;

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
