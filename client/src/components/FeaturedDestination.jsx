import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./FeaturedDestination.css";
import starIconFilled from "../assets/starIconFilled.svg";
import locationIcon from "../assets/locationIcon.svg";
import roomImg1 from "../assets/Orange Residency/MAN07885.JPG";
import roomImg2 from "../assets/Orange Residency/MAN07891.JPG";
import roomImg3 from "../assets/Orange Residency/MAN07904.JPG";
import roomImg4 from "../assets/Orange Residency/MAN07915.JPG";

const featuredRooms = [
  {
    id: 1,
    image: roomImg1,
    bestSeller: true,
    name: "Taj Hotels",
    address: "Haji Ali Darag , Mumbai",
    price: 399,
    oldPrice: 450,
    offer: "12% Off!",
    rating: 4.5,
    stars: 5,
    review: "Excellent",
    reviewCount: 890,
    lastBooked: "2 hours ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac", "spa"],
    coupleFriendly: true,
  },
  {
    id: 2,
    image: roomImg2,
    bestSeller: false,
    name: "Le Royal Meridien",
    address: "Toopumpodi Street, Kochi",
    price: 299,
    oldPrice: 350,
    offer: "15% Off!",
    rating: 4.5,
    stars: 4,
    review: "Excellent",
    reviewCount: 654,
    lastBooked: "4 hours ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac", "spa"],
    coupleFriendly: true,
  },
  {
    id: 3,
    image: roomImg3,
    bestSeller: true,
    name: "The Westin",
    address: "Rani Laxmi Nagar , Kolkata",
    price: 249,
    oldPrice: 300,
    offer: "17% Off!",
    rating: 4.5,
    stars: 5,
    review: "Amazing Experience",
    reviewCount: 432,
    lastBooked: "6 hours ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac", "spa"],
    coupleFriendly: false,
  },
  {
    id: 4,
    image: roomImg4,
    bestSeller: false,
    name: "Lemon Tree Hotels",
    address: "Main Road 123 Street , Chennai",
    price: 199,
    oldPrice: 230,
    offer: "13% Off!",
    rating: 4.5,
    stars: 4,
    review: "Excellent",
    reviewCount: 567,
    lastBooked: "1 hour ago",
    amenities: ["wifi", "pool", "restaurant", "bar", "parking", "ac"],
    coupleFriendly: false,
  },
];

const FeaturedDestination = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  // Handle return from login - check for intended booking
  useEffect(() => {
    if (user) {
      const intendedBooking = localStorage.getItem('intendedBooking');
      if (intendedBooking) {
        const bookingData = JSON.parse(intendedBooking);
        // Find the hotel by name and open the modal
        const hotel = featuredRooms.find(h => h.name === bookingData.hotelName);
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

  // Handle opening hotel booking modal
  const openBookingModal = (hotel) => {
    // Check if user is logged in
    if (!user) {
      // Store the intended hotel for after login
      localStorage.setItem('intendedBooking', JSON.stringify({
        hotelName: hotel.name,
        hotelId: hotel.id,
        timestamp: new Date().toISOString()
      }));
      
      // Navigate to login page with a message
      navigate('/login?message=Please log in to book a hotel&returnTo=home');
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

  // Calculate total booking amount
  const calculateTotalAmount = () => {
    if (!selectedHotel || !bookingDetails.checkIn || !bookingDetails.checkOut) {
      return selectedHotel ? selectedHotel.price : 0;
    }

    const checkIn = new Date(bookingDetails.checkIn);
    const checkOut = new Date(bookingDetails.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) return selectedHotel.price;

    const baseAmount = selectedHotel.price * nights;
    const guestMultiplier = bookingDetails.guests > 2 ? 1 + ((bookingDetails.guests - 2) * 0.2) : 1;
    
    return Math.round(baseAmount * guestMultiplier);
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
    <section className="featured-section">
      <h2 className="featured-title">Featured Destination</h2>
      <p className="featured-desc">
        Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
      </p>
      <div className="featured-cards">
        {featuredRooms.map((room, idx) => (
          <div className="featured-card" key={room.id}>
            <div className="featured-img-wrap">
              <img src={room.image} alt={room.name} className="featured-img" />
              {room.bestSeller && <span className="featured-badge">Best Seller</span>}
            </div>
            <div className="featured-info">
              <div className="featured-row">
                <span className="featured-hotel-name">{room.name}</span>
                <span className="featured-rating">
                  <img src={starIconFilled} alt="star" /> {room.rating}
                </span>
              </div>
              <div className="featured-row featured-address">
                <img src={locationIcon} alt="location" />
                <span>{room.address}</span>
              </div>
              <div className="featured-row featured-bottom">
                <span className="featured-price">${room.price}<span className="featured-night">/night</span></span>
                <button 
                  className="featured-btn"
                  onClick={() => openBookingModal(room)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="featured-footer">
        <button className="featured-view-btn" onClick={() => navigate('/hotels')}>View All Destinations</button>
      </div>

      {/* Hotel Booking Modal */}
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
                  📍 {selectedHotel.address}
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
                    {selectedHotel.amenities.includes('wifi') && <div className="amenity-item">📶 Free WiFi</div>}
                    {selectedHotel.amenities.includes('pool') && <div className="amenity-item">🏊 Swimming Pool</div>}
                    {selectedHotel.amenities.includes('gym') && <div className="amenity-item">🏋️ Fitness Center</div>}
                    {selectedHotel.amenities.includes('restaurant') && <div className="amenity-item">🍽️ Restaurant</div>}
                    {selectedHotel.amenities.includes('bar') && <div className="amenity-item">🍸 Bar</div>}
                    {selectedHotel.amenities.includes('parking') && <div className="amenity-item">🅿️ Free Parking</div>}
                    {selectedHotel.amenities.includes('ac') && <div className="amenity-item">❄️ Air Conditioning</div>}
                    {selectedHotel.amenities.includes('spa') && <div className="amenity-item">💆 Spa Services</div>}
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
                      <select
                        id="modal-guests"
                        value={bookingDetails.guests}
                        onChange={(e) => handleBookingChange('guests', parseInt(e.target.value))}
                        className="booking-input"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5 Guests</option>
                        <option value={6}>6 Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-pricing">
                  <div className="pricing-breakdown">
                    <div className="price-row">
                      <span>Base Price (per night)</span>
                      <span>${selectedHotel.price}</span>
                    </div>
                    
                    {bookingDetails.checkIn && bookingDetails.checkOut && (
                      <>
                        <div className="price-row">
                          <span>Number of Nights</span>
                          <span>
                            {Math.max(1, Math.ceil((new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 3600 * 24)))} nights
                          </span>
                        </div>
                        
                        {bookingDetails.guests > 2 && (
                          <div className="price-row">
                            <span>Extra Guest Fee ({bookingDetails.guests - 2} guests)</span>
                            <span>+20% per guest</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="price-row total-row">
                      <span>Total Amount</span>
                      <span className="total-price">${calculateTotalAmount()}</span>
                    </div>
                    
                    <div className="savings-info">
                      Original Price: ${selectedHotel.oldPrice} • You Save: {selectedHotel.offer}
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
                Confirm Booking - ${calculateTotalAmount()}
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
    </section>
  );
};

export default FeaturedDestination;
