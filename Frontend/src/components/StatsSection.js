import "./StatsSection.css";
import { useNavigate } from "react-router-dom";

export default function StatsSection() {
  const navigate = useNavigate();
  return (
    <section className="stats-section py-5">
      <div className="container">
        <h2 className="text-center text-white mb-5">Patient Satisfaction Stats</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-md-3 mb-3">
            <div className="stats-card">
              <h3 className="stats-number">1M+</h3>
              <p className="stats-label">More than Patient</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stats-card">
              <h3 className="stats-number">100K+</h3>
              <p className="stats-label">Patients Satisfied</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stats-card">
              <h3 className="stats-number">128+</h3>
              <p className="stats-label">Live in over Cities</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stats-card">
              <h3 className="stats-number">4.8</h3>
              <p className="stats-label">Patient Rating</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn-stats" onClick={() => navigate("/RdvBooking")}>
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
}