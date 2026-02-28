import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, History } from "lucide-react";
import "./AIDoubtSolver.css";

export default function AIDoubtSolver() {

    const createWelcomeMessage = () => ({
        text: "Hello! I'm your AI doubt solver. Ask me any academic question and I'll help you instantly.",
        sender: "bot",
        time: new Date().toLocaleTimeString()
    });

    const [messages, setMessages] = useState([createWelcomeMessage()]);
    const [input, setInput] = useState("");
    const [view, setView] = useState("chat");
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);

    const bottomRef = useRef(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("chatSessions")) || [];
        setSessions(stored);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const saveSessions = (updated) => {
        localStorage.setItem("chatSessions", JSON.stringify(updated));
        setSessions(updated);
    };

const [isLoading, setIsLoading] = useState(false); // Add this at the top

const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user", time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true); // Start loading

    try {
        const response = await fetch("http://localhost:8080/api/ai/solve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: input })
        });

        const data = await response.json();
        const botMsg = { text: data.answer, sender: "bot", time: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, botMsg]);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setIsLoading(false); // Stop loading
    }
};

    const openSession = (session) => {
        setMessages(session.messages);
        setCurrentSessionId(session.id);
        setView("chat");
    };

    const clearAllHistory = () => {
        localStorage.removeItem("chatSessions");
        setSessions([]);
        setMessages([createWelcomeMessage()]);
        setCurrentSessionId(null);
    };

    const startNewChat = () => {
        setMessages([createWelcomeMessage()]);
        setCurrentSessionId(null);
        setView("chat");
    };

    const deleteSingleChat = (id) => {
        const updatedSessions = sessions.filter(s => s.id !== id);
        saveSessions(updatedSessions);

        if (currentSessionId === id) {
            startNewChat();
        }
    };

    // ================= HISTORY VIEW =================
    if (view === "history") {
        return (
            <div className="history-wrapper">

                <div className="history-header">

                    <button
                        className="history-new"
                        onClick={startNewChat}
                    >
                        + New Chat
                    </button>

                    <h2>Chat History</h2>

                    <button
                        className="history-clear"
                        onClick={clearAllHistory}
                    >
                        Clear All
                    </button>

                </div>

                <div className="history-body">

                    {sessions.length === 0 && (
                        <p className="no-history">
                            No previous chats found.
                        </p>
                    )}

                    {sessions.map(session => (
                        <div key={session.id} className="history-card">

                            <div
                                className="history-title"
                                onClick={() => openSession(session)}
                            >
                                {session.title}
                            </div>

                            <button
                                className="delete-single"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSingleChat(session.id);
                                }}
                            >
                                ✕
                            </button>

                        </div>
                    ))}

                </div>

            </div>
        );
    }

    // ================= CHAT VIEW =================
    return (
        <div className="ai-page">

            <div className="ai-header">
                <div>
                    <h2>AI Doubt Solver</h2>
                    <p>Ask questions, get instant explanations, and learn interactively</p>
                </div>

                <button
                    className="history-icon-btn"
                    onClick={() => setView("history")}
                >
                    <History size={18} />
                </button>
            </div>

            <div className="chat-box">

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
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
                        placeholder="Type your question here..."
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