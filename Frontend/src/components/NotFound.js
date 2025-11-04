import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-number">404</div>
        <div className="not-found-title">Oops!</div>
        <div className="not-found-description">
          Oh, you must be lost, there is no such page.
        </div>
        <button className="not-found-button" onClick={handleGoHome}>
          Go to the home page
        </button>
      </div>
      
      {/* Background decorative elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  );
};

export default NotFound; 