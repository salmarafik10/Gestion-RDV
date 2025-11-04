import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminClients.css";
import { FaSyncAlt, FaFileExport, FaSearch } from "react-icons/fa";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Fetch clients
  const fetchClients = async () => {
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
        `http://localhost:5000/api/admin/clients?page=${page}&limit=${pageSize}&search=${search}`,
        { headers }
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch clients");
      }
      
      const data = await res.json();
      setClients(Array.isArray(data.clients) ? data.clients : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to refresh clients. Please try again.");
      setClients([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line
  }, [page]);

  // Recherche
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchClients();
    }, 400);
    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line
  }, [search]);

  // Export CSV
  const handleExport = () => {
    try {
      let csv = "FullName,Email,Phone,Appointments Number\n";
      clients.forEach((c) => {
        csv += `"${c.fullname}","${c.email}","${c.phone}",${c.appointments}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "clients.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting clients:", err);
      setError("Failed to export clients. Please try again.");
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
          <li className="active" onClick={() => navigate("/admin/clients")}>Clients</li>
          <li onClick={() => navigate("/admin/feedback")}>Feedback</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href = "/"}}>Log out</li>
        </ul>
      </aside>
      <main className="admin-main">
        <div className="admin-header">
          <h2>Clients</h2>
          <div>
            <button className="admin-export-btn" onClick={handleExport}>
              <FaFileExport /> Export
            </button>
            <button 
              className={`admin-refresh-btn ${loading ? 'loading' : ''}`} 
              onClick={fetchClients} 
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
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Appointments Number</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.fullname}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.appointments}</td>
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