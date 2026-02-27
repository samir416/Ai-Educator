import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Pencil } from "lucide-react";
import "./Profile.css";

export default function CreateProfile() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("Your Name");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-wrapper">
      <div className="profile-container">

        <div className="profile-header-icon">
          <User size={40} />
        </div>

        <h1>Complete Your Profile</h1>
        <p className="profile-sub">
          Help us personalize your learning experience
        </p>

        <div className="profile-card">

          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <div className="username-box">
              {isEditing ? (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <div className="username-display">
                  <span>{username}</span>
                  <Pencil
                    size={16}
                    className="edit-icon"
                    onClick={() => setIsEditing(true)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Academic Info */}
          <div className="form-row">
            <div className="form-group">
              <label>Academic Level</label>
              <select>
                <option>School (1-12)</option>
                <option>Undergraduate (UG)</option>
                <option>Postgraduate (PG)</option>
                <option>Research</option>
              </select>
            </div>

            <div className="form-group">
              <label>Class / Year</label>
              <input placeholder="e.g. 10th / BCA 2nd Year / MSc Final" />
            </div>
          </div>

          {/* Field of Study */}
          <div className="form-group">
            <label>Field of Study</label>
            <select>
              <option>Science</option>
              <option>Commerce</option>
              <option>Arts / Humanities</option>
              <option>Computer Science / IT</option>
              <option>Medical</option>
              <option>Engineering</option>
              <option>Business / Management</option>
              <option>Law</option>
              <option>Research / PhD</option>
              <option>Other</option>
            </select>
          </div>

          {/* Primary Goal */}
          <div className="form-group">
            <label>Primary Goal</label>
            <select>
              <option>Exam Preparation</option>
              <option>Placement</option>
              <option>Skill Development</option>
              <option>Competitive Exam</option>
              <option>Research</option>
            </select>
          </div>

          <button
            className="complete-btn"
            onClick={() => navigate("/dashboard")}
          >
            Complete Setup
          </button>

        </div>
      </div>
    </div>
  );
}
