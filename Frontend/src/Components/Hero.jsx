import React from 'react';
import '../Components/Styles/hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section animate-fadeInUp">
    <div className="hero-inner">
      <h1 className="hero-title">Welcome to WedJoy</h1>
      <p className="hero-subtitle">
        Plan Events. Discover Vendors. Celebrate Joyfully.
      </p>
      <Link to="/selectrole">
        <button className="hero-button">Get Started</button>
      </Link>
    </div>
  </div>
  );
};

export default Hero;
