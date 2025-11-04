import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminServices.css";
import { FaPlus, FaSyncAlt, FaCog, FaRedo, FaClock, FaMoneyBill } from "react-icons/fa";

export default function AdminServices() {
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [services, setServices] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editService, setEditService] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("available");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Pagination
  const pageSize = 7;
  const totalPages = Math.ceil(total / pageSize);

  // Fetch services
  const fetchServices = async () => {
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

      const res = await fetch(`http://localhost:5000/api/admin/services?page=${page}&limit=${pageSize}`, { headers });
      
      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }
      
      const data = await res.json();
      setServices(Array.isArray(data.services) ? data.services : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to refresh services. Please try again.");
      setServices([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  // Add service
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const res = await fetch("http://localhost:5000/api/admin/services", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
          available: status === "available",
          created_at: date,
          duration: Number(duration),
          price: Number(price),
          requires_prescription: requiresPrescription
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add service");
      }

      setShowAdd(false);
      setName("");
      setStatus("available");
      setDate("");
      setDuration("");
      setPrice("");
      setRequiresPrescription(false);
      fetchServices();
    } catch (err) {
      console.error("Error adding service:", err);
      setError("Failed to add service. Please try again.");
    }
  };

  // Edit service
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const res = await fetch(`http://localhost:5000/api/admin/services/${editService.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name,
          available: status === "available",
          duration: Number(duration),
          price: Number(price),
          requires_prescription: requiresPrescription
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update service");
      }

      setShowEdit(false);
      setEditService(null);
      setName("");
      setStatus("available");
      setDuration("");
      setPrice("");
      setRequiresPrescription(false);
      fetchServices();
    } catch (err) {
      console.error("Error updating service:", err);
      setError("Failed to update service. Please try again.");
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        };

        const res = await fetch(`http://localhost:5000/api/admin/services/${id}`, { 
          method: "DELETE",
          headers
        });

        if (!res.ok) {
          throw new Error("Failed to delete service");
        }

        fetchServices();
      } catch (err) {
        console.error("Error deleting service:", err);
        setError("Failed to delete service. Please try again.");
      }
    }
  };

  // Open edit modal
  const openEdit = (service) => {
    setEditService(service);
    setName(service.name);
    setStatus(service.available ? "available" : "unavailable");
    setDuration(service.duration || "");
    setPrice(service.price || "");
    setRequiresPrescription(!!service.requires_prescription);
    setShowEdit(true);
  };

  return (
    <div className="admin-bg">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src={require("../../assets/logo-white.png")} alt="Logo" />
        </div>
        <ul className="admin-menu">
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li className="active" onClick={() => navigate("/admin/services")}>Services</li>
          <li onClick={() => navigate("/admin/appointments")}>Appointments</li>
          <li onClick={() => navigate("/admin/clients")}>Clients</li>
          <li onClick={() => navigate("/admin/feedback")}>Feedback</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href = "/"}}>Log out</li>
        </ul>
      </aside>
      <main className="admin-main">
        <div className="admin-header">
          <h2>Services</h2>
          <div>
            <button className="admin-add-btn" onClick={() => setShowAdd(true)}>
              <FaPlus /> Add
            </button>
            <button 
              className={`admin-refresh-btn ${loading ? 'loading' : ''}`} 
              onClick={fetchServices} 
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
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>DATE</th>
                  <th>DURATION</th>
                  <th>PRICE</th>
                  <th>PRESCRIPTION</th>
                  <th>STATUS</th>
                  <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(services || []).map((s) => (
                <tr key={s.id}>
               <td>{s.name}</td>
                <td>{new Date(s.created_at).toLocaleDateString()}</td>
                <td>{s.duration} min</td>
                <td>{s.price} dh</td>
                <td>{s.requires_prescription ? "Yes" : "No"}</td>
                <td>
                  <span className={`status-badge ${s.available ? "available" : "unavailable"}`}>
                    {s.available ? "available" : "Unavailable"}
                  </span>
                </td>
                  <td>
                    <button className="admin-edit-btn" onClick={() => openEdit(s)}>
                      Edit
                    </button>
                    <button className="admin-delete-btn" onClick={() => handleDelete(s.id)}>
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
              {`1-${Math.min(page * pageSize, total)} of ${total} Results`}
            </span>
          </div>
        </div>
      </main>

      {/* Add Modal */}
      {showAdd && (
        <div className="admin-modal-bg">
          <form className="admin-modal-content" onSubmit={handleAdd}>
            <div className="mb-3 input-group">
              <input
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="input-group-text"><FaCog /></span>
            </div>
            <div className="mb-3 input-group">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="available">available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <span className="input-group-text"><FaRedo /></span>
            </div>
    
            <div className="mb-3 input-group">
              <input
                className="form-control"
                placeholder="Duration (min)"
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                required
                min={1}
              />
              <span className="input-group-text"><FaClock /></span>
            </div>
            <div className="mb-3 input-group">
              <input
                className="form-control"
                placeholder="Price (dh)"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                min={0}
                step="0.01"
              />
              <span className="input-group-text"><FaMoneyBill /></span>
            </div>
            <div className="mb-3 form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={requiresPrescription}
                onChange={e => setRequiresPrescription(e.target.checked)}
                id="prescriptionCheck"
              />
              <label className="form-check-label" htmlFor="prescriptionCheck">
                Prescription required
              </label>
            </div>
            <div className="d-flex gap-3">
              <button className="admin-modal-add-btn flex-fill" type="submit">
                Add
              </button>
              <button className="admin-modal-cancel-btn flex-fill" type="button" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="admin-modal-bg">
          <form className="admin-modal-content" onSubmit={handleEdit}>
             <div className="mb-3 input-group">
              <input
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="input-group-text"><FaCog /></span>
            </div>
            <div className="mb-3 input-group">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="available">available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <span className="input-group-text"><FaRedo /></span>
            </div>
            <div className="mb-3 input-group">
              <input
                className="form-control"
                placeholder="Duration (min)"
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                required
                min={1}
              />
              <span className="input-group-text"><FaClock /></span>
            </div>
            <div className="mb-3 input-group">
              <input
                className="form-control"
                placeholder="Price (dh)"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                min={0}
                step="0.01"
              />
              <span className="input-group-text"><FaMoneyBill /></span>
            </div>
            <div className="mb-3 form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={requiresPrescription}
                onChange={e => setRequiresPrescription(e.target.checked)}
                id="prescriptionCheck"
              />
              <label className="form-check-label" htmlFor="prescriptionCheck">
                Prescription required
              </label>
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