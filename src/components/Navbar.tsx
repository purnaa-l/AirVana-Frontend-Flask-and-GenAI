import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md" style={{ backgroundColor: '#000', padding: '1rem 0' }}>
      <div className="container-fluid">
        {/* Logo Section with Tree Icon */}
        <Link to="/" className="navbar-brand d-flex align-items-center" style={{ color: '#fff', fontFamily: 'Poiret One' }}>
          <FontAwesomeIcon icon={faTree} className="me-2" />
          AirSphere
        </Link>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: '#fff',  font:'Poiret One'}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/fetch-aqi" className="nav-link" style={{ color: '#fff' }}>Fetch AQI</Link>
            </li>
            <li className="nav-item">
              <Link to="/predict-aqi" className="nav-link" style={{ color: '#fff' }}>Predict AQI</Link>
            </li>
            <li className="nav-item">
              <Link to="/view-past-aqis" className="nav-link" style={{ color: '#fff' }}>View Past AQIs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
