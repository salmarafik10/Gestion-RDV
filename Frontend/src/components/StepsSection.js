import "./StepsSection.css";
import { useNavigate } from "react-router-dom";
import step1Icon from "../assets/step1-select.png";
import step2Icon from "../assets/step2-calendar.png";
import step3Icon from "../assets/step3-done.png";


export default function StepsSection() {
  const navigate = useNavigate();
  return (
    <section className="container my-5 steps-section">
      <h4 className="fw-bold text-center mb-5">Book your appointment in 3 easy steps</h4>
      
      <div className="row justify-content-center mb-5">
        <div className="col-md-4 mb-4">
          <div className="step-card">
            <div className="step-icon">
            <img src={step1Icon} alt="Select Service" className="step-image" />
            </div>
            <h6 className="step-title">Select Service</h6>
            <p className="step-description">
              Read verified reviews our patients like you and choose your service.
            </p>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="step-card">
            <div className="step-icon">
            <img src={step2Icon} alt="Select Service" className="step-image" />
            </div>
            <h6 className="step-title">Book Your Day</h6>
            <p className="step-description">
            Our online booking system allows you to select a time that is most convenient for you.
            </p>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="step-card">
            <div className="step-icon">
            <img src={step3Icon} alt="Select Service" className="step-image" />
            </div>
            <h6 className="step-title">Done</h6>
            <p className="step-description">
              Your appointment is confirmed and your service provider is ready.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button className="btn-book-appointment" onClick={() => navigate("/RdvBooking")}>
          Book Appointment
        </button>
      </div>
    </section>
  );
}