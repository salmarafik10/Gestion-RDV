import teamPhoto from "../assets/team-photo.jpg"; // Image de l'équipe complète
import "./TeamSection.css";
import { useNavigate } from "react-router-dom";

export default function TeamSection() {
  const navigate = useNavigate();
  return (
    <section className="team-section">
      <div className="container">
        <div className="team-content">
          <div className="team-text">
            <h2>Our Professional Team</h2>
            <p>
              Meet our dedicated team of healthcare professionals who are committed to providing 
              the highest quality care and exceptional service to our patients. Our experienced 
              team combines expertise with compassion to ensure the best possible outcomes for 
              everyone we serve.
            </p>
            <button className="btn-view-team" onClick={() => navigate("/about")}>
            Discover Our Team
            </button>
          </div>
          <div className="team-image">
            <img src={teamPhoto} alt="Our Professional Team" />
          </div>
        </div>
      </div>
    </section>
  );
}
