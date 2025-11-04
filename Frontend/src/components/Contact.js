import Header from "./Header";
import Footer from "./Footer";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact-bg">
      <Header />
    

      {/* Contact Info + Map */}
      <section className="contact-info-section">
        <div className="container contact-info-container">
          <div className="contact-info-left">
            <h2>Rabat</h2>
            <div className="contact-info-item">
              <FaMapMarkerAlt className="contact-info-icon" />
              <div>
                <div className="contact-info-label">Address</div>
                <div>257 Avenue des Palmiers,<br />Agdal Rabat 10090, Maroc</div>
              </div>
            </div>
            <div className="contact-info-item">
              <FaPhoneAlt className="contact-info-icon" />
              <div>
                <div className="contact-info-label">Phone Number</div>
                <div>+212 667-894329</div>
              </div>
            </div>
            <div className="contact-info-item">
              <FaEnvelope className="contact-info-icon" />
              <div>
                <div className="contact-info-label">Email Address</div>
                <div>rendezvous@gmail.com</div>
              </div>
            </div>
            <button
              className="contact-learn-btn"
              onClick={() => navigate("/about")}
            >
              Learn more about us
            </button>
            <div className="contact-booked-info">
              34 booked in the last 24 hours
            </div>
          </div>
          <div className="contact-info-right">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.393964073839!2d-6.849818684800964!3d34.00867518061616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c9b1e2e2b2b%3A0x2e2e2e2e2e2e2e2e!2s257%20Avenue%20des%20Palmiers%2C%20Rabat%2010090%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1689600000000!5m2!1sfr!2sma"
              width="100%"
              height="320"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}