import React, { useState, useEffect } from 'react';
import './NLP.css'; // Link to the CSS file
import { Link } from 'react-router-dom';

function NLP() {
  const phrases = [
  'Tokenize the headlines. Analyze their truth.',
  'Transformer models decode environmental narratives.',
  'Extract sentiment from climate news — at scale.',
  'Named Entity Recognition reveals key actors in air quality reports.',
  'Uncover bias, emotion, and framing in environmental journalism.',
  'Classify articles. Detect patterns. Build climate awareness.',
  'NLP turns raw news into structured environmental intelligence.'
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
        <video src="/videos/video-11.mp4" autoPlay loop muted />
      </div>
      <div className="text-overlay">
        <h2 className="hero-heading">EnviroNLP: Decoding Climate Narratives with Natural Language Processing</h2>
        <p className="scrolling-text">{scrollText}</p>
        <Link to="http://localhost:8502/" className="cta-button">Dive Into NLP Insights NOW!</Link>
      </div>
    </div>
  );
}

export default NLP;
