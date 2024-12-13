import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import HeroSection from './components/HeroSection'
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      </BrowserRouter>
      <HeroSection />
    </>
  )
}

export default App
