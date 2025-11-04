import { useEffect, useState } from "react";
import "./AdminAppointments.css";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt, FaDownload,FaFileExport} from "react-icons/fa";


const STATUS_COLORS = {
  pending: "pending",
  confirmed: "confirmed",
  cancelled: "cancelled",
  completed: "completed",
  absent: "absent",
};


export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [editAppt, setEditAppt] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handleExportCSV = () => {
    // Colonnes à exporter
    const headers = [
      "Client",
      "Service",
      "Date",
      "TimeSlot",
      "Prescription",
      "Status"
    ];
     // Données filtrées
  const rows = filteredAppointments.map(a => [
    a.client,
    a.service,
    formatDate(a.appointment_date),
    a.appointment_time_slot,
    a.prescription_file || "",
    a.status
  ]);
  // Génère le CSV
  let csvContent =
    headers.join(",") +
    "\n" +
    rows.map(row => row.map(field => `"${field}"`).join(",")).join("\n");
  // Télécharge le fichier
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "appointments.csv";
  a.click();
  URL.revokeObjectURL(url);
};
// Filtrage
const filteredAppointments = appointments.filter((a) => {
  const searchLower = search.toLowerCase();
  return (
    a.client.toLowerCase().includes(searchLower) ||
    a.service.toLowerCase().includes(searchLower) ||
    a.status.toLowerCase().includes(searchLower)
  );
});
  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const res = await fetch(
        `http://localhost:5000/api/admin/appointments?page=${page}&limit=${pageSize}`,
        { headers }
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }
      
      const data = await res.json();
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to refresh appointments. Please try again.");
      setAppointments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [page]);

  // Confirmer ou annuler
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const res = await fetch(`http://localhost:5000/api/admin/appointments/${id}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update appointment status");
      }

      fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment status:", err);
      setError("Failed to update appointment status. Please try again.");
    }
  };

  // Ouvrir le modal d'édition
  const openEdit = (appt) => {
    setEditAppt(appt);
    setEditStatus(appt.status);
    setShowEdit(true);
  };

  // Sauver le statut modifié
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateStatus(editAppt.id, editStatus);
      setShowEdit(false);
      setEditAppt(null);
    } catch (err) {
      // L'erreur est déjà gérée dans updateStatus
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Pour le lien de téléchargement
  function getPrescriptionUrl(filename) {
    if (!filename) return "#";
    return `http://localhost:5000/uploads/prescriptions/${filename}`;
  }

  return (
    <div className="admin-bg">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src={require("../../assets/logo-white.png")} alt="Logo" />
        </div>
        <ul className="admin-menu">
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/admin/services")}>Services</li>
          <li className="active" onClick={() => navigate("/admin/appointments")}>Appointments</li>
          <li onClick={() => navigate("/admin/clients")}>Clients</li>
          <li onClick={() => navigate("/admin/feedback")}>Feedback</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href = "/"}}>Log out</li>
        </ul>
      </aside>
      <main className="admin-main">
        <div className="admin-header">
          <h2>Appointments</h2>
          <div style={{ display: "flex", gap: 12 }}>
          <button className="admin-export-btn" onClick={handleExportCSV}>
            <FaFileExport /> Export
          </button>
          <button 
            className={`admin-refresh-btn ${loading ? 'loading' : ''}`} 
            onClick={fetchAppointments} 
            disabled={loading}
          >
            <FaSyncAlt style={{marginRight:"5px"}} className={loading ? 'spinning' : ''} /> 
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        </div>
        {error && (
          <div className="admin-error-message">
            {error}
          </div>
        )}
        <div className="admin-search-bar">
        <input
          type="text"
          placeholder="Search by client, service or status"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>DATE</th>
                <th>TimeSlot</th>
                <th>Prescription</th>
                <th>STATUS</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.client}</td>
                  <td>{a.service}</td>
                  <td>{formatDate(a.appointment_date)}</td>
                  <td>{a.appointment_time_slot}</td>
                  <td>
                    {a.prescription_file ? (
                      <a
                      href={`http://localhost:5000/api/download/prescription/${a.prescription_file}`}
                        download={a.prescription_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="prescription-download-link"
                        title="Download prescription"
                      >
                        <FaDownload style={{marginRight: 4}} />
                        {a.prescription_file}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${STATUS_COLORS[a.status] || ""}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    {a.status === "pending" && (
                      <>
                        <button
                          className="admin-edit-btn"
                          onClick={() => updateStatus(a.id, "confirmed")}
                        >
                          Confirm
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => updateStatus(a.id, "cancelled")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {a.status === "confirmed" && (
                      <button
                        className="admin-edit-btn"
                        onClick={() => openEdit(a)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="admin-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
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
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next &gt;
            </button>
            <span style={{ marginLeft: 12 }}>
              {`${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} of ${total} Results`}
            </span>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {showEdit && (
        <div className="admin-modal-bg">
          <form className="admin-modal-content" onSubmit={handleEdit}>
            <div className="mb-3">
              <input className="form-control" value={editAppt.client} disabled placeholder="Client" />
            </div>
            <div className="mb-3">
              <input className="form-control" value={editAppt.service} disabled placeholder="Service" />
            </div>
            <div className="mb-3">
              <input className="form-control" value={formatDate(editAppt.appointment_date)} disabled placeholder="Date" />
            </div>
            <div className="mb-3">
              <input className="form-control" value={editAppt.appointment_time_slot} disabled placeholder="TimeSlot" />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                required
              >
                <option value="completed">completed</option>
                <option value="absent">absent</option>
              </select>
            </div>
            <div className="d-flex gap-3">
              <button className="admin-modal-add-btn flex-fill" type="submit">
                Edit
              </button>
              <button className="admin-modal-cancel-btn flex-fill" type="button" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}