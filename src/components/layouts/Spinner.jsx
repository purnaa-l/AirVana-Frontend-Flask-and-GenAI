import React, { Fragment } from 'react';
import './Spinner.css'; // Make sure to import the CSS

const Spinner = () => {
  return (
    <Fragment>
      <div className="spinner-container">
        <div className="loading-text">Loading<span className="dot">...</span></div>
      </div>
    </Fragment>
  );
}

export default Spinner;
