import React from "react";
import { BookOpen, Clock, Play } from "lucide-react";
import "./LecturePlayList.css";

export default function LecturePlaylist() {

  const playlists = [
    {
      title: "Physics Fundamentals",
      lectures: 8,
      duration: "2h 15m",
      progress: 62
    },
    {
      title: "Machine Learning Basics",
      lectures: 12,
      duration: "3h 45m",
      progress: 45
    },
    {
      title: "Chemistry Core Concepts",
      lectures: 6,
      duration: "1h 30m",
      progress: 80
    }
  ];

  return (
    <div className="playlist-page">

      <div className="playlist-header">
        <h2>Lecture Playlists</h2>
        <p>Organized collections of related lectures</p>
      </div>

      <div className="playlist-grid">
        {playlists.map((item, index) => (
          <div className="playlist-card" key={index}>

            <div className="playlist-icon">
              <BookOpen size={28} />
            </div>

            <h3>{item.title}</h3>

            <div className="playlist-meta">
              <span>{item.lectures} lectures</span>
              <span>
                <Clock size={14} /> {item.duration}
              </span>
            </div>

            <div className="playlist-progress">
              Progress: <span>{item.progress}%</span>
            </div>

            <button className="playlist-btn">
              <Play size={16} /> Continue
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
