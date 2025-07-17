// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Demo from './components/Demo';
import Video from './components/Video';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import SignUp from './pages/SignUp'; // Import SignUp
import SignIn from './pages/SignIn'; // Import SignIn

function App() {
  return (
    <div className="font-sans antialiased text-gray-800">
      <Navbar />
      <main>
        <Routes>
          {/* Main Page Route */}
          <Route path="/" element={
            <>
              <Hero />
              <HowItWorks />
              <Features />
              <Demo />
              <Video />
              <Pricing />
              <FAQ />
              <Contact />
            </>
          } />
          
          {/* Authentication Routes */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;