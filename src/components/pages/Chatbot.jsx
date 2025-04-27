import React, { useState } from "react";
import { postChatQuery } from "../../services/AqiService"; // Import the service function

const Chatbot = ({ closeChatbot }) => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi! I am Aira, your AirSphere Assistant. 🌬️ I'm happy to help! Ask me any query about air quality, predictions, or anything else.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // State for chat window size

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    setTyping(true);

    try {
      const botResponse = await postChatQuery(input);

      const botMessage = { role: "bot", content: botResponse };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setTyping(false);
      }, 1000); // Simulate delay for typing dots
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Sorry, something went wrong!" },
      ]);
      setTyping(false);
    }

    setInput("");
  };

  const toggleChatWindow = () => {
    setIsExpanded(!isExpanded); // Toggle the chat window size
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: isExpanded ? "350px" : "200px", // Resize based on state
        height: isExpanded ? "500px" : "300px", // Resize based on state
        backgroundColor: "#FAF3E0", // Almond white background for the chatbot body
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        overflow: "hidden",
        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", // Standard font
      }}
    >
      <div
        style={{
          padding: "10px",
          background: "linear-gradient(90deg, #182848, black)", // Chatbot header with the gradient
          color: "#fff",
          textAlign: "center",
        }}
      >
        <strong>Aira - Your AirSphere Assistant</strong>
        <span
          style={{ float: "right", cursor: "pointer", color: "#fff" }}
          onClick={closeChatbot}
        >
          ✖
        </span>
        <span
          style={{
            float: "left",
            cursor: "pointer",
            color: "#fff",
            fontSize: "18px",
          }}
          onClick={toggleChatWindow}
        >
          {isExpanded ? "🔽" : "🔼"} {/* Toggle icon */}
        </span>
      </div>
      <div style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              background: msg.role === "user" ? "#E0E0E0" : "#FFFFFF", // User in light gray, bot in white
              color: msg.role === "user" ? "#000" : "#333",
              padding: "10px",
              borderRadius: "10px",
              margin: "5px 0",
            }}
          >
            {msg.content}
          </p>
        ))}
        {typing && (
          <p
            style={{
              textAlign: "left",
              background: "#FFFFFF",
              color: "#333",
              padding: "10px",
              borderRadius: "10px",
              margin: "5px 0",
              fontStyle: "italic",
            }}
          >
            Typing...
          </p>
        )}
      </div>
      <div style={{ display: "flex", padding: "5px", borderTop: "1px solid #ddd" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px 0 0 5px",
            outline: "none",
          }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#182848", // Dark blue button color
            color: "#fff",
            border: "none",
            borderRadius: "0 5px 5px 0",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

// import React, { useState, useEffect } from "react";
// import { postChatQuery } from "../../services/AqiService"; // Import the service function
// import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

// const Chatbot = ({ closeChatbot }) => {
//   const [messages, setMessages] = useState([
//     {
//       role: "bot",
//       content:
//         "Hi! I am Aira, your AirSphere Assistant. 🌬️ I'm happy to help! Ask me any query about air quality, predictions, or anything else.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true); // State for chat window size
//   const { transcript, resetTranscript, listening, startListening, stopListening } =
//     useSpeechRecognition();

//   // Function to send the message and process it
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages([...messages, userMessage]);

//     setTyping(true);

//     try {
//       const botResponse = await postChatQuery(input);

//       const botMessage = { role: "bot", content: botResponse.response };
//       setTimeout(() => {
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//         setTyping(false);
//       }, 1000); // Simulate delay for typing dots
//     } catch (error) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { role: "bot", content: "Sorry, something went wrong!" },
//       ]);
//       setTyping(false);
//     }

//     setInput("");
//   };

//   // Handle speech recognition input
//   useEffect(() => {
//     if (transcript) {
//       setInput(transcript);
//     }
//   }, [transcript]);

//   // Function to toggle chat window size
//   const toggleChatWindow = () => {
//     setIsExpanded(!isExpanded); // Toggle the chat window size
//   };

//   // Handle speech input on button click
//   const handleSpeechInput = () => {
//     if (listening) {
//       stopListening();
//     } else {
//       resetTranscript();
//       startListening({ continuous: true, language: "en-US" });
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "10px",
//         right: "10px",
//         width: isExpanded ? "350px" : "200px", // Resize based on state
//         height: isExpanded ? "500px" : "300px", // Resize based on state
//         backgroundColor: "#FAF3E0", // Almond white background for the chatbot body
//         boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
//         borderRadius: "10px",
//         overflow: "hidden",
//         fontFamily:
//           "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", // Standard font
//       }}
//     >
//       <div
//         style={{
//           padding: "10px",
//           background: "linear-gradient(90deg, #182848, black)", // Chatbot header with the gradient
//           color: "#fff",
//           textAlign: "center",
//         }}
//       >
//         <strong>Aira - Your AirSphere Assistant</strong>
//         <span
//           style={{ float: "right", cursor: "pointer", color: "#fff" }}
//           onClick={closeChatbot}
//         >
//           ✖
//         </span>
//         <span
//           style={{
//             float: "left",
//             cursor: "pointer",
//             color: "#fff",
//             fontSize: "18px",
//           }}
//           onClick={toggleChatWindow}
//         >
//           {isExpanded ? "🔽" : "🔼"} {/* Toggle icon */}
//         </span>
//       </div>
//       <div style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}>
//         {messages.map((msg, index) => (
//           <p
//             key={index}
//             style={{
//               textAlign: msg.role === "user" ? "right" : "left",
//               background: msg.role === "user" ? "#E0E0E0" : "#FFFFFF", // User in light gray, bot in white
//               color: msg.role === "user" ? "#000" : "#333",
//               padding: "10px",
//               borderRadius: "10px",
//               margin: "5px 0",
//             }}
//           >
//             {msg.content}
//           </p>
//         ))}
//         {typing && (
//           <p
//             style={{
//               textAlign: "left",
//               background: "#FFFFFF",
//               color: "#333",
//               padding: "10px",
//               borderRadius: "10px",
//               margin: "5px 0",
//               fontStyle: "italic",
//             }}
//           >
//             Typing...
//           </p>
//         )}
//       </div>
//       <div style={{ display: "flex", padding: "5px", borderTop: "1px solid #ddd" }}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{
//             flex: 1,
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "5px 0 0 5px",
//             outline: "none",
//           }}
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 20px",
//             background: "#182848", // Dark blue button color
//             color: "#fff",
//             border: "none",
//             borderRadius: "0 5px 5px 0",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//         <button
//           onClick={handleSpeechInput}
//           style={{
//             padding: "10px 20px",
//             background: "#182848", // Dark blue button color
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginLeft: "5px",
//           }}
//         >
//           🎤
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// // import React, { useState, useEffect } from "react";
// // import { postChatQuery } from "../../services/AqiService"; // Import the service function

// // const Chatbot = ({ closeChatbot }) => {
// //   const [messages, setMessages] = useState([
// //     {
// //       role: "bot",
// //       content:
// //         "Hi! I am Aira, your AirSphere Assistant. 🌬️ I'm happy to help! Ask me any query about air quality, predictions, or anything else.",
// //     },
// //   ]);

  
// //   const [input, setInput] = useState("");
// //   const [typing, setTyping] = useState(false);
// //   const [isExpanded, setIsExpanded] = useState(true); // State for chat window size
// //   const { transcript, resetTranscript, listening, startListening, stopListening } =
// //     useSpeechRecognition(); // Destructure the required functions from the hook

// //   // Function to send the message and process it
// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const userMessage = { role: "user", content: input };
// //     setMessages([...messages, userMessage]);

// //     setTyping(true);

// //     try {
// //       const botResponse = await postChatQuery(input);

// //       const botMessage = { role: "bot", content: botResponse.response };
// //       setTimeout(() => {
// //         setMessages((prevMessages) => [...prevMessages, botMessage]);
// //         setTyping(false);
// //       }, 1000); // Simulate delay for typing dots
// //     } catch (error) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { role: "bot", content: "Sorry, something went wrong!" },
// //       ]);
// //       setTyping(false);
// //     }

// //     setInput("");
// //   };

// //   // Handle speech recognition input
// //   useEffect(() => {
// //     if (transcript) {
// //       setInput(transcript);
// //     }
// //   }, [transcript]);

// //   useEffect(() => {
// //     console.log('startListening:', startListening);
// //   }, [startListening]);
  

// //   // Function to toggle chat window size
// //   const toggleChatWindow = () => {
// //     setIsExpanded(!isExpanded); // Toggle the chat window size
// //   };

// //   // // Handle speech input on button click
// //   // const handleSpeechInput = () => {
// //   //   if (listening) {
// //   //     console.log(startListening);  // This should print the function or 'undefined'

// //   //     stopListening(); // Stop the listening if it's already active
// //   //   } else {
// //   //     resetTranscript(); // Reset any prior transcript
// //   //     startListening({ continuous: true, language: "en-US" });
// //   //   }
// //   // };
// //   const handleSpeechInput = () => {
// //     // Check if startListening is available
// //     if (startListening) {
// //       if (listening) {
// //         stopListening();
// //       } else {
// //         resetTranscript(); // Optionally reset transcript before starting
// //         startListening({ continuous: true, language: "en-US" }); // Start listening with options
// //       }
// //     } else {
// //       console.error("startListening function is not available.");
// //     }
// //   };
  

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         bottom: "10px",
// //         right: "10px",
// //         width: isExpanded ? "350px" : "200px", // Resize based on state
// //         height: isExpanded ? "500px" : "300px", // Resize based on state
// //         backgroundColor: "#FAF3E0", // Almond white background for the chatbot body
// //         boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
// //         borderRadius: "10px",
// //         overflow: "hidden",
// //         fontFamily:
// //           "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", // Standard font
// //       }}
// //     >
// //       <div
// //         style={{
// //           padding: "10px",
// //           background: "linear-gradient(90deg, #182848, black)", // Chatbot header with the gradient
// //           color: "#fff",
// //           textAlign: "center",
// //         }}
// //       >
// //         <strong>Aira - Your AirSphere Assistant</strong>
// //         <span
// //           style={{ float: "right", cursor: "pointer", color: "#fff" }}
// //           onClick={closeChatbot}
// //         >
// //           ✖
// //         </span>
// //         <span
// //           style={{
// //             float: "left",
// //             cursor: "pointer",
// //             color: "#fff",
// //             fontSize: "18px",
// //           }}
// //           onClick={toggleChatWindow}
//         >
//           {isExpanded ? "🔽" : "🔼"} {/* Toggle icon */}
//         </span>
//       </div>
//       <div style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}>
//         {messages.map((msg, index) => (
//           <p
//             key={index}
//             style={{
//               textAlign: msg.role === "user" ? "right" : "left",
//               background: msg.role === "user" ? "#E0E0E0" : "#FFFFFF", // User in light gray, bot in white
//               color: msg.role === "user" ? "#000" : "#333",
//               padding: "10px",
//               borderRadius: "10px",
//               margin: "5px 0",
//             }}
//           >
//             {msg.content}
//           </p>
//         ))}
//         {typing && (
//           <p
//             style={{
//               textAlign: "left",
//               background: "#FFFFFF",
//               color: "#333",
//               padding: "10px",
//               borderRadius: "10px",
//               margin: "5px 0",
//               fontStyle: "italic",
//             }}
//           >
//             Typing...
//           </p>
//         )}
//       </div>
//       <div style={{ display: "flex", padding: "5px", borderTop: "1px solid #ddd" }}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{
//             flex: 1,
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "5px 0 0 5px",
//             outline: "none",
//           }}
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 20px",
//             background: "#182848", // Dark blue button color
//             color: "#fff",
//             border: "none",
//             borderRadius: "0 5px 5px 0",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//         <button
//           onClick={handleSpeechInput}
//           style={{
//             padding: "10px 20px",
//             background: "#182848", // Dark blue button color
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginLeft: "5px",
//           }}
//         >
//           🎤
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
