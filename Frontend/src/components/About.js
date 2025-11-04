import Header from "./Header";
import Footer from "./Footer";
import AboutGoal from "./AboutGoal";
import AboutBlog from "./AboutBlog";
import AboutStandards from "./AboutStandards";
import AboutTeam from "./AboutTeam";
import AboutEquipment from "./AboutEquipment";
import "./About.css";

export default function About() {
  return (
    <div className="about-bg">
      <Header />
      <AboutGoal />
      <AboutBlog />
      <AboutStandards />
      <AboutEquipment /> 
      <AboutTeam />
      <Footer />
    </div>
  );
}