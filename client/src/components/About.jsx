import React from "react";
import "./About.css";
import aboutImage1 from "../assets/Orange Residency/MAN07846.JPG";
import aboutImage2 from "../assets/Orange Residency/MAN07850.JPG";
import aboutImage3 from "../assets/Orange Residency/MAN07857.JPG";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Orange Residency</h1>
          <p>Your Perfect Getaway in the Heart of Rameswaram</p>
        </div>
        <div className="about-hero-image">
          <img src={aboutImage1} alt="Orange Residency" />
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <h2>Welcome to Orange Residency</h2>
            <p>
              Nestled in the sacred city of Rameswaram, Orange Residency offers a perfect blend of 
              comfort, luxury, and spiritual tranquility. Our hotel provides an ideal base for 
              pilgrims and tourists exploring the rich cultural heritage and pristine beaches of 
              this holy island.
            </p>
            <p>
              With our range of well-appointed rooms from 2-bed to 4-bed configurations, we cater 
              to families, couples, and groups of all sizes. Each room is designed with modern 
              amenities while maintaining the warm, welcoming atmosphere that Orange Residency is 
              known for.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage2} alt="Hotel Interior" />
          </div>
        </section>

        <section className="about-features">
          <h2>Why Choose Orange Residency?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏨</div>
              <h3>Premium Accommodation</h3>
              <p>Comfortable rooms with modern amenities including AC, free WiFi, and 24/7 room service.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Prime Location</h3>
              <p>Strategically located in Rameswaram, close to major temples and tourist attractions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Delicious Cuisine</h3>
              <p>Authentic South Indian cuisine and multi-cuisine options to satisfy every palate.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Safe & Secure</h3>
              <p>24/7 CCTV surveillance, power backup, and dedicated security for your peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Family Friendly</h3>
              <p>Special arrangements for families and couple-friendly rooms available.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Free Parking</h3>
              <p>Complimentary parking facility for all guests with 24/7 security.</p>
            </div>
          </div>
        </section>

        <section className="about-mission">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Orange Residency, our mission is to provide exceptional hospitality that combines 
                traditional Indian warmth with modern comfort. We strive to make every guest's stay 
                memorable, whether they're here for pilgrimage, leisure, or business.
              </p>
              <p>
                We believe in sustainable tourism and are committed to preserving the cultural and 
                natural beauty of Rameswaram while providing world-class accommodation services.
              </p>
            </div>
            <div className="mission-image">
              <img src={aboutImage3} alt="Hotel Exterior" />
            </div>
          </div>
        </section>

        <section className="about-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Happy Guests</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Rooms Available</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Customer Service</p>
            </div>
            <div className="stat-item">
              <h3>4.5★</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;