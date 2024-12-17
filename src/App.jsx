import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AQIData from './components/AQIData';
import FetchAQI from './components/pages/FetchAQI';
import Spinner from './components/layouts/Spinner';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Apply theme to <html> tag
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (loading) return <Spinner />;
  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/view-past-aqis" element={<AQIData />} />
        <Route path="/fetch-aqi" element={<FetchAQI />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
