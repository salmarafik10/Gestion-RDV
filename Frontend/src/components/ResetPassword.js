import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import logo from "../assets/logo-green.png";
import "./Auth.css";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        password,
      });
      setSuccess(true);
    } catch (err) {
      setError("Invalid or expired link.");
    }
  };

  return (
    <div className="auth-bg auth-bg-green">
      <div className="auth-container">
        <img src={logo} alt="Logo" className="auth-logo" />
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input
              type="password"
              className="form-control"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          {success ? (
            <div className="text-success mb-2">
              Password updated! <Link to="/" style={{ color: "#176c5b" }}>Back to login</Link>
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold"
              style={{ backgroundColor: "#176c5b", border: "none" }}
            >
              Confirm new password
            </button>
          )}
        </form>
      </div>
      
      {/* Background decorative elements */}
      <div className="auth-background-shapes">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        <div className="auth-shape auth-shape-3"></div>
        <div className="auth-shape auth-shape-4"></div>
      </div>
    </div>
  );
}