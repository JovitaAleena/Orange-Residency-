import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroImage from "../assets/heroImage.png";
import exclusiveOfferCardImg1 from "../assets/exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "../assets/exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "../assets/exclusiveOfferCardImg3.png";
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";
import locationIcon from "../assets/locationIcon.svg";
import calenderIcon from "../assets/calenderIcon.svg";
import guestsIcon from "../assets/guestsIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

// Array of background images for slideshow
const backgroundImages = [
  heroImage,
  exclusiveOfferCardImg1,
  exclusiveOfferCardImg2,
  exclusiveOfferCardImg3,
  roomImg1,
  roomImg2,
  roomImg3,
  roomImg4
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchData, setSearchData] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    guests: ""
  });

  // Auto-change background image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 3000); // Change every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Create URL parameters for the search
    const searchParams = new URLSearchParams();
    if (searchData.destination) searchParams.set('city', searchData.destination);
    if (searchData.checkin) searchParams.set('checkin', searchData.checkin);
    if (searchData.checkout) searchParams.set('checkout', searchData.checkout);
    if (searchData.guests) searchParams.set('guests', searchData.guests);
    
    // Navigate to hotels page with search parameters
    navigate(`/hotels?${searchParams.toString()}`);
  };

  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-label">The Ultimate Hotel Experience</span>
        <h1 className="hero-title">
          Discover Your Perfect<br />Getaway Destination
        </h1>
        <form className="hero-searchbar" onSubmit={handleSearch}>
          {/* Destination Dropdown */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={locationIcon} alt="location" height={20} width={20} />
              <label htmlFor="destination">Destination</label>
            </div>
            <select 
              id="destination" 
              className="search-select" 
              value={searchData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
            >
              <option value="" disabled>Select city</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kochi">Kochi</option>
            </select>
          </div>
          {/* Check in Date */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={calenderIcon} alt="calendar" height={20} width={20} />
              <label htmlFor="checkin">Check in</label>
            </div>
            <input
              id="checkin"
              type="date"
              className="search-input"
              value={searchData.checkin}
              onChange={(e) => handleInputChange('checkin', e.target.value)}
              placeholder="dd-mm-yyyy"
            />
          </div>
          {/* Check out Date */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={calenderIcon} alt="calendar" height={20} width={20} />
              <label htmlFor="checkout">Check out</label>
            </div>
            <input
              id="checkout"
              type="date"
              className="search-input"
              value={searchData.checkout}
              onChange={(e) => handleInputChange('checkout', e.target.value)}
              placeholder="dd-mm-yyyy"
            />
          </div>
          {/* Guests */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={guestsIcon} alt="guests" height={20} width={20} />
              <label htmlFor="guests">Guests</label>
            </div>
            <input
              id="guests"
              type="number"
              className="search-input"
              min={1}
              value={searchData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              placeholder="Number"
            />
          </div>
          {/* Search Button */}
          <button className="search-btn" type="submit">
            <img src={searchIcon} alt="search" height={20} width={20} />
            Search
          </button>
        </form>
      </div>
      
      {/* Slideshow Indicators */}
      <div className="slideshow-indicators">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;