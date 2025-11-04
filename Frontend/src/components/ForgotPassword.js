import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-green.png";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // À adapter plus tard pour l'envoi réel d'email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      setSent(true); // Toujours afficher le message pour la sécurité
    }
  };

  return (
    <div className="auth-bg auth-bg-green">
      <div className="auth-container">
        <img src={logo} alt="Logo" className="auth-logo" />
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {sent && (
            <div className="text-success mb-2">
              If this email exists, you will receive a reset link.
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{ backgroundColor: "#176c5b", border: "none" }}
            disabled={sent}
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/" className="fw-bold" style={{ color: "#176c5b" }}>
            Back to Login
          </Link>
        </div>
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