import "./AboutEquipment.css";

// Importe les images que tu auras placées dans src/assets/
import equipment1 from "../assets/equi1.jpg";
import equipment2 from "../assets/equi2.jpg";
import equipment3 from "../assets/equi3.jpg";

export default function AboutEquipment() {
  return (
    <section className="about-equipment-section">
      <div className="container">
        {/* Section texte en haut */}
        <div className="equipment-header">
          <h2>Our Physiotherapy Equipment</h2>
          <p>
            Our clinic is equipped with state-of-the-art tools designed to support your rehabilitation and wellness journey. From advanced electrotherapy devices to ergonomic exercise accessories, we provide high-quality equipment tailored to your therapeutic needs. 
          </p>
        </div>

        {/* Section images en bas */}
        <div className="equipment-images">
          <div className="equipment-card">
            <img src={equipment1} alt="Physiotherapy Equipment 1" />
          </div>
          <div className="equipment-card">
            <img src={equipment2} alt="Physiotherapy Equipment 2" />
          </div>
          <div className="equipment-card">
            <img src={equipment3} alt="Physiotherapy Equipment 3" />
          </div>
        </div>
      </div>
    </section>
  );
}