import logo from "../assets/logo-white.png";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
export default function Footer() {
  return (
    <footer style={{ background: "#101c54", color: "#fff", padding: "40px 0 0 0", marginTop: 0 }}>
      <div className="container d-flex flex-wrap justify-content-between align-items-start pb-4">
        <div>
          <img src={logo} alt="Logo" style={{ width: 150, marginBottom: 10}} />
        </div>
        <div>
          <h6 className="fw-bold">Opening Hours</h6>
          <p className="mb-1">Mon - Fri: 9.00AM - 6.00PM</p>
          <p className="mb-1">Saturday: 9.00AM - 12.00AM</p>
          <p className="mb-1">Sunday: Closed</p>
        </div>
        <div>
          <h6 className="fw-bold">Social Media</h6>
          <p className="mb-1">Twitter ↗</p>
          <p className="mb-1">LinkedIn ↗</p>
          <p className="mb-1">Facebook ↗</p>
          <p className="mb-1">Instagram ↗</p>
        </div>
        <div>
          <h6 className="fw-bold">Contacts</h6>
          <p className="mb-1"><FaPhone role="img" aria-label="phone"></FaPhone> +212 689-837366<br />+212 667-894329</p>
          <p className="mb-1"><FaEnvelope role="img" aria-label="mail"></FaEnvelope> rendezvous@gmail.com<br />www.webrendezvous.ma</p>
          <p className="mb-1"><FaMapMarkerAlt role="img" aria-label="location"></FaMapMarkerAlt> 257 Avenue des Palmiers,<br />Agdal, Rabat 10090, Maroc</p>
        </div>
      </div>
      <div className="text-center py-3" style={{ background: "#0a1333" }}>
        Copyrights © 2025. All Rights Reserved
      </div>
    </footer>
  );
}