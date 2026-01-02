import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroImage from "../assets/Orange Residency/MAN07846.JPG";
import exclusiveOfferCardImg1 from "../assets/Orange Residency/MAN07847.JPG";
import exclusiveOfferCardImg2 from "../assets/Orange Residency/MAN07850.JPG";
import exclusiveOfferCardImg3 from "../assets/Orange Residency/MAN07851.JPG";
import roomImg1 from "../assets/Orange Residency/MAN07857.JPG";
import roomImg2 from "../assets/Orange Residency/MAN07858.JPG";
import roomImg3 from "../assets/Orange Residency/MAN07861.JPG";
import roomImg4 from "../assets/Orange Residency/MAN07865.JPG";
import locationIcon from "../assets/locationIcon.svg";
import calenderIcon from "../assets/calenderIcon.svg";
import guestsIcon from "../assets/guestsIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

// Array of background images for slideshow with titles
const backgroundImages = [
  { 
    src: heroImage, 
    title: "Luxury Accommodation",
    subtitle: "Experience comfort like never before"
  },
  { 
    src: exclusiveOfferCardImg1, 
    title: "Premium Rooms",
    subtitle: "Elegantly designed for your comfort"
  },
  { 
    src: exclusiveOfferCardImg2, 
    title: "Sacred Rameswaram",
    subtitle: "Stay close to divine experiences"
  },
  { 
    src: exclusiveOfferCardImg3, 
    title: "Modern Amenities",
    subtitle: "All facilities for a perfect stay"
  },
  { 
    src: roomImg1, 
    title: "Spacious Interiors",
    subtitle: "Rooms designed for relaxation"
  },
  { 
    src: roomImg2, 
    title: "Orange Residency",
    subtitle: "Your home away from home"
  },
  { 
    src: roomImg3, 
    title: "Peaceful Environment",
    subtitle: "Tranquil surroundings for rest"
  },
  { 
    src: roomImg4, 
    title: "Exceptional Service",
    subtitle: "Hospitality that exceeds expectations"
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchData, setSearchData] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    guests: ""
  });

  // Auto-change background image every 4 seconds with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % backgroundImages.length;
          setNextImageIndex((newIndex + 1) % backgroundImages.length);
          return newIndex;
        });
        setIsTransitioning(false);
      }, 500); // Half second transition
    }, 4000); // Change every 4 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle manual slide change
  const handleSlideChange = (index) => {
    if (index !== currentImageIndex && !isTransitioning) {
      setIsTransitioning(true);
      setNextImageIndex(index);
      
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

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
    
    // Navigate to accommodation page with search parameters
    navigate(`/accommodation?${searchParams.toString()}`);
  };

  return (
    <div className="hero-section">
      {/* Background Images with Smooth Transition */}
      <div 
        className={`hero-background ${isTransitioning ? 'transitioning' : ''}`}
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex].src})` }}
      />
      <div 
        className={`hero-background hero-background-next ${isTransitioning ? 'active' : ''}`}
        style={{ backgroundImage: `url(${backgroundImages[nextImageIndex].src})` }}
      />
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <span className="hero-label">The Ultimate Hotel Experience</span>
        <h1 className="hero-title">
          <span className={`title-line ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {backgroundImages[currentImageIndex].title}
          </span>
          <br />
          <span className={`subtitle-line ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {backgroundImages[currentImageIndex].subtitle}
          </span>
        </h1>
        
        <form className="hero-searchbar" onSubmit={handleSearch}>
          {/* Rooms Dropdown */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={locationIcon} alt="location" height={20} width={20} />
              <label htmlFor="destination">Rooms</label>
            </div>
            <select 
              id="destination" 
              className="search-select" 
              value={searchData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
            >
              <option value="" disabled>Select room type</option>
              <option value="2 beds">2 beds</option>
              <option value="4 beds">4 beds</option>
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
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="hero-nav-btn hero-nav-prev"
        onClick={() => handleSlideChange((currentImageIndex - 1 + backgroundImages.length) % backgroundImages.length)}
      >
        ‹
      </button>
      <button 
        className="hero-nav-btn hero-nav-next"
        onClick={() => handleSlideChange((currentImageIndex + 1) % backgroundImages.length)}
      >
        ›
      </button>
    </div>
  );
};

export default Hero;