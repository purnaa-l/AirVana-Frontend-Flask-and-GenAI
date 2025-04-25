import React, { useState, useEffect } from 'react';
import './RegionalTrendsHeroSection.css';

function RegionalTrendsHeroSection() {
  const phrases = [
    'Welcome to Regional Trends!',
    'Real-time air quality predictions at your fingertips.',
    'Explore future AQI trends to make informed decisions.',
    'Get accurate air quality predictions based on regional factors.',
    'Stay ahead with data-driven insights for a healthier life.'
  ];

  const [loadingText, setLoadingText] = useState(''); // Current text being typed
  const [index, setIndex] = useState(0); // Current phrase index
  const [typingIndex, setTypingIndex] = useState(0); // Current character index for typing

  useEffect(() => {
    const currentPhrase = phrases[index];
    if (typingIndex < currentPhrase.length) {
      const typingTimeout = setTimeout(() => {
        setLoadingText((prevText) => prevText + currentPhrase[typingIndex]); // Add one character at a time
        setTypingIndex((prevIndex) => prevIndex + 1); // Increment character index
      }, 100); // Typing speed (adjust as needed)
      return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount or re-run
    } else {
      // When phrase is fully typed, wait before starting the next phrase
      const phraseTimeout = setTimeout(() => {
        setLoadingText(''); // Clear text for the next phrase
        setTypingIndex(0); // Reset character index
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length); // Move to the next phrase (loop)
      }, 2000); // Wait 2 seconds before clearing text
      return () => clearTimeout(phraseTimeout); // Cleanup timeout on unmount or re-run
    }
  }, [typingIndex, index, phrases]);

  const handleButtonClick = (url) => {
    window.location.href = url; // Navigate to a different prediction site
  };

  return (
    <div className="regional-hero-container">
      <video src="/videos/video-9.mp4" autoPlay loop muted />
      <h2 className="regional-hero-heading">Regional Air Quality Predictions</h2>
      <p className="regional-loading-text-hero">{loadingText}</p>
      
      {/* Buttons with hover effects */}
      <div className="regional-button-group">
        <button
          className="regional-cta-button"
          onClick={() => handleButtonClick('/prediction-site-1')}
        >
          Predict AQI Now
        </button>
        <button
          className="regional-cta-button"
          onClick={() => handleButtonClick('/prediction-site-2')}
        >
          View Regional Trends
        </button>
        <button
          className="regional-cta-button"
          onClick={() => handleButtonClick('/prediction-site-3')}
        >
          Check Air Quality Impact
        </button>
      </div>
    </div>
  );
}

export default RegionalTrendsHeroSection;
