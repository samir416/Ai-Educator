import React from "react";
import "./Home.css";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (

    <div className="Home-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <span>EduMation AI</span>
        </div>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="get-started-btn" onClick={() => navigate("/signup")}>
            Get Started
          </button>

        </div>
      </nav>

      {/* Home Section */}
      <div className="Home-content">
        <h1>
          Transform Your Learning with <br />
          <span className="gradient-text">AI-Powered Education</span>
        </h1>

        <p>
          Generate AI-based video lectures from your notes, PDFs, and code.
          Interact with a voice-enabled AI tutor that adapts to your learning style.
        </p>

        <div className="Home-buttons">
          <button className="primary-btn" onClick={() => navigate("/signup")}>
            Start Learning Free
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              document.querySelector(".features-section").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Watch Demo 🎥
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>Powerful Features for Modern Learners</h2>
        <p className="feature-subtitle">
          Everything you need to accelerate your learning journey
        </p>

        <div className="features-grid">

          <div className="feature-card">
            <div className="icon-box">🎥</div>
            <h3>AI Video Lectures</h3>
            <p>
              Convert your notes, PDFs, and code into engaging video lectures
              with AI-generated voice and visuals.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box">💬</div>
            <h3>AI Doubt Solver</h3>
            <p>
              Get instant answers to your questions with our intelligent
              AI tutor available 24/7.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box">🎤</div>
            <h3>Voice Interaction</h3>
            <p>
              Learn naturally by speaking with the AI tutor.
              Voice-enabled conversations for better engagement.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Brain size={22} /></div>
            <h3>Adaptive Quiz System</h3>
            <p>
              Dynamic assessments that adapt to your learning pace
              and understanding.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box">🧠</div>
            <h3>Adaptive Learning</h3>
            <p>
              AI adapts to your learning pace and style,
              providing personalized explanations and examples.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box">📚</div>
            <h3>Lecture Library</h3>
            <p>
              Access all your generated lectures in one place.
              Organize, review, and revisit anytime.
            </p>
          </div>

        </div>
      </section>
      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Ready to Transform Your Learning?</h2>
          <p>
            Experience the future of AI-powered education with EduVerse AI
          </p>

          <button className="cta-btn" onClick={() => navigate("/signup")}>
            Get Started Now - It's Free
          </button>
        </div>

        <div className="footer-text">
          © 2026 EduVerse AI. Empowering the next generation of learners.
        </div>
      </section>


    </div>
  );
}
