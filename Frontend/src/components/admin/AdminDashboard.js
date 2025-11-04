import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminDashboard.css";
import { FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [customersToday, setCustomersToday] = useState(0);
  const [appointmentsPerMonth, setAppointmentsPerMonth] = useState([]);
  const [feedbackStats, setFeedbackStats] = useState([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch stats from backend
  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      // Appels API à adapter selon tes routes backend
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      
      const headers = { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      // Nombre de rendez-vous aujourd'hui
      const resAppToday = await fetch("http://localhost:5000/api/admin/stats/appointments-today", { headers });
      if (!resAppToday.ok) throw new Error("Failed to fetch appointments today");
      const appTodayData = await resAppToday.json();
      setAppointmentsToday(appTodayData.count || 0);

      // Nombre de clients aujourd'hui
      const resCustToday = await fetch("http://localhost:5000/api/admin/stats/customers-today", { headers });
      if (!resCustToday.ok) throw new Error("Failed to fetch customers today");
      const custTodayData = await resCustToday.json();
      setCustomersToday(custTodayData.count || 0);

      // Rendez-vous par mois
      const resAppMonth = await fetch("http://localhost:5000/api/admin/stats/appointments-per-month", { headers });
      if (!resAppMonth.ok) throw new Error("Failed to fetch appointments per month");
      const appMonthData = await resAppMonth.json();
      setAppointmentsPerMonth(Array.isArray(appMonthData) ? appMonthData : []);

      // Feedback par rating
      const resFeedback = await fetch("http://localhost:5000/api/admin/stats/feedback", { headers });
      if (!resFeedback.ok) throw new Error("Failed to fetch feedback stats");
      const feedbackData = await resFeedback.json();
      setFeedbackStats(Array.isArray(feedbackData) ? feedbackData : [0, 0, 0, 0, 0]);
      
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to refresh data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Préparation des données pour les graphiques
  const barData = {
    labels: appointmentsPerMonth.map((d) => d.month),
    datasets: [
      {
        label: "Appointments",
        data: appointmentsPerMonth.map((d) => d.count),
        backgroundColor: "#ffe066",
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: [
      "1 étoile",
      "2 étoiles",
      "3 étoiles",
      "4 étoiles",
      "5 étoiles",
    ],
    datasets: [
      {
        data: feedbackStats,
        backgroundColor: [
          "#ffb347",
          "#ffe066",
          "#6ec6ff",
          "#a3e635",
          "#2d39b4",
        ],
      },
    ],
  };

  return (
    <div className="admin-bg">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src={require("../../assets/logo-white.png")} alt="Logo" />
        </div>
        <ul className="admin-menu">
          <li className="active" onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/admin/services")}>Services</li>
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
          <h2>Dashboard</h2>
          <button 
            className={`admin-refresh-btn ${loading ? 'loading' : ''}`} 
            onClick={fetchStats} 
            disabled={loading}
          >
            <FaSyncAlt style={{marginRight:"5px"}} className={loading ? 'spinning' : ''} /> 
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {error && (
          <div className="admin-error-message">
            {error}
          </div>
        )}
        <div className="admin-stats-row">
          <div className="admin-stats-card">
            <div>Appointment</div>
            <div className="admin-stats-number">{appointmentsToday}</div>
            <div>today</div>
          </div>
          <div className="admin-stats-card">
            <div>New Patients </div>
            <div className="admin-stats-number">{customersToday}</div>
            <div>today</div>
          </div>
        </div>
        <div className="admin-charts-row">
          <div className="admin-chart-card">
            <div className="admin-chart-title">Appointment per month</div>
            <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <div className="admin-chart-card">
            <div className="admin-chart-title">Patients  feedback</div>
            <Pie data={pieData} />
            <div className="admin-pie-legend">
              {["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles"].map((label, i) => (
                <span key={i} style={{ color: pieData.datasets[0].backgroundColor[i], marginRight: 12 }}>
                  ● {label} ({feedbackStats[i]})
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}