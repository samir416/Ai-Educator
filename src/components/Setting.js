import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./Setting.css";

export default function Settings({ onBack }) {

  const [language, setLanguage] = useState("English");

  return (
    <div className="settings-wrapper">

      <div className="settings-container">

        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage account and system preferences</p>
        </div>

        <div className="settings-card">
          <h3>Account</h3>

          <div className="info-row">
            <span>Email</span>
            <span>john.doe@email.com</span>
          </div>

          <div className="info-row">
            <span>Account Created</span>
            <span>January 2026</span>
          </div>
        </div>

        <div className="settings-card">
          <h3>Preferences</h3>

          <div className="field">
            <label>Default Lecture Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        <div className="settings-card">
          <h3>Security</h3>
          <button className="btn-primary">
            Change Password
          </button>
        </div>

        <div className="settings-card danger">
          <h3>Danger Zone</h3>
          <button className="btn-danger">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}