import { useState, useEffect } from "react";
import "./RdvStep1.css";

export default function RdvStep1({ services, onNext }) {
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");
  const [service, setService] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  // Met à jour le service sélectionné
  useEffect(() => {
    const selected = services.find(s => String(s.id) === String(serviceId));
    setService(selected);
    setShowPrescription(selected?.requires_prescription);
  }, [serviceId, services]);

  // Génère les créneaux horaires selon la date et la durée du service
  function getTimeSlots(date, duration = 30) {
    if (!date) return [];
    const slots = [];
    const d = new Date(date);
    const day = d.getDay(); // 0=dim, 1=lun, ..., 6=sam
    // Lundi à vendredi : 9h-12h et 14h-18h
    if (day >= 1 && day <= 5) {
      for (let h = 9; h < 12; h += duration / 60) {
        slots.push(`${String(Math.floor(h)).padStart(2, "0")}:${h % 1 === 0.5 ? "30" : "00"} AM`);
      }
      for (let h = 14; h < 18; h += duration / 60) {
        slots.push(`${String(Math.floor(h > 12 ? h - 12 : h)).padStart(2, "0")}:${h % 1 === 0.5 ? "30" : "00"} PM`);
      }
    }
    // Samedi : 9h-12h
    if (day === 6) {
      for (let h = 9; h < 12; h += duration / 60) {
        slots.push(`${String(Math.floor(h)).padStart(2, "0")}:${h % 1 === 0.5 ? "30" : "00"} AM`);
      }
    }
    return slots;
  }

  const slots = date && service ? getTimeSlots(date, service.duration || 30) : [];

  const handleBook = (e) => {
    e.preventDefault();
    if (!serviceId || !date || !timeSlot) {
      setError("Please select a service, a date, and a time slot.");
      return;
    }
    if (showPrescription && !prescriptionFile) {
      setError("Please upload your prescription for this service.");
      return;
    }
    setError("");
    // Passe tout au parent (ajoute prescriptionFile si besoin)
    onNext(serviceId, date, timeSlot, prescriptionFile);
  };

  return (
    <div className="rdv-step1-bg">
      <form className="rdv-step1-form" onSubmit={handleBook}>
        <h4 className="mb-4 fw-bold">Pick The Service You Want</h4>
        <div className="mb-3">
           <div className="mb-3">
          <label>Choose the service</label>
          <select
            className="form-select"
            value={serviceId}
            onChange={e => setServiceId(e.target.value)}
            required
          >
            <option value="">Services</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
          <label>Enter the date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
       
         <div className="mb-3">
          <label>Enter the TimeSlot</label>
          <select
            className="form-select"
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value)}
            required
            disabled={!date || !service}
          >
            <option value="">Time</option>
            {slots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        {showPrescription ? (
  <div className="mb-3">
    <label>
      You need to upload your prescription for this service
    </label>
    <input
      type="file"
      className="form-control"
      accept="image/*,application/pdf"
      onChange={e => setPrescriptionFile(e.target.files[0])}
      required
    />
  </div>
) : null}
        {error && <div className="text-danger mb-2">{error}</div>}
        <button className="btn btn-dark w-100" type="submit">Book</button>
      </form>
    </div>
  );
}