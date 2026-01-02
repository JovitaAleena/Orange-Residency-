import React, { useState } from "react";
import "./Contact.css";
import contactImage from "../assets/Orange Residency/MAN07861.JPG";
import locationIcon from "../assets/locationIcon.svg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Contact form submitted:", formData);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Orange Residency</h1>
          <p>We're here to help make your stay memorable</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have questions about your reservation or need assistance planning your visit to Rameswaram? 
              Our friendly team is ready to help you 24/7.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <h3>Address</h3>
                  <p>Orange Residency<br />Temple Street, Near Ramanathaswamy Temple<br />Rameswaram, Tamil Nadu 623526</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>+91 98765 43210<br />+91 98765 43211</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <p>info@orangeresidency.com<br />reservations@orangeresidency.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-text">
                  <h3>Reception Hours</h3>
                  <p>24/7 Front Desk Service<br />Check-in: 2:00 PM<br />Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-image">
            <img src={contactImage} alt="Orange Residency Contact" />
          </div>
        </div>

        <div className="contact-form-section">
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>

            {showSuccess && (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Room Reservation</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Enter your message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-icon">
                <img src={locationIcon} alt="Location" />
              </div>
              <h3>Orange Residency, Rameswaram</h3>
              <p>Located in the heart of Rameswaram, near the famous Ramanathaswamy Temple</p>
              <div className="map-directions">
                <p><strong>From Railway Station:</strong> 2 km (5 minutes by auto)</p>
                <p><strong>From Bus Stand:</strong> 1.5 km (3 minutes by auto)</p>
                <p><strong>From Ramanathaswamy Temple:</strong> 500 meters (2 minutes walk)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="emergency-contact">
          <h2>Emergency Contact</h2>
          <div className="emergency-info">
            <div className="emergency-item">
              <span className="emergency-icon">🚨</span>
              <div>
                <h3>24/7 Emergency Helpline</h3>
                <p>+91 98765 43200</p>
              </div>
            </div>
            <div className="emergency-item">
              <span className="emergency-icon">🏥</span>
              <div>
                <h3>Nearest Hospital</h3>
                <p>Rameswaram Government Hospital - 1 km</p>
              </div>
            </div>
            <div className="emergency-item">
              <span className="emergency-icon">👮</span>
              <div>
                <h3>Police Station</h3>
                <p>Rameswaram Police Station - 800 meters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;