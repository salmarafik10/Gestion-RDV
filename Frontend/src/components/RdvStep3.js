import { FaUser, FaEnvelope, FaCalendarAlt, FaCog, FaClock, FaMoneyBill,FaHourglass } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RdvStep3({ user, date, timeSlot, service, onConfirm, onCancel }) {
  const [client, setClient] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setClient(res.data))
    .catch(() => setClient(null));
  }
}, []);
  return (
    <div className="rdv-step1-bg">
      <div className="rdv-step1-form">
        <h4 className="mb-4 fw-bold">Confirmation</h4>
        <div className="mb-3 input-group">
        <input className="form-control" value={client?.fullname || ""} disabled />
          <span className="input-group-text"><FaUser /></span>
        </div>
        <div className="mb-3 input-group">
          <input className="form-control" value={user.email} disabled />
          <span className="input-group-text"><FaEnvelope /></span>
        </div>
        <div className="mb-3 input-group">
          <input className="form-control" value={date} disabled />
          <span className="input-group-text"><FaCalendarAlt /></span>
        </div>
        <div className="mb-3 input-group">
          <input className="form-control" value={timeSlot} disabled />
          <span className="input-group-text"><FaClock /></span>
        </div>
        <div className="mb-3 input-group">
          <input className="form-control" value={service?.name || ""} disabled />
          <span className="input-group-text"><FaCog /></span>
        </div>
        <div className="mb-3 input-group">
          <input className="form-control" value={service?.duration ? `${service.duration} Min` : ""} disabled />
          <span className="input-group-text"><FaHourglass /></span>
        </div>
        <div className="mb-4 input-group">
          <input className="form-control" value={service?.price ? `${service.price} dh` : ""} disabled />
          <span className="input-group-text"><FaMoneyBill /></span>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-dark flex-fill" onClick={onConfirm}>Book Now</button>
          <button className="btn btn-warning flex-fill" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}