import aboutImg from "../assets/about-goal.png";
import "./AboutSection.css";
import { useNavigate } from "react-router-dom";

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <section className="container my-5 d-flex align-items-center justify-content-between flex-wrap about-section">
      <div className="aboutDiv">
        <h3 className="fw-bold">Few Words About Our Service</h3><br/>
        <p>Tailored physiotherapy treatments, customized to your specific needs<br/>for visible and lasting results – Book your appointment today<br/>and take the first step toward your well-being. </p> <br/>
        <button className="btn-primary" onClick={() => navigate("/about")}>More About Us</button>
      </div>
      <img src={aboutImg} alt="About us" className="about-img ms-4" />
    </section>
  );
}