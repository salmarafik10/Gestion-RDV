import { FaCalendarAlt, FaCog, FaClock } from "react-icons/fa";
import "./CancelModal.css";

export default function CancelModal({ booking, onClose, onCancelBooking }) {
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="cancel-modal-bg">
      <div className="cancel-modal-content">
        <div className="mb-3 fw-bold">
          Do you really want to cancel this appointment?
        </div>
        <div className="mb-3 input-group">
          <input
            className="form-control"
            value={formatDate(booking.appointment_date)}
            disabled
          />
          <span className="input-group-text"><FaCalendarAlt /></span>
        </div>
        <div className="mb-3 input-group">
          <input
            className="form-control"
            value={booking.appointment_time_slot || ""}
            disabled
          />
          <span className="input-group-text"><FaClock /></span>
        </div>
        <div className="mb-4 input-group">
          <input className="form-control" value={booking.service_name} disabled />
          <span className="input-group-text"><FaCog /></span>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-success flex-fill" onClick={onClose}>
            Go Back
          </button>
          <button className="btn btn-warning flex-fill" onClick={() => {
            onCancelBooking(booking.id);
            onClose();
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}