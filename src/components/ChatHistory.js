import React from "react";
import "./AIDoubtSolver.css";

export default function ChatHistory({ sessions, onOpen, onClear, onBack }) {

    return (
        <div className="history-wrapper">

            <div className="history-header">

                <button
                    className="history-back"
                    onClick={() => setView("chat")}
                >
                    ← Back
                </button>

                <h2>Chat History</h2>

                <div className="history-actions">
                    <button
                        className="history-new"
                        onClick={startNewChat}
                    >
                        + New Chat
                    </button>

                    <button
                        className="history-clear"
                        onClick={clearAllHistory}
                    >
                        Clear All
                    </button>
                </div>

            </div>

            <div className="history-body">
                {sessions.length === 0 && (
                    <p className="no-history">No chat history available.</p>
                )}

                {sessions.map(session => (
                    <div
                        key={session.id}
                        className="history-card"
                        onClick={() => onOpen(session)}
                    >
                        <div className="history-title">
                            {session.title}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}