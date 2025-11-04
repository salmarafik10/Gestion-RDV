import { useEffect, useState } from "react";
import "./AdminFeedback.css";
import { FaSyncAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
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
        `http://localhost:5000/api/admin/feedback?page=${page}&limit=${pageSize}`,
        { headers }
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      
      const data = await res.json();
      setFeedbacks(Array.isArray(data.feedbacks) ? data.feedbacks : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError("Failed to refresh feedbacks. Please try again.");
      setFeedbacks([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, [page]);

  // Rendre public ou privé
  const handlePublic = async (id, is_public) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const res = await fetch(`http://localhost:5000/api/admin/feedback/${id}/public`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ is_public }),
      });

      if (!res.ok) {
        throw new Error("Failed to update feedback visibility");
      }

      fetchFeedbacks();
    } catch (err) {
      console.error("Error updating feedback visibility:", err);
      setError("Failed to update feedback visibility. Please try again.");
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        };

        const res = await fetch(`http://localhost:5000/api/admin/feedback/${id}`, { 
          method: "DELETE",
          headers
        });

        if (!res.ok) {
          throw new Error("Failed to delete feedback");
        }

        fetchFeedbacks();
      } catch (err) {
        console.error("Error deleting feedback:", err);
        setError("Failed to delete feedback. Please try again.");
      }
    }
  };

  return (
    <div className="admin-bg">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src={require("../../assets/logo-white.png")} alt="Logo" />
        </div>
        <ul className="admin-menu">
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/admin/services")}>Services</li>
          <li onClick={() => navigate("/admin/appointments")}>Appointments</li>
          <li onClick={() => navigate("/admin/clients")}>Clients</li>
          <li className="active" onClick={() => navigate("/admin/feedback")}>Feedback</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href = "/"}}>Log out</li>
        </ul>
      </aside>
      <main className="admin-main">
        <div className="admin-header">
          <h2>Feedback</h2>
          <button 
            className={`admin-refresh-btn ${loading ? 'loading' : ''}`} 
            onClick={fetchFeedbacks} 
            disabled={loading}
          >
            <FaSyncAlt style={{marginRight:"5px"}}  className={loading ? 'spinning' : ''} /> 
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {error && (
          <div className="admin-error-message">
            {error}
          </div>
        )}
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Comment</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f.id}>
                  <td>{f.comment}</td>
                  <td>{new Date(f.created_at).toLocaleDateString()}</td>
                  <td>{f.rating}</td>
                  <td>
                    <button
                      className="admin-edit-btn"
                      onClick={() => handlePublic(f.id, !f.is_public)}
                    >
                      {f.is_public ? "Remove" : "Add"}
                    </button>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(f.id)}
                    >
                     Delete
                    </button>
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
    </div>
  );
}