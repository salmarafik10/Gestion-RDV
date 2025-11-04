import standard1 from "../assets/standard1.png";
import standard2 from "../assets/standard2.png";
import standard3 from "../assets/standard3.png";
import { useNavigate } from "react-router-dom";
import "./AboutStandards.css";
import { FaCheckCircle } from "react-icons/fa"; // Pour les icônes de coche

export default function AboutStandards() {
  const navigate = useNavigate();

  return (
    <section className="about-standards-section">
      <div className="container about-standards-content">
        {/* Partie gauche : Texte et liste */}
        <div className="standards-text-content">
          <h2>We Maintain The Highest Standards For Our Patients </h2>
          <ul className="standards-list">
            <li>
              <FaCheckCircle className="check-icon" /> Hygiene Excellence
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Certified Practitioners
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Personalized Care
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Punctuality Guarantee
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Evidence-Based Methods
            </li>
          </ul>
          <button className="btn-book-appointment" onClick={() => navigate("/RdvBooking")}>
            Book Appointment
          </button>
        </div>

        {/* Partie droite : Images */}
        <div className="standards-images">
          <div className="standards-image-wrapper top-right">
            <img src={standard1} alt="Woman with glasses" />
          </div>
          <div className="standards-image-wrapper middle">
            <img src={standard2} alt="Two women" />
          </div>
          <div className="standards-image-wrapper bottom-right">
            <img src={standard3} alt="Man and woman" />
          </div>
        </div>
      </div>
    </section>
  );
}