import Header from "./Header";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import StepsSection from "./StepsSection";
import TeamSection from "./TeamSection";
import StatsSection from "./StatsSection";
import ConnectSection from "./ConnectSection";
import FeedbackSection from "./FeedbackSection";
import FeedbackList from "./FeedbackList";
import Footer from "./Footer";
export default function Home() {
  return (
    <div className="home-bg">
      <Header />
      <AboutSection />
      <ServicesSection />
      <StepsSection />
      <TeamSection />
      <StatsSection />
       <FeedbackList />
      <FeedbackSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}