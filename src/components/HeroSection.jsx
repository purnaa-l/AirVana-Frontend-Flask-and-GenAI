import React, { useState, useEffect } from 'react';
import './HeroSection.css';

function HeroSection() {
  const phrases = [
    'Welcome to AirSphere!',
    'We offer cutting-edge solutions that put air quality data at your fingertips.',
    'With our real-time insights, you can breathe easy and take control of your environment.',
    'We provide data that empowers you to make informed decisions for cleaner air and a healthier life.',
    'Explore our website for more details!'
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

  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h2 className="hero-heading">Air Quality, Simplified</h2>
      <p className="loading-text-hero">{loadingText}</p>
      {/* <div className="button-group">
        <button className="cta-button">Fetch Live AQI</button>
        <button className="cta-button">Predict Accurate AQIs</button>
        <button className="cta-button">View Past AQIs</button>
      </div> */}


    </div>
  );
}

export default HeroSection;
