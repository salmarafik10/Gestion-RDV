import aboutGoalImg from "../assets/goal.jpg";
import "./AboutGoal.css";

export default function AboutGoal() {
  return (
    <section className="about-goal-section">
      <div className="about-goal-img">
        <img src={aboutGoalImg} alt="Our Goal" />
      </div>
      <div className="about-goal-text">
        <h2>Our Goal</h2>
        <p>
          "Our mission is to provide exceptional, personalized physiotherapy care to help our patients regain mobility, reduce pain, and improve their overall quality of life. We believe in a holistic approach, combining advanced techniques, evidence-based practices, and compassionate care to address each individual's unique needs."
        </p>
      </div>
    </section>
  );
}