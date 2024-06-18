import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        width: "100%",
      }}
    >
      <h1>OpenAI Streaming Response</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <br />
      <button onClick={handleSendPrompt}>Send Prompt</button>
      <h2>Response:</h2>
      <div
        style={{
          whiteSpace: "pre-wrap",
          border: "1px solid #ddd",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        <AnimatePresence>
          {response.map((chunk, index) => (
            <motion.div
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
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                display: "inline-block",
                hyphens: "auto",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
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
            >
              {chunk}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
