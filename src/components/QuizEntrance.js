import React, { useState } from "react";
import "./QuizEntrance.css";

export default function QuizEntrance() {

  const [source, setSource] = useState("lecture"); 
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState(10);
  const [mode, setMode] = useState("practice");
  const [lectureLink, setLectureLink] = useState("");

  return (
    <div className="quiz-wrapper">

      <div className="quiz-container">

        <div className="quiz-header">
          <h1>Adaptive AI Quiz</h1>
          <p>Generate quizzes from lectures or uploaded content</p>
        </div>

        {/* SOURCE SELECTION */}
        <div className="quiz-card">
          <h3>Quiz Source</h3>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                checked={source === "lecture"}
                onChange={() => setSource("lecture")}
              />
              Generate from Lecture Link
            </label>

            <label>
              <input
                type="radio"
                checked={source === "upload"}
                onChange={() => setSource("upload")}
              />
              Generate from Uploaded Content
            </label>
          </div>
        </div>

        {/* DYNAMIC SECTION */}

        {source === "lecture" && (
          <div className="quiz-card">
            <h3>Paste Lecture / Playlist Link</h3>

            <input
              type="text"
              className="link-input"
              placeholder="Paste lecture or playlist link here..."
              value={lectureLink}
              onChange={(e) => setLectureLink(e.target.value)}
            />

            <p className="helper-text">
              You can paste a single lecture link or full playlist link.
            </p>
          </div>
        )}

        {source === "upload" && (
          <div className="quiz-card">
            <h3>Upload Content</h3>

            <input type="file" className="file-input" />

            <textarea
              placeholder="Or paste your notes / code here..."
              rows="4"
            />
          </div>
        )}

        {/* DIFFICULTY */}
        <div className="quiz-card">
          <h3>Difficulty Level</h3>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                checked={difficulty === "easy"}
                onChange={() => setDifficulty("easy")}
              />
              Easy
            </label>

            <label>
              <input
                type="radio"
                checked={difficulty === "medium"}
                onChange={() => setDifficulty("medium")}
              />
              Medium
            </label>

            <label>
              <input
                type="radio"
                checked={difficulty === "hard"}
                onChange={() => setDifficulty("hard")}
              />
              Hard
            </label>
          </div>
        </div>

        {/* QUESTION COUNT */}
        <div className="quiz-card">
          <h3>Number of Questions: {questions}</h3>

          <input
            type="range"
            min="5"
            max="20"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>

        {/* MODE */}
        <div className="quiz-card">
          <h3>Mode</h3>

          <div className="mode-toggle">
            <button
              className={mode === "practice" ? "active" : ""}
              onClick={() => setMode("practice")}
            >
              Practice
            </button>

            <button
              className={mode === "exam" ? "active" : ""}
              onClick={() => setMode("exam")}
            >
              Exam
            </button>
          </div>
        </div>

        {/* START BUTTON */}
        <button className="start-btn">
          Start Quiz
        </button>

      </div>
    </div>
  );
}