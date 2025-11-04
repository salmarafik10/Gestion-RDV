import NavRdv from "./NavRdv";
import Footer from "./Footer";
import "./RdvBooking.css";
import RdvStep1 from "./RdvStep1";
import RdvStep2 from "./RdvStep2";
import RdvStep3 from "./RdvStep3";
import RdvStep4 from "./RdvStep4";
import { useState, useEffect } from "react";
import axios from "axios";
import bg from "../assets/background3.png";
import { useNavigate } from "react-router-dom";

export default function RdvBooking() {
  const [timeSlot, setTimeSlot] = useState("");
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [user, setUser] = useState({ fullname: "", email: "", id: null });
  const [status, setStatus] = useState("available");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data))
      .catch(() => setServices([]));
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(() => setUser({ fullname: "", email: "", id: null }));
    }
  }, []);

  // Fonction pour combiner date et timeslot en timestamp MySQL
  function toTimestamp(date, timeSlot) {
    let [time, ampm] = timeSlot.split(" ");
    let [hour, minute] = time.split(":");
    hour = parseInt(hour, 10);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    const hh = String(hour).padStart(2, "0");
    const mm = minute || "00";
    return `${date} ${hh}:${mm}:00`;
  }

  const handleStep1 = (serviceId, dateValue, timeSlotValue, prescriptionFileValue) => {
    const service = services.find(s => s.id === parseInt(serviceId));
    setSelectedService(service);
    setDate(dateValue);
    setTimeSlot(timeSlotValue);
    setPrescriptionFile(prescriptionFileValue || null);
    if (!service.available) {
      setStatus("unavailable");
      setStep(2);
    } else {
      setStatus("available");
      setStep(3);
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("client_id", user.id);
      formData.append("service_id", selectedService.id);
      // Combine la date et le créneau pour le champ timestamp
      const appointmentDate = toTimestamp(date, timeSlot);
      formData.append("appointment_date", appointmentDate);
      formData.append("time_slot", timeSlot);
      formData.append("fullname", user.fullname || "");
      if (prescriptionFile) {
        formData.append("prescription", prescriptionFile);
      }
      await axios.post("http://localhost:5000/api/appointments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess(true);
      setStep(4);
    } catch (err) {
      alert("Erreur lors de la prise de rendez-vous");
    }
  };

  const handleCancel = () => {
    setStep(1);
    setSelectedService(null);
    setDate("");
    setStatus("available");
    setSuccess(false);
  };

  return (
    <div className="rdv-booking-bg">
      <NavRdv/>
      <div
        className="rdv-hero-section"
      >
        <div className="container rdv-hero-content">
          <div className="rdv-hero-left">
            <h1 className="rdv-hero-title">Book In 3 Easy Steps!</h1>
            <p className="rdv-hero-subtitle">
              Select Your Service,Choose Your Time Slot and it's Done.
            </p>
            <button className="rdv-learn-btn" onClick={() => navigate("/about")}>
              Learn more
            </button>
          </div>
          <div>
            {step === 1 && (
              <RdvStep1 services={services} onNext={handleStep1} />
            )}
            {step === 2 && <RdvStep2 onBack={() => setStep(1)} />}
            {step === 3 && (
              <RdvStep3
                user={user}
                date={date}
                timeSlot={timeSlot}
                service={selectedService}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
            {step === 4 && (
              <RdvStep4
                user={user}
                date={date}
                timeSlot={timeSlot}
                service={selectedService}
                onDone={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}