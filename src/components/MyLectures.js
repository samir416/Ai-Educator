import React, { useState,useRef } from "react";
import {
  Play,
  Download,
  Share2,
  Trash2,
  Clock,
  Calendar,
  RefreshCcw,
  Edit,
  X
} from "lucide-react";

import "./MyLectures.css";
import { Search } from "lucide-react";


export default function MyLectures() {

  const [search, setSearch] = useState("");
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const lectures = [
    {
      title: "Introduction to Machine Learning",
      subject: "Computer Science",
      duration: "45 min",
      date: "Feb 11, 2026",
      revisions: 3,
      progress: 75,
      script: "This is the generated AI script preview for Machine Learning..."
    },
    {
      title: "Advanced Data Structures",
      subject: "Algorithms",
      duration: "60 min",
      date: "Feb 10, 2026",
      revisions: 2,
      progress: 40,
      script: "This is the generated AI script preview for Data Structures..."
    }
  ];

  return (
    <div className="lecture-library">

      <div className="library-header">
        <h2>Lecture Library</h2>
        <p>Access and manage all your AI-generated lectures</p>
      </div>

      <div className="library-controls">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search lectures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="tabs">
        <span className="active">All (8)</span>
        <span>In Progress (4)</span>
        <span>Completed (3)</span>
        <span>Unwatched (1)</span>
      </div>

      <div className="lecture-list">
        {lectures.map((item, index) => (
          <div className="lecture-box" key={index}>

            <div className="lecture-left">
              <div className="thumb">
                <Play size={38} />
              </div>

              <div className="lecture-info">
                <h3>{item.title}</h3>

                <div className="meta">
                  <span className="tag">{item.subject}</span>
                  <span><Clock size={14} /> {item.duration}</span>
                  <span><Calendar size={14} /> {item.date}</span>
                  <span>Revisions: {item.revisions}</span>
                </div>

                <div className="progress-wrapper">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="percent">{item.progress}%</span>
                </div>

                <div className="actions">
                  <button className="continue-btn">
                    <Play size={16} /> Continue
                  </button>

                  <button
                    className="details-btn"
                    onClick={() => setSelectedLecture(item)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="lecture-icons">
              <Download size={18} />
              <Share2 size={18} />
              <Trash2 size={18} />
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}

      {selectedLecture && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <h3>{selectedLecture.title}</h3>
              <X
                size={22}
                className="close-icon"
                onClick={() => setSelectedLecture(null)}
              />
            </div>

            <div className="modal-content">

              {/* Video Preview */}
              <div className="video-preview">
                <div className="video-placeholder">
                  <Play size={48} />
                  <p>Video Preview</p>
                </div>
              </div>

              {/* Script Preview */}
              <div className="script-preview">
                <h4>Generated Script</h4>

                {isEditing ? (
                  <textarea
                    ref={textareaRef}
                    defaultValue={selectedLecture.script}
                    className="script-textarea"
                  />
                ) : (
                  <p>{selectedLecture.script}</p>
                )}
              </div>

            </div>

            <div className="modal-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setIsEditing(true);
                  setTimeout(() => {
                    textareaRef.current?.focus();
                  }, 100);
                }}
              >
                <Edit size={16} /> Edit Script
              </button>


              <button className="regen-btn">
                <RefreshCcw size={16} /> Regenerate
              </button>

              <button className="download-btn">
                <Download size={16} /> Download
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
