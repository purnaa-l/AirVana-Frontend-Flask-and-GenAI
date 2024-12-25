// components/CityCards.js
import React from 'react';
import './CityCards.css'; // Add the CSS file for styling

const CityCards = ({ cities, onCityClick }) => {
  return (
    <div className="city-cards-container">
      <h2 className="section-title">Available Cities</h2>
      <div className="city-cards">
        {cities.map((city, index) => (
          <div
            key={index}
            className="city-card"
            style={{ backgroundImage: `url(${city.bgImage})` }}
            onClick={() => onCityClick(city)}
          >
            <div className="city-card-overlay">
              <h3>{city.name}</h3>
              <p>Click to view details</p>
            </div>
          </div>
        ))}
      </div>
      <div className="no-data-message">
        <p>We are working on adding more cities...</p>
      </div>
    </div>
  );
};

export default CityCards;
