import React, { useState, useEffect } from 'react';
import './ViewAQI.css'; // Link to the CSS file
import Footer from '../Footer';
import { Link } from 'react-router-dom';

function ViewAQI() {
  const phrases = [
    'Get Historical Data of the world at your fingertips.',
    'Get past suggestions and insights into air quality trends.',
    'Dive into the details of global air quality information.',
    'Discover how past air quality data can help you make informed decisions.',
    'Explore a world of information and breathe easy!'
  ];

  const [scrollText, setScrollText] = useState(''); // Current text being typed
  const [index, setIndex] = useState(0); // Current phrase index
  const [typingIndex, setTypingIndex] = useState(0); // Current character index for typing

  useEffect(() => {
    const currentPhrase = phrases[index]; // The current phrase to be typed
    if (typingIndex < currentPhrase.length) {
      const typingTimeout = setTimeout(() => {
        setScrollText((prevText) => prevText + currentPhrase[typingIndex]); // Add one character at a time
        setTypingIndex((prevIndex) => prevIndex + 1); // Increment character index
      }, 100); // Typing speed (adjust as needed)
      return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount or re-run
    } else {
      // When phrase is fully typed, wait before clearing and starting next phrase
      const phraseTimeout = setTimeout(() => {
        setScrollText(''); // Clear text for the next phrase
        setTypingIndex(0); // Reset character index
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length); // Move to the next phrase (loop)
      }, 2000); // Wait 2 seconds before clearing text
      return () => clearTimeout(phraseTimeout); // Cleanup timeout on unmount or re-run
    }
  }, [typingIndex, index, phrases]);

  return (
    <div className="viewaqi-container">
      <div className="video-background">
        <video src="/videos/video-2.mp4" autoPlay loop muted />
      </div>
      <div className="text-overlay">
        <h2 className="hero-heading">Air Quality, Simplified</h2>
        <p className="scrolling-text">{scrollText}</p>
        <Link to="/historical-data" className="cta-button">Get Historical Data Now!</Link>
      </div>
    </div>
  );
}

export default ViewAQI;
