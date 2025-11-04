import Header from "./Header";
import Footer from "./Footer";
import ServiceCard from "./ServiceCard";
import service1 from "../assets/Consultation initiale.jpg";
import service2 from "../assets/Massage thérapeutique.jpg";
import service3 from "../assets/Physical therapy session.jpg";
import service4 from "../assets/Respiratory physical therapy.jpg";
import service5 from "../assets/Drainage lymphatique.png";
import service6 from "../assets/Cryothérapie.png";

export default function Services() {
  const services = [
    {
      title: "Initial consultation",
      description: "Comprehensive evaluation including posture analysis, range of motion assessment, and personalized treatment planning.",
      features: [
        "60-minute detailed assessment",
        "Customized rehabilitation plan", 
        "Digital report with exercises",
        "Follow-up scheduling"
      ],
      price: "200 Dh",
      duration: "60 Min",
      image: service1,
      imageAlt: "Consultation initiale"
    },
    {
      title: "Therapeutic massage",
      description: "Deep tissue manipulation to relieve muscle tension, improve circulation and reduce stress.",
      features: [
        "Targeted pressure points",
        "Aromatherapy available",
        "Post-massage stretching guidance"
      ],
      price: "300 Dh",
      duration: "60 Min", 
      image: service2,
      imageAlt: "Therapeutic massage"
    },
    {
      title: "Physical therapy session",
      description: "Evidence-based rehabilitation for injuries, post-surgical recovery and chronic pain management.",
      features: [
        "Electrotherapy included",
        "Progressive exercise plan",
        "Weekly progress tracking"
      ],
      price: "250 Dh",
      duration: "30 Min",
      image: service3,
      imageAlt: "Physical therapy session"
    },
    {
      title: "Respiratory physical therapy",
      description: "Specialized techniques to improve lung capacity and breathing patterns.",
      features: [
        "Diaphragm rehabilitation",
        "Mucus clearance techniques",
        "Incentive spirometer training"
      ],
      price: "350 Dh",
      duration: "60 Min",
      image: service4,
      imageAlt: "Respiratory physical therapy"
    },
    {
      title: "Manual lymphatic drainage",
      description: "Gentle rhythmic movements to stimulate lymph flow and reduce edema.",
      features: [
        "Post-surgical recovery",
        "Lymphedema management",
        "Detoxification effects",
        "Combined with compression"
      ],
      price: "180 Dh",
      duration: "30 Min",
      image: service5,
      imageAlt: "Manual lymphatic drainage"
    },
    {
      title: "Cryotherapy / Thermotherapy",
      description: "Temperature-based therapy for pain relief and inflammation control.",
      features: [
        "Ice pack applications",
        "Paraffin wax treatment",
        "Contrast therapy option",
        "Injury-specific protocols"
      ],
      price: "150 Dh",
      duration: "30 Min",
      image: service6,
      imageAlt: "Cryotherapy / Thermotherapy"
    },
  ];

  return (
    <div className="services-bg">
      <Header />
      
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          features={service.features}
          price={service.price}
          duration={service.duration}
          image={service.image}
          imageAlt={service.imageAlt}
          reverse={index % 2 === 1} // Alterne l'ordre image/texte
        />
      ))}

      <Footer />
    </div>
  );
}