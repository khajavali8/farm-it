import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Common/Footer";
import "../styles/FarmITStyles.css"; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title" style={{color:"lightgray"}}>Welcome to Farm IT</h1>
          <p className="hero-subtitle">
            Empowering Farmers and Investors for a Better Future
          </p>
          <Link to="/login" className="cta-button">
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Farm Management</h3>
            <p>Powerful tools to manage farm operations efficiently.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Secure Investments</h3>
            <p>Connect with investors for funding and business growth.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Easy Loan Applications</h3>
            <p>Apply for loans with trusted financial partners.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Tracking</h3>
            <p>Monitor farm activities and performance analytics.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About Farm IT</h2>
          <p>
            Farm IT is a revolutionary platform that connects farmers with investors, 
            helping them grow their businesses while ensuring food security. Our 
            platform provides seamless farm management, real-time tracking, and easy 
            financial access for a better future.
          </p>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Farm IT helped me secure funding and expand my farm like never before!"</p>
            <h4>- Mahesh, Farmer</h4>
          </div>
          <div className="testimonial-card">
            <p>"A seamless investment platform that ensures transparency and growth."</p>
            <h4>- Rajesh, Investor</h4>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Join Farm IT Today!</h2>
        <p>Start your journey towards a smarter and more profitable farming experience.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
