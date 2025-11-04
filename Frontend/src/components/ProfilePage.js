import Nav from "./Nav";
import Footer from "./Footer";
import ProfileForm from "./ProfileForm";
import BookingHistory from "./BookingHistory";
import CancelModal from "./CancelModal";
import "./ProfilePage.css";
import axios from "axios";
import { useState } from "react";
import { FaSignOutAlt} from "react-icons/fa";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Pour ouvrir le modal d'annulation
  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/appointments/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Ici, tu peux soit recharger la page, soit mettre à jour la liste des bookings
      window.location.reload(); // simple pour voir le changement
    } catch (err) {
      alert("Erreur lors de l'annulation du rendez-vous");
    }
  };
  // Pour fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="profile-bg">
      <Nav />
      <div className="container profile-main">
        <div className="profile-left">
          <ProfileForm />
        </div>
        <div className="profile-right">
          <BookingHistory onCancelClick={handleCancelClick} />
        </div>
      </div>
      <div className="profile-logout-section">
        <div className="text-center mb-3">Done for now?</div>
        <button
          className="profile-logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/"; // ou navigate("/login")
          }}
        >
          Log out <FaSignOutAlt style={{ marginLeft: 8 }}/>
        </button>
      </div>
      <Footer />
      {showModal && (
        <CancelModal booking={selectedBooking} onClose={handleCloseModal} onCancelBooking={handleCancelBooking} />
      )}
    </div>
  );
}