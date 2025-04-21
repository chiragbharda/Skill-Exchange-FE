import React from "react";
import "./Contact.css"; // New CSS for Contact Us Page

const ContactUsPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          Have questions or feedback? Reach out to us, and we'll get back to you as soon as possible.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea
              id="message"
              className="form-textarea"
              placeholder="Write your message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="cta-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
