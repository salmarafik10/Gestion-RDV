import { FaCheckCircle} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";



export default function RdvStep4({ user, date, timeSlot, service, onDone }) {
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
      <div className="rdv-step1-form text-center">
        <FaCheckCircle size={48} color="green" className="mb-3"  />
        <div className="mb-3">
        <input className="form-control" value={client?.fullname || ""} disabled />
          <input className="form-control mb-2" value={user.email} disabled />
          <input className="form-control mb-2" value={date} disabled />
          <input className="form-control mb-2" value={timeSlot} disabled />
          <input className="form-control mb-2" value={service?.name || ""} disabled />
          <input className="form-control mb-2" value={service?.duration ? `${service.duration} Min` : ""} disabled />
          <input className="form-control mb-2" value={service?.price ? `${service.price} dh` : ""} disabled />
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-success flex-fill" onClick={onDone}>Done</button>
        </div>
      </div>
    </div>
  );
}