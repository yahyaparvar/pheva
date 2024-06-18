import React, { useState } from "react";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSendPrompt = async () => {
    setResponse("");

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
        setResponse((prev) => prev + chunk.replace("##END##", ""));
        done = true;
      } else {
        setResponse((prev) => prev + chunk);
      }
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
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
        {response}
      </div>
    </div>
  );
};

export default App;
// import { AnimatePresence, motion } from "framer-motion";
// import React, { useState } from "react";

// const App: React.FC = () => {
//   const [prompt, setPrompt] = useState<string>("");
//   const [response, setResponse] = useState<string[]>([]);

//   const handleSendPrompt = async () => {
//     setResponse([]);

//     const responseStream = await fetch(
//       "http://localhost:8000/ai/emailsDetails/summary",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt }),
//       }
//     );

//     const reader = responseStream?.body?.getReader();
//     const decoder = new TextDecoder();
//     let done = false;

//     while (!done) {
//       const { value, done: readerDone } = await reader?.read()!;
//       if (readerDone) {
//         done = true;
//         break;
//       }
//       const chunk = decoder.decode(value, { stream: true });
//       if (chunk.includes("##END##")) {
//         setResponse((prev) => [...prev, chunk.replace("##END##", "")]);
//         done = true;
//       } else {
//         setResponse((prev) => [...prev, chunk]);
//       }
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
//       <h1>OpenAI Streaming Response</h1>
//       <textarea
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter your prompt here..."
//       />
//       <br />
//       <button onClick={handleSendPrompt}>Send Prompt</button>
//       <h2>Response:</h2>
//       <div
//         style={{
//           whiteSpace: "pre-wrap",
//           border: "1px solid #ddd",
//           padding: "10px",
//           height: "300px",
//           overflowY: "scroll",
//         }}
//       >
//         <AnimatePresence>
//           {response.map((chunk, index) => (
//               <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.5 }}
//               transition={{ duration: 0.3 }}
//               style={{ display: 'inline-block', marginRight: '5px' }} // Optional: To handle spacing between words
//             >
//               {chunk}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default App;
