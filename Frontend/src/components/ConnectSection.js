import "./ConnectSection.css";
import { useNavigate } from "react-router-dom";

export default function ConnectSection() {
  const navigate = useNavigate();
  return (
    <section className="connect-section py-5">
      <div className="container text-center">
        <h2 className="connect-title mb-3">Let's Connect</h2>
        <p className="connect-description mb-5">
          Contact us to learn more or if you have any questions — our team is here to help.
        </p>
        <button className="connect-button" onClick={() => navigate("/contact")}>
          Contact Us
        </button>
      </div>
    </section>
  );
}