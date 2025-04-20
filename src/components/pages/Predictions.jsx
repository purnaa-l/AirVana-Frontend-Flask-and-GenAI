import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './predictions.css'
function Predictions() {
    const phrases = [
            "Tailored just for you—your personal air quality forecast!",
            "Scan the skies—track how your region breathes today. ",
            "Empowering governance with insights that matter. ",
            "Breath-wise choices powered by AI.",
            "Plan better days with smarter forecasts.",
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
      <video src="/videos/video3.mp4" autoPlay loop muted />
      <h2 className="hero-heading">Smarter Skies Through ML Intelligence</h2>
      <p className="loading-text-hero">{loadingText}</p>
      <div className="button-group">
           <Link to="/user-centric-prediction" className="cta-button">User Centric Prediction</Link>
           <Link to="/regional-trends-risk-forecast" className="cta-button">Regional Trends and Risk Forecast</Link>
           <Link to="/government-initiatives" className="cta-button">Government Initiatives and Suggestions</Link>
           <Link to="/health-impact-forecast" className="cta-button">Health Impact and Forecast</Link>
           <Link to="/data-insights" className="cta-button">Data Insights and Trends</Link>
      </div>
    </div>
  );
}

export default Predictions;
