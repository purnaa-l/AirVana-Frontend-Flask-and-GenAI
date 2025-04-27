import React, { useState, useEffect } from 'react';
import './GenAI.css'; // Link to the CSS file
import { Link } from 'react-router-dom';

function GenAI() {
  const phrases = [
    'Harness the power of the skies with Generative AI.',
    'Master your environment with AeroAI.',
    'Predict. Prepare. Prevail — with data-driven clarity.',
    'Transform the past into a future you can breathe in.',
    'AeroAI: Elevate your air intelligence, elevate your life.'
  ];

  const [scrollText, setScrollText] = useState('');
  const [index, setIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[index];
    if (typingIndex < currentPhrase.length) {
      const typingTimeout = setTimeout(() => {
        setScrollText((prevText) => prevText + currentPhrase[typingIndex]);
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(typingTimeout);
    } else {
      const phraseTimeout = setTimeout(() => {
        setScrollText('');
        setTypingIndex(0);
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(phraseTimeout);
    }
  }, [typingIndex, index, phrases]);

  return (
    <div className="viewaqi-container">
      <div className="video-background">
        <video src="/videos/video-7.mp4" autoPlay loop muted />
      </div>
      <div className="text-overlay">
        <h2 className="hero-heading">AeroAI: AirSphere's GenAI Powered Engine</h2>
        <p className="scrolling-text">{scrollText}</p>
        <Link to="http://localhost:8501/" className="cta-button">Dive Into Insights NOW!</Link>
      </div>
    </div>
  );
}

export default GenAI;
