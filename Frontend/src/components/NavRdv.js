import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-blue.png";
import "./NavRdv.css";

export default function NavRdv() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="navbar-bg">
      <nav className="navbar container">
        <div className="navbarlogo" >
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
        </ul>
        <button
          className="navbar-appointment-btn" onClick={() => navigate("/RdvBooking")}>
          Make Appointment
        </button>
      </nav>
    </header>
  );
}