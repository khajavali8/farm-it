import React from "react";
import Footer from "../components/Common/Footer";
import { Link } from "react-router-dom";
import "../styles/FarmITStyles.css"; 
const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Farm IT</h1>
          <p className="hero-subtitle">
            Empowering Farmers and Investors for a Better Future
          </p>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🌾 Farm Management</h3>
            <p>Powerful tools to manage farm operations efficiently.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Secure Investments</h3>
            <p>Connect with investors for funding and business growth.</p>
          </div>
          <div className="feature-card">
            <h3>📜 Easy Loan Applications</h3>
            <p>Apply for loans with trusted financial partners.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Real-Time Tracking</h3>
            <p>Monitor farm activities and performance analytics.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
