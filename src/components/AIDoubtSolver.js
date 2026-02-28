// import React, { useState, useRef, useEffect } from "react";
// import { Send, Bot, History } from "lucide-react";
// import "./AIDoubtSolver.css";

// export default function AIDoubtSolver() {

//     const createWelcomeMessage = () => ({
//         text: "Hello! I'm your AI doubt solver. Ask me any academic question and I'll help you instantly.",
//         sender: "bot",
//         time: new Date().toLocaleTimeString()
//     });

//     const [messages, setMessages] = useState([createWelcomeMessage()]);
//     const [input, setInput] = useState("");
//     const [view, setView] = useState("chat");
//     const [sessions, setSessions] = useState([]);
//     const [currentSessionId, setCurrentSessionId] = useState(null);

//     const bottomRef = useRef(null);

//     useEffect(() => {
//         const stored = JSON.parse(localStorage.getItem("chatSessions")) || [];
//         setSessions(stored);
//     }, []);

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const saveSessions = (updated) => {
//         localStorage.setItem("chatSessions", JSON.stringify(updated));
//         setSessions(updated);
//     };

//     const [isLoading, setIsLoading] = useState(false); // Add this at the top

//     const sendMessage = async () => {
//         if (!input.trim() || isLoading) return;

//         const userMsg = {
//             text: input,
//             sender: "user",
//             time: new Date().toLocaleTimeString()
//         };

//         // Update UI immediately with user message
//         const updatedMessages = [...messages, userMsg];
//         setMessages(updatedMessages);
//         const currentInput = input;
//         setInput("");
//         setIsLoading(true);

//         try {
//             const response = await fetch("http://localhost:8080/api/ai/solve", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ question: currentInput })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.answer || "Server Error");
//             }

//             const data = await response.json();

//             const botMsg = {
//                 text: data.answer,
//                 sender: "bot",
//                 time: new Date().toLocaleTimeString()
//             };

//             const finalMessages = [...updatedMessages, botMsg];
//             setMessages(finalMessages);

//             // --- Handle History Saving ---
//             let updatedSessions;
//             if (currentSessionId) {
//                 updatedSessions = sessions.map(s =>
//                     s.id === currentSessionId ? { ...s, messages: finalMessages } : s
//                 );
//             } else {
//                 const newId = Date.now();
//                 const newSession = {
//                     id: newId,
//                     title: currentInput.substring(0, 30) + "...",
//                     messages: finalMessages,
//                     date: new Date().toLocaleDateString()
//                 };
//                 setCurrentSessionId(newId);
//                 updatedSessions = [newSession, ...sessions];
//             }
//             saveSessions(updatedSessions);
//             // -----------------------------

//         } catch (error) {
//             const errorMsg = {
//                 text: "Sorry, I'm having trouble connecting to the server.",
//                 sender: "bot",
//                 time: new Date().toLocaleTimeString()
//             };
//             setMessages(prev => [...prev, errorMsg]);
//             console.error("Fetch error:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const openSession = (session) => {
//         setMessages(session.messages);
//         setCurrentSessionId(session.id);
//         setView("chat");
//     };

//     const clearAllHistory = () => {
//         localStorage.removeItem("chatSessions");
//         setSessions([]);
//         setMessages([createWelcomeMessage()]);
//         setCurrentSessionId(null);
//     };

//     const startNewChat = () => {
//         setMessages([createWelcomeMessage()]);
//         setCurrentSessionId(null);
//         setView("chat");
//     };

//     const deleteSingleChat = (id) => {
//         const updatedSessions = sessions.filter(s => s.id !== id);
//         saveSessions(updatedSessions);

//         if (currentSessionId === id) {
//             startNewChat();
//         }
//     };

//     // ================= HISTORY VIEW =================
//     if (view === "history") {
//         return (
//             <div className="history-wrapper">

//                 <div className="history-header">

//                     <button
//                         className="history-new"
//                         onClick={startNewChat}
//                     >
//                         + New Chat
//                     </button>

//                     <h2>Chat History</h2>

//                     <button
//                         className="history-clear"
//                         onClick={clearAllHistory}
//                     >
//                         Clear All
//                     </button>

//                 </div>

//                 <div className="history-body">

//                     {sessions.length === 0 && (
//                         <p className="no-history">
//                             No previous chats found.
//                         </p>
//                     )}

//                     {sessions.map(session => (
//                         <div key={session.id} className="history-card">

//                             <div
//                                 className="history-title"
//                                 onClick={() => openSession(session)}
//                             >
//                                 {session.title}
//                             </div>

//                             <button
//                                 className="delete-single"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     deleteSingleChat(session.id);
//                                 }}
//                             >
//                                 ✕
//                             </button>

//                         </div>
//                     ))}

//                 </div>

//             </div>
//         );
//     }

//     // ================= CHAT VIEW =================
//     return (
//         <div className="ai-page">

//             <div className="ai-header">
//                 <div>
//                     <h2>AI Doubt Solver</h2>
//                     <p>Ask questions, get instant explanations, and learn interactively</p>
//                 </div>

//                 <button
//                     className="history-icon-btn"
//                     onClick={() => setView("history")}
//                 >
//                     <History size={18} />
//                 </button>
//             </div>

//             <div className="chat-box">

//                 <div className="chat-messages">
//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
//                         >
//                             {msg.sender === "bot" && (
//                                 <div className="bot-icon">
//                                     <Bot size={18} />
//                                 </div>
//                             )}

//                             <div className="bubble">
//                                 <p>{msg.text}</p>
//                                 <span className="time">{msg.time}</span>
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={bottomRef}></div>
//                 </div>

//                 <div className="chat-input">
//                     <input
//                         type="text"
//                         placeholder="Type your question here..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                     />
//                     <button onClick={sendMessage}>
//                         <Send size={18} />
//                     </button>
//                 </div>

//             </div>

//         </div>
//     );
// }

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, History } from "lucide-react";
import "./AIDoubtSolver.css";

export default function AIDoubtSolver() {

  const createWelcomeMessage = () => ({
    text: "Hello! I'm your AI doubt solver. Ask me anything!",
    sender: "bot",
    time: new Date().toLocaleTimeString()
  });

  const [messages, setMessages] = useState([createWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const question = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/ai/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.answer || "Server Error");
      }

      const botMessage = {
        text: data.answer,
        sender: "bot",
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Server connection failed.",
        sender: "bot",
        time: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h2>AI Doubt Solver</h2>
      </div>

      <div className="chat-box">

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              {msg.sender === "bot" && (
                <div className="bot-icon">
                  <Bot size={18} />
                </div>
              )}

              <div className="bubble">
                <p>{msg.text}</p>
                <span className="time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>
            <Send size={18} />
          </button>
        </div>

      </div>

    </div>
  );
}