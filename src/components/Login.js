import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="card">

        <div className="brand">
          <div className="brand-icon">✦</div>
          <span>EduMation AI</span>
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">
          Login to continue your learning journey
        </p>

        <label>Email</label>
        <div className="field">
          <Mail size={18} />
          <input placeholder="you@example.com" />
        </div>

        <div className="password-row">
          <label>Password</label>

          <span
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </div>

        <div className="field">
          <Lock size={18} />
          <input type="password" placeholder="Minimum 8 characters" />
        </div>


        <button className="primary-btn" onClick={() => navigate("/profile")}>
          Sign In
        </button>

        <p className="switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>


      </div>
    </div>
  );
}
