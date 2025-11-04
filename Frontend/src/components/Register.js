import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-blue.png";
import "./Auth.css";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!agree) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        fullname,
        email,
        phone,
        password,
      });
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-bg auth-bg-blue">
      <div className="auth-container auth-container-register">
        <img src={logo} alt="Logo" className="auth-logo" />
        <form className="w-100" onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={agree}
              onChange={() => setAgree(!agree)}
              id="agree"
            />
            <label className="form-check-label" htmlFor="agree">
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          {success && <div className="text-success mb-2">{success}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{ backgroundColor: "#1a2653", border: "none" }}
          >
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          Already Have an account?{" "}
          <Link to="/" className="fw-bold" style={{ color: "#1a2653" }}>
            LOG IN
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