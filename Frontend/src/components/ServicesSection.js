import service1 from "../assets/Consultation initiale.jpg";
import service2 from "../assets/Massage thérapeutique.jpg";
import service3 from "../assets/Physical therapy session.jpg";
import service4 from "../assets/Respiratory physical therapy.jpg";
import "./ServicesSection.css";
import { useNavigate } from "react-router-dom";

export default function ServicesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-5 services-section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Our Top Rated Services</h2>
          <button className="btn-outline-dark" onClick={() => navigate("/services")}>View All Services</button>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card h-100">
              <img src={service1} className="card-img-top" alt="Remote IT Support" />
              <div className="card-body">
                <h6 className="card-title">Initial consultation</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100">
              <img src={service2} className="card-img-top" alt="Web & Cloud Hosting" />
              <div className="card-body">
                <h6 className="card-title">Therapeutic massage</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100">
              <img src={service3} className="card-img-top" alt="Custom Software Development" />
              <div className="card-body">
                <h6 className="card-title">Physical therapy session</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100">
              <img src={service4} className="card-img-top" alt="Cybersecurity & Security Audits" />
              <div className="card-body">
                <h6 className="card-title">Respiratory physical therapy</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}