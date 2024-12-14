import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AQIData from './components/AQIData';
import FetchAQI from './components/pages/FetchAQI';
import Spinner from './components/layouts/Spinner';

const App = () => {
  const [loading, setLoading]=useState(true)
  useEffect(() => {
    // Replace this with any actual logic, like fetching data
    setTimeout(() => {
      setLoading(false); // Once loading is complete, set loading to false
    }, 1500); // Simulate a 2-second delay for loading
  }, []);
  if(loading)
    return <Spinner />
  else{
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Render HeroSection only for the root route */}
        <Route path="/" element={<HeroSection />} />
        {/* Render AQIData only for the /view-past-aqis route */}
        <Route path="/view-past-aqis" element={<AQIData />} />
        <Route path="/fetch-aqi" element={<FetchAQI />} />
        {/* <Route path="/map" element={<Map />} /> */}


      </Routes>
     {/* <Footer/> */}
    </BrowserRouter>
  );
}
};

export default App;
