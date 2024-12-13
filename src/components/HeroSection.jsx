// import React from 'react'
// import './HeroSection.css'
// function HeroSection() {
//   return (
//     <div className='hero-container'>
//         <video src='/videos/video-1.mp4' autoPlay loop muted />
//         <h1>Air Quality, Simplified</h1> 
      
//     </div>
//   )
// }

// export default HeroSection
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
  
  const [loadingText, setLoadingText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(phrases[index]);
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length); // Update index and loop through phrases
    }, 4000); // Change phrase every 4 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [index]); // Re-run effect every time index changes
  
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h2 className="hero-heading">Air Quality, Simplified</h2>
      <p className="loading-text">{loadingText}</p>
    </div>
  );
}

export default HeroSection;
