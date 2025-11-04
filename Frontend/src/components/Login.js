import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-green.png";
import "./Auth.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("fullname", res.data.user.fullname); // IMPORTANT
      localStorage.setItem("email", res.data.user.email);       // IMPORTANT
           if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la connexion."
      );
    }
  };

  return (
    <div className="auth-bg auth-bg-green">
      <div className="auth-container">
        <img src={logo} alt="Logo" className="auth-logo" />
        <form className="w-100" onSubmit={handleLogin}>
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
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={remember}
                onChange={() => setRemember(!remember)}
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <Link to="/forgot-password" className="small text-muted">
              Forgot Password?
            </Link>
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{ backgroundColor: "#176c5b", border: "none" }}
          >
            Log in
          </button>
        </form>
        <div className="mt-3 text-center">
          Not Register yet ?{" "}
          <Link to="/register" className="fw-bold" style={{ color: "#176c5b" }}>
            Create Account
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