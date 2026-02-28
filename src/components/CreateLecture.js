import React, { useState, useEffect, useRef } from "react"; import "./CreateLecture.css";
import { Upload, FileText, Code, BookOpen } from "lucide-react";

export default function CreateLecture() {

  const [activeTab, setActiveTab] = useState("pdf");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [customLanguages, setCustomLanguages] = useState([]);
  const [hasContent, setHasContent] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [title, setTitle] = useState("");

  //  NEW STATES (Added Only)
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [duration, setDuration] = useState("SHORT");

  //  AUDIO PLAYER REF (NEW ADDITION)
  const audioRef = useRef(null);

  const baseLanguages = [
    "Java", "Python", "C", "C++", "C#", "JavaScript", "TypeScript", "Go", "Rust",
    "Kotlin", "Swift", "PHP", "Ruby", "R", "MATLAB", "Dart", "Scala", "Haskell",
    "Julia", "Elixir", "Groovy", "Solidity", "Assembly", "SQL", "HTML", "CSS",
    "Bash", "PowerShell", "Objective-C", "Fortran", "COBOL", "Scratch"
  ];

  const languages = [...baseLanguages, ...customLanguages];

  const detectLanguage = (code) => {
    const c = code.toLowerCase();

    if (c.includes("import react") || c.includes("usestate(")) return "React";
    if (c.includes("public class") && c.includes("system.out.println")) return "Java";
    if (c.includes("#include") && (c.includes("std::") || c.includes("using namespace std"))) return "C++";
    if (c.includes("#include") && c.includes("printf")) return "C";
    if (c.includes("def ") && c.includes("print(")) return "Python";
    if (c.includes("console.log")) return "JavaScript";
    if (c.includes(": string") || c.includes(": number")) return "TypeScript";
    if (c.includes("select ") && c.includes(" from ")) return "SQL";
    if (c.includes("<html") || c.includes("<div")) return "HTML";
    if (c.includes("{") && c.includes("color:")) return "CSS";
    if (c.includes("module main") && c.includes("fn ")) return "V";
    if (c.includes("extends node") && c.includes("func _ready")) return "GDScript";
    if (c.includes("puts") && c.includes("end")) return "Crystal";
    if (c.includes("let ") && c.includes("printfn")) return "F#";

    return "";
  };

  const handleCodeChange = (value) => {
    setCodeInput(value);

    if (value.trim() === "") {
      setSelectedLanguage("");
      setHasContent(false);
      return;
    }

    setHasContent(true);

    const detected = detectLanguage(value);

    if (detected) {
      if (!languages.includes(detected)) {
        setCustomLanguages((prev) => [...prev, detected]);
      }
      setSelectedLanguage(detected);
    }
  };

  // BACKEND FUNCTION (Added Only)
  const handleGenerateLecture = async () => {

    let scriptContent = "";
    const wordCount = scriptContent.split(/\s+/).length;
    const estimatedMinutes = Math.max(1, Math.floor(wordCount / 150));


    if (activeTab === "notes") {
      const notesArea = document.querySelector(".notes-area");
      scriptContent = notesArea ? notesArea.value : "";
    }

    if (activeTab === "code") {
      scriptContent = codeInput;
    }

    if (activeTab === "pdf") {
      scriptContent = uploadedFileName;
    }

    if (!scriptContent.trim()) {
      alert("No content to generate.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      if (activeTab === "pdf") {
        const fileInput = document.getElementById("fileUpload");
        const file = fileInput.files[0];

        if (!file) {
          alert("Please upload a PDF file.");
          return;
        }

        formData.append("file", file);
      }

    formData.append("duration", duration || "SHORT");

      const res = await fetch("http://localhost:8080/api/generate", {
        method: "POST",
        body: formData
      });

      console.log("Status:", res.status);

      const text = await res.text();   // 🔥 first read as text
      console.log("Raw response:", text);

      if (!res.ok) {
        alert("Backend returned error: " + text);
        return;
      }

      const data = JSON.parse(text);   // only parse if OK
      setApiResponse(data);

    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  //  AUTO PLAY WHEN AUDIO RECEIVED (NEW ADDITION)
  useEffect(() => {
    if (apiResponse && apiResponse.audioPath && audioRef.current) {

      // IMPORTANT: backend sirf "/generated_files/..." bhej raha hai
      audioRef.current.src = "http://localhost:8080" + apiResponse.audioPath;

      audioRef.current.load();
    }
  }, [apiResponse]);

  useEffect(() => {
    if (apiResponse && apiResponse.title) {
      setTitle(apiResponse.title);
    }
  }, [apiResponse]);


  return (
    <div className="create-wrapper">

      <h1 className="page-title">AI Lecture Generator</h1>
      <p className="page-sub">
        Transform your notes, PDFs, and code into engaging AI-powered video lectures
      </p>

      <div className="create-grid">

        <div className="left-card">

          <h3>Content Input</h3>
          <p className="card-sub">
            Upload files or paste your content to generate lecture
          </p>

          <label className="input-label">Lecture Title</label>
          <input
            className="lecture-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Introduction to React Hooks"
          />

          <div className="tabs">
            <button
              className={activeTab === "pdf" ? "tab active" : "tab"}
              onClick={() => setActiveTab("pdf")}
            >
              <FileText size={16} /> PDF/Docs
            </button>

            <button
              className={activeTab === "notes" ? "tab active" : "tab"}
              onClick={() => setActiveTab("notes")}
            >
              <BookOpen size={16} /> Notes
            </button>

            <button
              className={activeTab === "code" ? "tab active" : "tab"}
              onClick={() => setActiveTab("code")}
            >
              <Code size={16} /> Code
            </button>
          </div>

          {activeTab === "pdf" && (
            <div
              className={`upload-box ${uploadedFileName ? "file-uploaded" : ""}`}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <Upload size={40} />

              {!uploadedFileName ? (
                <>
                  <p>Click to upload or drag and drop</p>
                  <span>PDF up to 10MB</span>
                </>
              ) : (
                <>
                  <p className="uploaded-text">Uploaded:</p>
                  <span className="file-name">{uploadedFileName}</span>
                </>
              )}

              <input
                id="fileUpload"
                type="file"
                accept=".pdf"
                multiple
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (!file.name.toLowerCase().endsWith(".pdf")) {
                    alert("Only PDF files are allowed.");
                    e.target.value = ""; // clear selection
                    return;
                  }

                  setUploadedFileName(file.name);
                  setHasContent(true);
                }}
              />
            </div>
          )}

          {activeTab === "notes" && (
            <textarea
              className="notes-area"
              placeholder="Paste your notes here..."
              onChange={(e) => {
                const value = e.target.value;
                setHasContent(value.trim() !== "");
              }}
            ></textarea>
          )}

          {activeTab === "code" && (
            <>
              <label className="input-label">Programming Language</label>

              <select
                className="select-box"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">Select language</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <textarea
                className="notes-area"
                placeholder="// Paste your code here..."
                value={codeInput}
                onChange={(e) => handleCodeChange(e.target.value)}
              ></textarea>
            </>
          )}

        </div>

        <div>
          <div className="right-card">
            <h3>Lecture Settings</h3>
            <p className="card-sub">
              Customize your AI lecture generation
            </p>

            <label>Voice Selection</label>
            <select className="select-box">
              <option>Choose voice</option>
            </select>

            <label>Explanation Depth</label>
            <input type="range" className="slider" />

            <div className="range-labels">
              <span>Basic</span>
              <span>Detailed</span>
            </div>

            <label>Duration Preference</label>
            <select
              className="select-box"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="SHORT">Short (10-15 min)</option>
              <option value="MEDIUM">Medium (20-30 min)</option>
              <option value="LONG">Long (40-60 min)</option>
            </select>

            <button
              className={`generate-btn ${!hasContent ? "disabled-btn" : ""}`}
              disabled={!hasContent || loading}
              onClick={handleGenerateLecture}
            >
              {loading ? (
                <div className="loader-wrapper">
                  <div className="spinner"></div>
                  <span>Rendering Lecture...</span>
                </div>
              ) : (
                "✨ Generate Lecture"
              )}            </button>

            {apiResponse && apiResponse.videoPath !== "FAILED" && (

              <div style={{ marginTop: "15px", color: "white" }}>
                <div className="success-card">
                  <h4>✅ Lecture Generated Successfully</h4>
                  <p>Your AI lecture video is ready.</p>
                </div>
              </div>
            )}

          </div>

          <div className="pro-tips">
            <h4>💡 Pro Tips</h4>
            <ul>
              <li>Include clear headings in your notes for better structure</li>
              <li>Add code comments for detailed explanations</li>
              <li>Use bullet points for key concepts</li>
              <li>Upload supplementary PDFs for comprehensive lectures</li>
            </ul>
          </div>
        </div>

      </div>
{/* 1. Hidden Audio (This makes the voice play) */}
<audio ref={audioRef} />

{/* 2. Video Player (This shows the .mp4 files I saw in your folder) */}
{apiResponse && apiResponse.videoPath && apiResponse.videoPath !== "FAILED" && (
  <div className="video-display-section" style={{ marginTop: '20px' }}>
    <h3 style={{ color: 'white' }}>Your AI Lecture Video:</h3>
    <video 
      width="100%" 
      controls 
      key={apiResponse.videoPath}
      src={`http://localhost:8080/generated_files/${apiResponse.videoPath}`}
    />
  </div>
)}
    </div>
  );
}