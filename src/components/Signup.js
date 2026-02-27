import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">

      
      <div className="card">

        <div className="brand">
          <div className="brand-icon">✦</div>
          <span>EduMation AI</span>
        </div>

        <h2>Create Account</h2>
        <p className="subtitle">
          Start your AI-powered learning journey today
        </p>

        <label>Full Name</label>
        <div className="field">
          <User size={18} />
          <input placeholder="John Doe" />
        </div>

        <label>Email</label>
        <div className="field">
          <Mail size={18} />
          <input placeholder="you@example.com" />
        </div>

        <label>Password</label>
        <div className="field">
          <Lock size={18} />
          <input type="password" placeholder="Minimum 8 characters" />
        </div>

        <button className="primary-btn" onClick={() => navigate("/profile")}>
          Create Account
        </button>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}
