import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";
import { FaCheckCircle } from "react-icons/fa"; // Pour les icônes de coche
import {FaHourglass, FaMoneyBill } from "react-icons/fa";

export default function ServiceCard({ 
  title, 
  description, 
  features, 
  price, 
  duration, 
  image, 
  imageAlt,
  reverse = false 
}) {
  const navigate = useNavigate();

  return (
    <section className={`service-card-section ${reverse ? 'reverse' : ''}`}>
      <div className="service-card-container">
        <div className="service-card-image">
          <img src={image} alt={imageAlt} />
        </div>
        <div className="service-card-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <ul className="service-features">
            {features.map((feature, index) => (
              <li key={index}>
                <FaCheckCircle className="check-icon"/>
                {feature}
              </li>
            ))}
          </ul>
          <div className="service-info">
            <span className="price">
              <FaMoneyBill className="price-icon"/>
              {price}
            </span>
            <span className="duration">
              <FaHourglass className="clock-icon"/>
              {duration}
            </span>
          </div>
          <button className="book-appointment-btn" onClick={() => navigate("/RdvBooking")}>
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
}