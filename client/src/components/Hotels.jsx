import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Hotels.css";
import hotel1 from "../assets/Orange Residency/MAN07866.JPG";
import hotel2 from "../assets/Orange Residency/MAN07867.JPG";
import hotel3 from "../assets/Orange Residency/MAN07874.JPG";
import room1 from "../assets/Orange Residency/MAN07876.JPG";
import room2 from "../assets/Orange Residency/MAN07879.JPG";
import room3 from "../assets/Orange Residency/MAN07882.JPG";
import freeWifiIcon from "../assets/freeWifiIcon.svg";
import freeBreakfastIcon from "../assets/freeBreakfastIcon.svg";
import poolIcon from "../assets/poolIcon.svg";
import roomServiceIcon from "../assets/roomServiceIcon.svg";

const hotelsList = [
  {
    name: "2 Bed Deluxe",
    location: "Orange Residency, Rameswaram",
    image: hotel1,
    stars: 4,
    price: 1400,
    oldPrice: 1650,
    offer: "16% Off!",
    rating: 8.2,
    review: "Excellent",
    reviewCount: 245,
    lastBooked: "18 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: true,
  },
  {
    name: "4 Bed Standard",
    location: "Orange Residency, Rameswaram",
    image: hotel2,
    stars: 3,
    price: 2800,
    oldPrice: 3300,
    offer: "15% Off!",
    rating: 9.6,
    review: "Good",
    reviewCount: 1206,
    lastBooked: "9 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv"],
    coupleFriendly: false,
  },
  {
    name: "2 Bed Family",
    location: "Orange Residency, Rameswaram",
    image: hotel3,
    stars: 5,
    price: 1400,
    oldPrice: 1750,
    offer: "20% Off!",
    rating: 7.0,
    review: "Amazing Experience",
    reviewCount: 420,
    lastBooked: "2 days ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: true,
  },
  {
    name: "4 Bed Deluxe",
    location: "Orange Residency, Rameswaram",
    image: room1,
    stars: 4,
    price: 2800,
    oldPrice: 3200,
    offer: "12% Off!",
    rating: 8.8,
    review: "Excellent",
    reviewCount: 320,
    lastBooked: "1 day ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: false,
  },
  {
    name: "2 Bed Standard",
    location: "Orange Residency, Rameswaram",
    image: room2,
    stars: 2,
    price: 1400,
    oldPrice: 1700,
    offer: "18% Off!",
    rating: 7.9,
    review: "Not Bad",
    reviewCount: 210,
    lastBooked: "3 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice"],
    coupleFriendly: false,
  },
  {
    name: "4 Bed Family",
    location: "Orange Residency, Rameswaram",
    image: room3,
    stars: 3,
    price: 2800,
    oldPrice: 3100,
    offer: "10% Off!",
    rating: 6.5,
    review: "Average",
    reviewCount: 110,
    lastBooked: "5 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "cctv"],
    coupleFriendly: false,
  },
  {
    name: "2 Bed Deluxe",
    location: "Orange Residency, Rameswaram",
    image: hotel1,
    stars: 5,
    price: 1400,
    oldPrice: 1600,
    offer: "12% Off!",
    rating: 4.5,
    review: "Excellent",
    reviewCount: 890,
    lastBooked: "2 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: true,
  },
  {
    name: "4 Bed Standard",
    location: "Orange Residency, Rameswaram",
    image: hotel2,
    stars: 4,
    price: 2800,
    oldPrice: 3300,
    offer: "15% Off!",
    rating: 4.5,
    review: "Excellent",
    reviewCount: 654,
    lastBooked: "4 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: true,
  },
  {
    name: "2 Bed Family",
    location: "Orange Residency, Rameswaram",
    image: hotel3,
    stars: 5,
    price: 1400,
    oldPrice: 1650,
    offer: "15% Off!",
    rating: 4.5,
    review: "Amazing Experience",
    reviewCount: 432,
    lastBooked: "6 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: false,
  },
  {
    name: "4 Bed Deluxe",
    location: "Orange Residency, Rameswaram",
    image: room1,
    stars: 4,
    price: 2800,
    oldPrice: 3200,
    offer: "13% Off!",
    rating: 4.5,
    review: "Excellent",
    reviewCount: 567,
    lastBooked: "1 hour ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv"],
    coupleFriendly: false,
  },
  {
    name: "2 Bed Standard",
    location: "Orange Residency, Rameswaram",
    image: room2,
    stars: 5,
    price: 1400,
    oldPrice: 1650,
    offer: "15% Off!",
    rating: 9.1,
    review: "Outstanding",
    reviewCount: 1234,
    lastBooked: "30 minutes ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: true,
  },
  {
    name: "4 Bed Family",
    location: "Orange Residency, Rameswaram",
    image: room3,
    stars: 4,
    price: 2800,
    oldPrice: 3300,
    offer: "15% Off!",
    rating: 8.7,
    review: "Very Good",
    reviewCount: 876,
    lastBooked: "2 hours ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv"],
    coupleFriendly: false,
  },
  {
    name: "2 Bed Deluxe",
    location: "Orange Residency, Rameswaram",
    image: hotel1,
    stars: 5,
    price: 1400,
    oldPrice: 1650,
    offer: "15% Off!",
    rating: 9.3,
    review: "Exceptional",
    reviewCount: 1567,
    lastBooked: "45 minutes ago",
    amenities: ["wifi", "ac", "hotwater", "parking", "roomservice", "cctv", "powerbackup"],
    coupleFriendly: true,
  },
];

const Hotels = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: ""
  });
  const [filteredHotels, setFilteredHotels] = useState(hotelsList);
  const [sortBy, setSortBy] = useState("Popularity");
  const [showModal, setShowModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  // Read URL parameters and set initial search state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const roomTypeParam = urlParams.get('city'); // Keep 'city' param for backward compatibility
    const checkinParam = urlParams.get('checkin');
    const checkoutParam = urlParams.get('checkout');
    const guestsParam = urlParams.get('guests');

    if (roomTypeParam || checkinParam || checkoutParam || guestsParam) {
      const newSearchParams = {
        city: roomTypeParam || "",
        checkIn: checkinParam || "",
        checkOut: checkoutParam || "",
        guests: guestsParam || ""
      };
      
      setSearchParams(newSearchParams);
      
      // Apply the search immediately
      let filtered = hotelsList;
      if (roomTypeParam) {
        if (roomTypeParam === "2 beds") {
          filtered = filtered.filter(hotel => 
            hotel.name.toLowerCase().includes("2 bed")
          );
        } else if (roomTypeParam === "4 beds") {
          filtered = filtered.filter(hotel => 
            hotel.name.toLowerCase().includes("4 bed")
          );
        } else {
          // Fallback for other search terms
          filtered = filtered.filter(hotel => 
            hotel.name.toLowerCase().includes(roomTypeParam.toLowerCase()) ||
            hotel.location.toLowerCase().includes(roomTypeParam.toLowerCase())
          );
        }
      }
      
      setFilteredHotels(filtered);
    }
  }, [location.search]);

  // Handle return from login - check for intended booking
  useEffect(() => {
    if (user) {
      const intendedBooking = localStorage.getItem('intendedBooking');
      if (intendedBooking) {
        const bookingData = JSON.parse(intendedBooking);
        // Find the hotel by name and open the modal
        const hotel = hotelsList.find(h => h.name === bookingData.hotelName);
        if (hotel) {
          localStorage.removeItem('intendedBooking');
          setSelectedHotel(hotel);
          setShowModal(true);
          setBookingDetails({
            checkIn: "",
            checkOut: "",
            guests: 1
          });
        }
      }
    }
  }, [user]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    let filtered = hotelsList;
    
    // Filter by room type if selected
    if (searchParams.city) {
      if (searchParams.city === "2 beds") {
        filtered = filtered.filter(hotel => 
          hotel.name.toLowerCase().includes("2 bed")
        );
      } else if (searchParams.city === "4 beds") {
        filtered = filtered.filter(hotel => 
          hotel.name.toLowerCase().includes("4 bed")
        );
      } else {
        // Fallback for other search terms
        filtered = filtered.filter(hotel => 
          hotel.name.toLowerCase().includes(searchParams.city.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchParams.city.toLowerCase())
        );
      }
    }
    
    // Sort the filtered results
    filtered = sortHotels(filtered, sortBy);
    
    setFilteredHotels(filtered);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Sort hotels based on selected criteria
  const sortHotels = (hotels, criteria) => {
    const sorted = [...hotels];
    switch (criteria) {
      case "Price: Low to High":
        return sorted.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return sorted.sort((a, b) => b.price - a.price);
      case "Rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default: // Popularity
        return sorted;
    }
  };

  // Handle sort change
  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    const sorted = sortHotels(filteredHotels, criteria);
    setFilteredHotels(sorted);
  };

  // Clear search filters
  const clearSearch = () => {
    setSearchParams({
      city: "",
      checkIn: "",
      checkOut: "",
      guests: ""
    });
    setFilteredHotels(hotelsList);
    setSortBy("Popularity");
  };

  // Handle opening hotel details modal
  const openHotelModal = (hotel) => {
    // Check if user is logged in
    if (!user) {
      // Store the intended hotel for after login
      localStorage.setItem('intendedBooking', JSON.stringify({
        hotelName: hotel.name,
        hotelId: hotel.name, // Using name as ID for now
        timestamp: new Date().toISOString()
      }));
      
      // Navigate to login page with a message
      navigate('/login?message=Please log in to book a hotel&returnTo=accommodation');
      return;
    }

    // User is logged in, proceed with booking
    setSelectedHotel(hotel);
    setShowModal(true);
    // Reset booking details when opening modal
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      guests: 1
    });
  };

  // Handle closing modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      guests: 1
    });
  };

  // Handle booking form changes
  const handleBookingChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate total booking amount (fixed price regardless of guests)
  const calculateTotalAmount = () => {
    if (!selectedHotel || !bookingDetails.checkIn || !bookingDetails.checkOut) {
      return selectedHotel ? selectedHotel.price : 0;
    }

    const checkIn = new Date(bookingDetails.checkIn);
    const checkOut = new Date(bookingDetails.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) return selectedHotel.price;

    // Fixed price per night regardless of guest count
    const totalAmount = selectedHotel.price * nights;
    
    return totalAmount;
  };

  // Handle booking confirmation
  const handleBookingConfirmation = () => {
    // Create reservation object for profile page
    const newReservation = {
      hotel: selectedHotel.name,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      status: "Cart",
      guests: bookingDetails.guests,
      image: selectedHotel.image, // Include hotel image
    };

    // Save reservation to user-specific localStorage
    if (user?.email) {
      const reservationsKey = `userReservations_${user.email}`;
      const existingReservations = localStorage.getItem(reservationsKey);
      let reservations = existingReservations ? JSON.parse(existingReservations) : [];
      
      // Add new reservation at the beginning of the array
      reservations.unshift(newReservation);
      localStorage.setItem(reservationsKey, JSON.stringify(reservations));
    }

    // Close the modal first
    setShowModal(false);
    setSelectedHotel(null);
    
    // Show success message
    setShowBookingSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowBookingSuccess(false);
    }, 2000);
    
    // Reset booking details
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      guests: 1
    });
  };
  return (
    <div className="hotels-page">
      <div className="hotels-navbar">
        <div className="hotels-title">Accommodation - List Page</div>
        <div className="hotels-breadcrumb">Home &gt; Accommodation &gt; Accommodation List Page</div>
        <form className="hotels-searchbar" onSubmit={handleSearch}>
          <select 
            className="hotels-search-input" 
            value={searchParams.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          >
            <option value="" disabled>Select room type</option>
            <option value="2 beds">2 beds</option>
            <option value="4 beds">4 beds</option>
          </select>
          <input 
            className="hotels-search-input" 
            type="date" 
            placeholder="Check In"
            value={searchParams.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
          />
          <input 
            className="hotels-search-input" 
            type="date" 
            placeholder="Check Out"
            value={searchParams.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
          />
          <input 
            className="hotels-search-input" 
            type="number" 
            min="1"
            max="10"
            placeholder="Number of guests"
            value={searchParams.guests || ""}
            onChange={(e) => handleInputChange('guests', e.target.value)}
          />
          <button className="hotels-search-btn" type="submit">Search</button>
          <button 
            className="hotels-clear-btn" 
            type="button" 
            onClick={clearSearch}
            title="Clear all filters"
          >
            Clear
          </button>
        </form>
      </div>
      <div className="hotels-main">
        <section className="hotels-list-section">
          <div className="hotels-list-header">
            <div className="hotels-list-location"> 
              <span className="hotels-list-note">Prices inclusive of taxes</span>
              {location.search && (
                <span className="home-search-info">
                  🔍 Search results from Home page
                </span>
              )}
              {searchParams.city && (
                <span className="search-results-info">
                  {filteredHotels.length} {searchParams.city === "2 beds" ? "2-bed rooms" : searchParams.city === "4 beds" ? "4-bed rooms" : "accommodation"} found
                </span>
              )}
            </div>
            <div className="hotels-list-sort">
              <label>Sort By: </label>
              <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          <div className="hotels-list">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel, idx) => (
                <div className="hotel-card" key={idx}>
                  <div className="hotel-card-img">
                    <img src={hotel.image} alt={hotel.name} />
                    <div className="hotel-offer">{hotel.offer}</div>
                  </div>
                  <div className="hotel-card-info">
                    <div className="hotel-card-title-row">
                      <div className="hotel-card-title">{hotel.name}</div>
                      <div className="hotel-card-stars">{'★'.repeat(hotel.stars)}</div>
                    </div>
                    <div className="hotel-card-location">{hotel.location}</div>
                    <div className="hotel-card-amenities">
                      {hotel.amenities.includes('wifi') && <span title="Free WiFi"><img src={freeWifiIcon} alt="WiFi" style={{width: '16px', height: '16px'}} /></span>}
                      {hotel.amenities.includes('ac') && <span title="AC Rooms">❄️</span>}
                      {hotel.amenities.includes('hotwater') && <span title="Hot Water">🚿</span>}
                      {hotel.amenities.includes('parking') && <span title="Parking">🅿️</span>}
                      {hotel.amenities.includes('roomservice') && <span title="Room Service"><img src={roomServiceIcon} alt="Room Service" style={{width: '16px', height: '16px'}} /></span>}
                      {hotel.amenities.includes('cctv') && <span title="CCTV Security">📹</span>}
                      {hotel.amenities.includes('powerbackup') && <span title="Power Backup">🔋</span>}
                      {hotel.coupleFriendly && <span className="hotel-couple">Couple Friendly</span>}
                    </div>
                    <div className="hotel-card-rating-row">
                      <span className="hotel-rating-badge">{hotel.rating}</span>
                      <span className="hotel-rating-label">{hotel.review}</span>
                      <span className="hotel-rating-count">({hotel.reviewCount} reviews)</span>
                    </div>
                    <div className="hotel-card-lastbooked">Last Booked - {hotel.lastBooked}</div>
                  </div>
                  <div className="hotel-card-price">
                    <div className="hotel-card-offer">{hotel.offer}</div>
                    <div className="hotel-card-oldprice">₹{hotel.oldPrice}</div>
                    <div className="hotel-card-newprice">₹{hotel.price}</div>
                    <div className="hotel-card-pernight">1 Room/Night</div>
                    <button 
                      className="hotel-card-bookbtn"
                      onClick={() => openHotelModal(hotel)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No {searchParams.city === "2 beds" ? "2-bed rooms" : searchParams.city === "4 beds" ? "4-bed rooms" : "accommodation"} found matching your search criteria. Please try different filters.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Hotel Details Modal */}
      {showModal && selectedHotel && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedHotel.name}</h2>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-section">
                <img src={selectedHotel.image} alt={selectedHotel.name} className="modal-hotel-image" />
                <div className="modal-offer-badge">{selectedHotel.offer}</div>
              </div>
              
              <div className="modal-details">
                <div className="modal-location">
                  📍 {selectedHotel.location}
                </div>
                
                <div className="modal-rating">
                  <span className="modal-stars">{'★'.repeat(selectedHotel.stars)}</span>
                  <span className="modal-rating-score">{selectedHotel.rating}</span>
                  <span className="modal-rating-text">{selectedHotel.review}</span>
                  <span className="modal-review-count">({selectedHotel.reviewCount} reviews)</span>
                </div>

                <div className="modal-amenities">
                  <h3>Amenities & Services</h3>
                  <div className="modal-amenities-grid">
                    {selectedHotel.amenities.includes('wifi') && <div className="amenity-item"><img src={freeWifiIcon} alt="WiFi" style={{width: '20px', height: '20px', marginRight: '8px'}} />Free WiFi</div>}
                    {selectedHotel.amenities.includes('ac') && <div className="amenity-item">❄️ AC Rooms</div>}
                    {selectedHotel.amenities.includes('hotwater') && <div className="amenity-item">🚿 Hot Water</div>}
                    {selectedHotel.amenities.includes('parking') && <div className="amenity-item">🅿️ Free Parking</div>}
                    {selectedHotel.amenities.includes('roomservice') && <div className="amenity-item"><img src={roomServiceIcon} alt="Room Service" style={{width: '20px', height: '20px', marginRight: '8px'}} />Room Service</div>}
                    {selectedHotel.amenities.includes('cctv') && <div className="amenity-item">📹 CCTV Security</div>}
                    {selectedHotel.amenities.includes('powerbackup') && <div className="amenity-item">🔋 Power Backup</div>}
                  </div>
                </div>

                <div className="modal-special-features">
                  {selectedHotel.coupleFriendly && (
                    <div className="special-feature">💕 Couple Friendly</div>
                  )}
                  <div className="last-booked">🕒 Last Booked - {selectedHotel.lastBooked}</div>
                </div>

                <div className="modal-booking-form">
                  <h3>Booking Details</h3>
                  
                  <div className="booking-form-grid">
                    <div className="booking-field">
                      <label htmlFor="modal-checkin">Check-in Date</label>
                      <input
                        id="modal-checkin"
                        type="date"
                        value={bookingDetails.checkIn}
                        onChange={(e) => handleBookingChange('checkIn', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="booking-input"
                      />
                    </div>
                    
                    <div className="booking-field">
                      <label htmlFor="modal-checkout">Check-out Date</label>
                      <input
                        id="modal-checkout"
                        type="date"
                        value={bookingDetails.checkOut}
                        onChange={(e) => handleBookingChange('checkOut', e.target.value)}
                        min={bookingDetails.checkIn || new Date().toISOString().split('T')[0]}
                        className="booking-input"
                      />
                    </div>
                    
                    <div className="booking-field">
                      <label htmlFor="modal-guests">Number of Guests</label>
                      <input
                        id="modal-guests"
                        type="number"
                        min="1"
                        max="10"
                        value={bookingDetails.guests}
                        onChange={(e) => handleBookingChange('guests', parseInt(e.target.value) || 1)}
                        className="booking-input"
                        placeholder="Enter number of guests"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-pricing">
                  <div className="pricing-breakdown">
                    <div className="price-row">
                      <span>Base Price (per night)</span>
                      <span>₹{selectedHotel.price}</span>
                    </div>
                    
                    {bookingDetails.checkIn && bookingDetails.checkOut && (
                      <div className="price-row">
                        <span>Number of Nights</span>
                        <span>
                          {Math.max(1, Math.ceil((new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 3600 * 24)))} nights
                        </span>
                      </div>
                    )}
                    
                    <div className="price-row total-row">
                      <span>Total Amount</span>
                      <span className="total-price">₹{calculateTotalAmount()}</span>
                    </div>
                    
                    <div className="savings-info">
                      Original Price: ₹{selectedHotel.oldPrice} • You Save: {selectedHotel.offer}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button 
                className="modal-book-btn"
                disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
                onClick={handleBookingConfirmation}
              >
                Confirm Booking - ₹{calculateTotalAmount()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Booking Overlay */}
      {showBookingSuccess && (
        <div className="booking-success-overlay">
          <div className="booking-success-content">
            <div className="success-tick">✓</div>
            <h2>Booking Successful!</h2>
            <p>Your booking has been confirmed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
