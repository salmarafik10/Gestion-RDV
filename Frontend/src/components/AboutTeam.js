import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
import team4 from "../assets/team4.png";
import "./AboutTeam.css";

export default function AboutTeam() {
  return (
    <section className="about-team-section">
      <div className="container">
        <h2>Our Professionals Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src={team1} alt="John Smith" />
            <div className="team-info">
              <h3>Sarah Johnson</h3>
              <p>Designation: Rééducation sportive</p>
              <p>Experience: 8 Years</p>
            </div>
          </div>
          
          <div className="team-card">
            <img src={team2} alt="Emily Johnson" />
            <div className="team-info">
              <h3>Emily Johnson</h3>
              <p>Designation: Rhumatologie & arthrose</p>
              <p>Experience: 5 Years</p>
            </div>
          </div>
          
          <div className="team-card">
            <img src={team3} alt="Michael Williams" />
            <div className="team-info">
              <h3>Michael Williams</h3>
              <p>Designation: Kiné périnatale</p>
              <p>Experience: 7 Years</p>
            </div>
          </div>
          
          <div className="team-card">
            <img src={team4} alt="Christopher Martinez" />
            <div className="team-info">
              <h3>Fatima El Amrani</h3>
              <p>Designation: Neurologie (AVC, Parkinson)</p>
              <p>Experience: 4 Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}