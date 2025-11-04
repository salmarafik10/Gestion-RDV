import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-blue.png";
import sale from "../assets/sale.jpeg";
import Chatbot from "./chatbot/Chatbot";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="header-hero-bg">
      {/* Navbar */}
    <nav className="main-navbar container">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-links">
          <li>
            <Link className={location.pathname === "/home" ? "active" : ""} to="/home">Home</Link>
          </li>
          <li>
            <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About</Link>
          </li>
          <li>
            <Link className={location.pathname === "/services" ? "active" : ""} to="/services">Services</Link>
          </li>
          <li>
            <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">Contact</Link>
          </li>
           <li>
            <Link className={location.pathname === "/profilepage" ? "active" : ""} to="/profilepage">Profil</Link>
          </li>
          <li>
            <Chatbot/>
          </li>
        </ul>
        <button
          className="navbar-appointment-btn" onClick={() => navigate("/RdvBooking")}>
          Make Appointment
        </button>
      </nav>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container text-black">
          <h1 className="display-4 fw-bold">Modern and caring <br />physiotherapy clinic.</h1>
          <p className="lead">Rehabilitation, manual therapy, and personalized follow-up<br /> to help you regain comfort and mobility. Care focused on your goals.<br /><br /></p>
          <button className="hero-btn" onClick={() => navigate("/RdvBooking")}>
            Book Appointment
          </button>
        </div>
         <img  src={sale} alt="Salle de kinésithérapie"/>
      </section>
    </div>
  );
}