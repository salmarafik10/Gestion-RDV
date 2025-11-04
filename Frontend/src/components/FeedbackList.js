import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./FeedbackList.css";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/feedback/public")
    .then((res) => setFeedbacks(res.data))
    .catch(() => setFeedbacks([]));
}, []);

  // Paramètres du carrousel
  const settings = {
    dots: true,
    infinite: feedbacks.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, feedbacks.length),
    slidesToScroll: 3,
    arrows: feedbacks.length > 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(2, feedbacks.length),
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="feedback-list-section py-5">
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: "#101c54" }}>
          What Our Patients Say
        </h2>
        {feedbacks.length === 0 && (
          <div className="text-center text-muted">No feedback yet.</div>
        )}
        {feedbacks.length > 0 && (
          <Slider {...settings}>
            {feedbacks.map((fb) => (
              <div key={fb.id}>
                <div className="feedback-card p-4 h-100 mx-2">
                  <div className="feedback-stars mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < fb.rating ? "star-filled" : "star-empty"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="feedback-message mb-2">
                    "{fb.comment}"
                  </div>
                  <div className="feedback-user text-end">
                    — <b>{fb.fullname}</b>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}