import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "../components/common/Navbar"; // Import Navbar
import "./LandingPage.css";
import LandingNavbar from "./LandingNavbar";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar Component */}
      <LandingNavbar />

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Unlock Your Potential with Skill Exchange</h1>
          <p className="hero-subtitle">
            Learn, teach, and grow together in a collaborative community.
          </p>
          <Link to="/login">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Skill Exchange?</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Learn from Experts</h3>
            <p>Gain insights and practical knowledge from industry professionals.</p>
          </div>
          <div className="feature-card">
            <h3>Share Your Skills</h3>
            <p>Teach others and make a meaningful impact in their lives.</p>
          </div>
          <div className="feature-card">
            <h3>Collaborate Globally</h3>
            <p>Join a global network of learners and mentors.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="community-section">
        <h2 className="section-title">Join Our Vibrant Community</h2>
        <p className="community-description">
          At Skill Exchange, we bring people together to learn, share, and innovate.
        </p>
        <div className="community-stats">
          <div className="stat">
            <h3>10k+</h3>
            <p>Active Members</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Skills to Explore</p>
          </div>
          <div className="stat">
            <h3>1M+</h3>
            <p>Connections Made</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="section-title">About Us</h2>
        <p className="about-description">
          Skill Exchange is a platform designed to foster learning and collaboration. Whether you're here to teach or learn, our mission is to create a space where knowledge flows freely.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-description">
          Have questions or feedback? Reach out to us, and we'll be happy to assist you.
        </p>
        <button className="contact-button">Contact Us</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Skill Exchange. All rights reserved by Chirag Bharda.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
