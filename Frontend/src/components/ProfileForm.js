import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Récupérer les infos du user connecté (depuis localStorage ou API)
    setFullname(localStorage.getItem("fullname") || "");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (newPassword && newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/profile",
        {
          fullname,
          email,
          password,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Profile updated!");
      localStorage.setItem("fullname", fullname);
      localStorage.setItem("email", email);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <form className="profile-form" onSubmit={handleEdit}>
      <h4 className="mb-4 fw-bold">My profil</h4>
      <div className="mb-3">
        <label>Full Name</label>
        <input
          className="form-control"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Current password"
        />
      </div>
      <div className="mb-3">
        <label>New Password</label>
        <input
          className="form-control"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Confirmation New Password</label>
        <input
          className="form-control"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-danger mb-2">{error}</div>}
      {success && <div className="text-success mb-2">{success}</div>}
      <button className="btn btn-dark w-100" type="submit">
        Edit
      </button>
    </form>
  );
}