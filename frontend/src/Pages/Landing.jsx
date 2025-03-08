import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
     
      <nav className="navbar">
        <div className="navbar-logo">Skill Exchange</div>
        <ul className="navbar-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <Link to="/login">

              <button className="login-button">Login</button>
            </Link>
          </li>
        </ul>
        
      </nav>

     
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Unlock Your Potential with Skill Exchange</h1>
          <p className="hero-subtitle">
            Learn, teach, and grow together in a collaborative community.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        {/* <div className="hero-image">
          <img src="/assets/images/hero-image.png" alt="Hero" />
        </div> */}
      </header>


      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Skill Exchange?</h2>
        <div className="features-container">
          <div className="feature-card">
            {/* <img src="/assets/images/expert.png" alt="Learn from Experts" /> */}
            <h3>Learn from Experts</h3>
            <p>Gain insights and practical knowledge from industry professionals.</p>
          </div>
          <div className="feature-card">
            {/* <img src="/assets/images/share.png" alt="Share Your Skills" /> */}
            <h3>Share Your Skills</h3>
            <p>Teach others and make a meaningful impact in their lives.</p>
          </div>
          <div className="feature-card">
            {/* <img src="/assets/images/connect.png" alt="Collaborate Globally" /> */}
            <h3>Collaborate Globally</h3>
            <p>Join a global network of learners and mentors.</p>
          </div>
        </div>
      </section>


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

     
      <section id="about" className="about-section">
        <h2 className="section-title">About Us</h2>
        <p className="about-description">
          Skill Exchange is a platform designed to foster learning and collaboration. Whether you're here to teach or learn, our mission is to create a space where knowledge flows freely.
        </p>
      </section>

  
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-description">
          Have questions or feedback? Reach out to us, and we'll be happy to assist you.
        </p>
        <button className="contact-button">Contact Us</button>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Skill Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;