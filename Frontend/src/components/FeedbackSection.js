import { useState } from "react";
import axios from "axios";
import "./FeedbackSection.css";

export default function FeedbackSection() {
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!rating || !message) {
      setError("Please fill in all fields");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    try {
      // Récupérer l'ID du client connecté depuis localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to submit feedback");
        return;
      }

      // Décoder le token pour obtenir l'ID du client
      const payload = JSON.parse(atob(token.split('.')[1]));
      const clientId = payload.id;

      await axios.post("http://localhost:5000/api/feedback", {
        client_id: clientId,
        rating: parseInt(rating),
        comment: message
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess("Thank you for your feedback!");
      setRating("");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting feedback");
    }
  };

  return (
    <section className="feedback-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">We Value Your Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rating (1 to 5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Write here message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  required
                ></textarea>
              </div>
              {error && <div className="text-danger mb-2">{error}</div>}
              {success && <div className="text-success mb-2">{success}</div>}
              <div className="text-center">
                <button type="submit" className="btn-feedback">
                  Sent Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}