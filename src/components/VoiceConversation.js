import React from "react";
import { Mic } from "lucide-react";
import "./VoiceInteraction.css";

export default function VoiceConversation({ onBack }) {

  return (
    <div className="voice-page full-screen">

      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="voice-card">

        <div className="big-mic">
          <Mic size={60} />
        </div>

        <div className="voice-buttons">
          <button className="start-btn">
            Start Conversation
          </button>
        </div>

      </div>

    </div>
  );
}
