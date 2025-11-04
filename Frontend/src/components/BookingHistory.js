import { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaCog, FaClock } from "react-icons/fa";
import "./BookingHistory.css";

export default function BookingHistory({ onCancelClick }) {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(bookings.length / pageSize));
  const paginatedBookings = bookings.slice((page - 1) * pageSize, page * pageSize);

  // Helper pour le statut
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-warning";
      case "confirmed":
        return "text-primary";
      case "cancelled":
        return "text-danger";
      case "completed":
        return "text-success";
      case "no_show":
        return "text-danger";
      default:
        return "";
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function getTimeAgo(dateString) {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
  
    if (diffSec < 60) return `${diffSec} sec ago`;
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="booking-history">
      <h4 className="mb-4 fw-bold">History fo my booking</h4>
      {paginatedBookings.map((b) => (
        <div className="booking-card mb-3" key={b.id}>
          <div className="d-flex align-items-center mb-2">
            <FaCalendarAlt className="me-2" />
            <span>{formatDate(b.appointment_date)}</span>
            {b.appointment_time_slot && (
              <>
                <FaClock className="ms-3 me-2" />
                <span>{b.appointment_time_slot}</span>
              </>
            )}
          </div>
          <div className="d-flex align-items-center mb-2">
            <FaCog className="me-2" />
            <span>{b.service_name}</span>
          </div>
          <div className={`fw-bold ${statusColor(b.status)}`}>{b.status}</div>
          {b.status === "pending" && (
            <span
              className="booking-cancel-link"
              onClick={() => onCancelClick(b)}
            >
              Cancel Booking
            </span>
          )}
          <div className="text-end text-muted small">{getTimeAgo(b.created_at)}</div>
        </div>
      ))}

      {/* Pagination */}
      <div className="booking-pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          &lt; Back
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next &gt;
        </button>
        <span style={{ marginLeft: 12 }}>
          {`${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, bookings.length)} of ${bookings.length} Results`}
        </span>
      </div>
    </div>
  );
}