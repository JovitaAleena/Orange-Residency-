import React from "react";
import "./Footer.css";
import logo from "../assets/orange.png";
import facebookIcon from "../assets/facebookIcon.svg";
import instagramIcon from "../assets/instagramIcon.svg";
import twitterIcon from "../assets/twitterIcon.svg";
import linkendinIcon from "../assets/linkendinIcon.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Orange Residency" />
            </div>
            <p className="footer-description">
              Experience comfort and luxury at Orange Residency, Rameswaram. 
              Your perfect stay awaits with modern amenities and exceptional service.
            </p>
            <div className="footer-features">
              <span>Affordable</span>
              <span>•</span>
              <span>Clean</span>
              <span>•</span>
              <span>Peaceful</span>
              <span>•</span>
              <span>Family Friendly</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/accommodation">Accommodation</a></li>
              <li><a href="/experiences">Experiences</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Room Types */}
          <div className="footer-section">
            <h3>Room Types</h3>
            <ul className="footer-links">
              <li><a href="/accommodation?city=2 beds">2 Bed Rooms</a></li>
              <li><a href="/accommodation?city=4 beds">4 Bed Rooms</a></li>
              <li><a href="/accommodation">Deluxe Rooms</a></li>
              <li><a href="/accommodation">Standard Rooms</a></li>
              <li><a href="/accommodation">Family Rooms</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-details">
                  <p>Orange Residency</p>
                  <p>Temple Street, Near Ramanathaswamy Temple</p>
                  <p>Rameswaram, Tamil Nadu 623526</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <p>+91 98765 43210</p>
                  <p>+91 87654 32109</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div className="contact-details">
                  <p>info@orangeresidency.com</p>
                  <p>bookings@orangeresidency.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            {/* Social Media Icons */}
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={linkendinIcon} alt="LinkedIn" />
              </a>
            </div>

            {/* Copyright */}
            <div className="footer-copyright">
              <p>&copy; 2025 Orange Residency. All rights reserved.</p>
            </div>

            {/* Designed By */}
            <div className="footer-credits">
              <p>Designed by <strong>Raditon Intelligence Private Limited</strong></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;