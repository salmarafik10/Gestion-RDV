import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.jpg";
import "./AboutBlog.css";

export default function AboutBlog() {
    const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);
  return (
    <section className="about-blog-section">
      <h2>Our Blog</h2>
      <div className="about-blog-cards">
        <div className="about-blog-card">
          <img src={blog1} alt="Blog 1" />
          <div className="about-blog-date">
             <CalendarIcon /> October | 2023
          </div>
          <div className="about-blog-title">Rehabilitation at any age</div>
        </div>
        <div className="about-blog-card">
          <img src={blog2} alt="Blog 2" />
          <div className="about-blog-date">
             <CalendarIcon /> November | 2024
          </div>
          <div className="about-blog-title">The effectiveness of manual therapies</div>
        </div>
        <div className="about-blog-card">
          <img src={blog3} alt="Blog 3" />
          <div className="about-blog-date">
             <CalendarIcon /> September | 2024
          </div>
          <div className="about-blog-title">Regain mobility thanks to physiotherapy</div>
        </div>
      </div>
    </section>
  );
}