import React, { useRef, useEffect } from "react";
import { Send, History } from "lucide-react";

export default function ChatUI({
  messages,
  input,
  setInput,
  onSend,
  onHistory
}) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h2>AI Doubt Solver</h2>
        <button onClick={onHistory}>
          <History size={18} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button onClick={onSend}>
          <Send size={18} />
        </button>
      </div>

    </div>
  );
}