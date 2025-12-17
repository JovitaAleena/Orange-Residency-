import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import userIcon from "../assets/userIcon.svg";
import maleIcon from "../assets/maleIcon.svg";
import femaleIcon from "../assets/femaleIcon.svg";
import otherIcon from "../assets/otherIcon.svg";
import editIcon from "../assets/editIcon.svg";
import { hotelImages } from "../assets/hotelImages";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const tabs = [
  { label: "Reservation", key: "reservation" },
  { label: "Bookings", key: "bookings" },
  { label: "Admin Dashboard", key: "admin" },
  { label: "Profile", key: "profile" },
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("reservation");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
  };


// Reservation data state for CRUD
const initialReservations = [
  {
    hotel: "Urbanza Suites",
    checkIn: "2025-07-25",
    checkOut: "2025-07-28",
    status: "Paid",
    guests: 2,
    image: hotelImages["Urbanza Suites"],
  },
  {
    hotel: "Grand Palace",
    checkIn: "2025-08-01",
    checkOut: "2025-08-05",
    status: "Cart",
    guests: 4,
    image: hotelImages["Grand Palace"],
  },
  {
    hotel: "Lakeview Resort",
    checkIn: "2025-08-10",
    checkOut: "2025-08-12",
    status: "Canceled",
    guests: 3,
    image: hotelImages["Lakeview Resort"],
  },
];

const [reservations, setReservations] = useState(initialReservations);
const [editIdx, setEditIdx] = useState(null);
const [editData, setEditData] = useState({});
const [originalEditData, setOriginalEditData] = useState(null); // Track original data for status change detection
const [showCreate, setShowCreate] = useState(false);
const [createData, setCreateData] = useState({
  hotel: "Urbanza Suites",
  checkIn: "",
  checkOut: "",
  status: "Paid",
  guests: 1,
});

// Load saved reservations on component mount
useEffect(() => {
  if (user?.email) {
    const reservationsKey = `userReservations_${user.email}`;
    const savedReservations = localStorage.getItem(reservationsKey);
    
    console.log(`Loading reservations for ${user.email}...`);
    console.log(`Stored data:`, savedReservations);
    
    if (savedReservations) {
      try {
        const parsedReservations = JSON.parse(savedReservations);
        console.log('Parsed reservations:', parsedReservations);
        
        // Ensure we have valid reservation data (allow empty arrays too)
        if (Array.isArray(parsedReservations)) {
          setReservations(parsedReservations);
          console.log(`Successfully loaded ${parsedReservations.length} reservations for ${user.email}`);
        } else {
          // If not an array, initialize with default reservations
          setReservations(initialReservations);
          localStorage.setItem(reservationsKey, JSON.stringify(initialReservations));
          console.log(`Invalid reservation format, initialized defaults for ${user.email}`);
        }
      } catch (error) {
        console.error('Error parsing saved reservations:', error);
        // If parsing fails, initialize with default reservations
        setReservations(initialReservations);
        localStorage.setItem(reservationsKey, JSON.stringify(initialReservations));
      }
    } else {
      // No saved data found, initialize with default reservations
      setReservations(initialReservations);
      localStorage.setItem(reservationsKey, JSON.stringify(initialReservations));
      console.log(`No saved reservations found, initialized defaults for ${user.email}`);
    }
  } else {
    // If no user, reset to initial state
    setReservations(initialReservations);
  }
}, [user?.email]); // More specific dependency on user email

// Auto-save reservations whenever they change
useEffect(() => {
  if (user?.email && Array.isArray(reservations)) {
    const reservationsKey = `userReservations_${user.email}`;
    try {
      localStorage.setItem(reservationsKey, JSON.stringify(reservations));
      console.log(`Saved ${reservations.length} reservations for ${user.email}`);
    } catch (error) {
      console.error('Error saving reservations:', error);
    }
  }
}, [reservations, user?.email]);

// Profile form state
const [profileData, setProfileData] = useState({
  fullName: user?.name || "",
  nickName: "",
  gender: "",
  country: "",
  phoneNumber: "",
  timeZone: "",
  email: user?.email || "",
  profilePicture: null
});

// Debug function to show stored profiles (can be removed in production)
const debugStoredProfiles = () => {
  console.log("=== Stored Profile Data Debug ===");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('userProfile_')) {
      const email = key.replace('userProfile_', '');
      const data = JSON.parse(localStorage.getItem(key));
      console.log(`Profile for ${email}:`, data);
    }
  }
  console.log("=== End Debug ===");
};

// Debug function to show stored reservations
const debugStoredReservations = () => {
  console.log("=== Stored Reservations Debug ===");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('userReservations_')) {
      const email = key.replace('userReservations_', '');
      const data = JSON.parse(localStorage.getItem(key));
      console.log(`Reservations for ${email}:`, data);
    }
  }
  console.log("=== End Debug ===");
};

// Email management state
const [emailAddresses, setEmailAddresses] = useState([
  {
    email: user?.email || "alexarawles@gmail.com",
    timeAdded: "1 month ago",
    isPrimary: true
  }
]);
const [showAddEmail, setShowAddEmail] = useState(false);
const [newEmail, setNewEmail] = useState("");

// Country-specific phone number configurations
const countryPhoneConfig = {
  "United States": {
    code: "+1",
    format: "(XXX) XXX-XXXX",
    placeholder: "Enter US phone number",
    minLength: 10,
    maxLength: 10,
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/
  },
  "India": {
    code: "+91",
    format: "XXXXX XXXXX",
    placeholder: "Enter Indian phone number",
    minLength: 10,
    maxLength: 10,
    pattern: /^\d{5} \d{5}$/
  },
  "United Kingdom": {
    code: "+44",
    format: "XXXX XXX XXXX",
    placeholder: "Enter UK phone number",
    minLength: 10,
    maxLength: 11,
    pattern: /^\d{4} \d{3} \d{4}$/
  },
  "Canada": {
    code: "+1",
    format: "(XXX) XXX-XXXX",
    placeholder: "Enter Canadian phone number",
    minLength: 10,
    maxLength: 10,
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/
  }
};

// Format phone number based on country
const formatPhoneNumber = (value, country) => {
  if (!country || !countryPhoneConfig[country]) return value;
  
  const config = countryPhoneConfig[country];
  const digitsOnly = value.replace(/\D/g, '');
  
  if (country === "United States" || country === "Canada") {
    // Format: (XXX) XXX-XXXX
    if (digitsOnly.length >= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    } else if (digitsOnly.length >= 3) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else if (digitsOnly.length > 0) {
      return `(${digitsOnly}`;
    }
  } else if (country === "India") {
    // Format: XXXXX XXXXX
    if (digitsOnly.length > 5) {
      return `${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5, 10)}`;
    }
    return digitsOnly;
  } else if (country === "United Kingdom") {
    // Format: XXXX XXX XXXX
    if (digitsOnly.length >= 7) {
      return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4, 7)} ${digitsOnly.slice(7, 11)}`;
    } else if (digitsOnly.length >= 4) {
      return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`;
    }
    return digitsOnly;
  }
  
  return value;
};

// Get phone number constraints based on country
const getPhoneConstraints = (country) => {
  if (!country || !countryPhoneConfig[country]) {
    return {
      placeholder: "Select country first",
      maxLength: 15,
      countryCode: ""
    };
  }
  
  const config = countryPhoneConfig[country];
  return {
    placeholder: config.placeholder,
    maxLength: config.maxLength + 5, // Extra space for formatting
    countryCode: config.code
  };
};

// Get profile icon based on gender
const getProfileIcon = (gender) => {
  switch (gender) {
    case 'Male':
      return maleIcon;
    case 'Female':
      return femaleIcon;
    case 'Other':
      return otherIcon;
    default:
      return userIcon;
  }
};

// Get profile image - custom photo or gender-based icon
const getProfileImage = (profilePicture, gender) => {
  if (profilePicture) {
    return profilePicture;
  }
  return getProfileIcon(gender);
};

// Handle profile picture upload
const handleProfilePictureUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      const updatedProfileData = {
        ...profileData,
        profilePicture: imageUrl
      };
      setProfileData(updatedProfileData);
      // Save to localStorage immediately with user-specific key
      if (user?.email) {
        const profileKey = `userProfile_${user.email}`;
        localStorage.setItem(profileKey, JSON.stringify(updatedProfileData));
      }
    };
    reader.readAsDataURL(file);
  }
};

// Remove profile picture
const removeProfilePicture = () => {
  const updatedProfileData = {
    ...profileData,
    profilePicture: null
  };
  setProfileData(updatedProfileData);
  // Save to localStorage immediately with user-specific key
  if (user?.email) {
    const profileKey = `userProfile_${user.email}`;
    localStorage.setItem(profileKey, JSON.stringify(updatedProfileData));
  }
};

// Handle profile form changes
const handleProfileChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'phoneNumber') {
    // Format phone number based on selected country
    const digitsOnly = value.replace(/\D/g, '');
    const currentCountry = profileData.country;
    
    if (currentCountry && countryPhoneConfig[currentCountry]) {
      const config = countryPhoneConfig[currentCountry];
      if (digitsOnly.length <= config.maxLength) {
        const formattedPhone = formatPhoneNumber(value, currentCountry);
        setProfileData(prev => ({
          ...prev,
          [name]: formattedPhone
        }));
      }
    } else {
      // If no country selected, allow basic input but limit length
      if (digitsOnly.length <= 15) {
        setProfileData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  } else if (name === 'country') {
    // When country changes, reset phone number to allow new formatting
    setProfileData(prev => ({
      ...prev,
      [name]: value,
      phoneNumber: '' // Reset phone number when country changes
    }));
  } else {
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

// Handle adding new email
const handleAddEmail = () => {
  if (newEmail && newEmail.includes('@')) {
    const newEmailObj = {
      email: newEmail,
      timeAdded: "Just now",
      isPrimary: false
    };
    setEmailAddresses(prev => [...prev, newEmailObj]);
    setNewEmail("");
    setShowAddEmail(false);
    
    // Save to localStorage with user-specific key
    const updatedEmails = [...emailAddresses, newEmailObj];
    if (user?.email) {
      const emailKey = `userEmails_${user.email}`;
      localStorage.setItem(emailKey, JSON.stringify(updatedEmails));
    }
    alert('Email added successfully!');
  } else {
    alert('Please enter a valid email address');
  }
};

// Handle profile save
const handleProfileSave = () => {
  // Update the user context or localStorage with new profile data using user-specific keys
  if (user?.email) {
    const profileKey = `userProfile_${user.email}`;
    const emailKey = `userEmails_${user.email}`;
    localStorage.setItem(profileKey, JSON.stringify(profileData));
    localStorage.setItem(emailKey, JSON.stringify(emailAddresses));
  }
  alert('Profile saved successfully!');
};

// Load saved profile data on component mount
useEffect(() => {
  if (user?.email) {
    // Clean up old generic localStorage entries (migration)
    const oldProfile = localStorage.getItem('userProfile');
    const oldEmails = localStorage.getItem('userEmails');
    
    // Load profile data specific to the current user's email
    const profileKey = `userProfile_${user.email}`;
    const savedProfile = localStorage.getItem(profileKey);
    
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfileData(parsedProfile);
    } else if (oldProfile) {
      // Migrate old profile data to user-specific storage
      const parsedProfile = JSON.parse(oldProfile);
      setProfileData(parsedProfile);
      localStorage.setItem(profileKey, oldProfile);
      localStorage.removeItem('userProfile'); // Clean up old entry
    } else {
      // If no saved profile, initialize with user data
      setProfileData(prev => ({
        ...prev,
        fullName: user?.name || "",
        email: user?.email || ""
      }));
    }
    
    // Load email addresses specific to the current user
    const emailKey = `userEmails_${user.email}`;
    const savedEmails = localStorage.getItem(emailKey);
    
    if (savedEmails) {
      const parsedEmails = JSON.parse(savedEmails);
      setEmailAddresses(parsedEmails);
    } else if (oldEmails) {
      // Migrate old email data to user-specific storage
      const parsedEmails = JSON.parse(oldEmails);
      setEmailAddresses(parsedEmails);
      localStorage.setItem(emailKey, oldEmails);
      localStorage.removeItem('userEmails'); // Clean up old entry
    } else {
      // Initialize with current user email if no saved emails
      setEmailAddresses([{
        email: user?.email || "alexarawles@gmail.com",
        timeAdded: "1 month ago",
        isPrimary: true
      }]);
    }
  }
}, [user]);

// Auto-save profile data whenever it changes
useEffect(() => {
  // Only save if user is logged in and profileData has meaningful content
  if (user?.email && (profileData.fullName !== "" || profileData.profilePicture)) {
    const profileKey = `userProfile_${user.email}`;
    localStorage.setItem(profileKey, JSON.stringify(profileData));
  }
}, [profileData, user]);


// Bookings data and rating/description state
const initialBookings = [
  {
    hotel: "Urbanza Suites",
    location: "Delhi",
    checkIn: "2025-06-10",
    checkOut: "2025-06-12",
    guests: 2,
    image: hotelImages["Urbanza Suites"],
    rating: 4,
    description: "Amazing!"
  },
  {
    hotel: "Grand Palace",
    location: "Mumbai",
    checkIn: "2025-05-15",
    checkOut: "2025-05-18",
    guests: 3,
    image: hotelImages["Grand Palace"],
    rating: 3,
    description: "I loved the food there."
  },
  {
    hotel: "Lakeview Resort",
    location: "Bangalore",
    checkIn: "2025-04-20",
    checkOut: "2025-04-22",
    guests: 1,
    image: hotelImages["Lakeview Resort"],
    rating: 1,
    description: "did not like the service there."
  },
];

// Force update bookings to remove Le Royal Meridien
React.useEffect(() => {
  localStorage.removeItem('userBookings');
  localStorage.setItem('userBookings', JSON.stringify(initialBookings));
  setBookings(initialBookings);
}, []);

const [bookings, setBookings] = useState(initialBookings);
const [editBookingIdx, setEditBookingIdx] = useState(null);
const [editBookingData, setEditBookingData] = useState({ rating: 0, description: "" });

const handleBookingEdit = (idx) => {
  setEditBookingIdx(idx);
  setEditBookingData({
    rating: bookings[idx].rating,
    description: bookings[idx].description || ""
  });
};
const handleBookingRating = (value) => {
  setEditBookingData(data => ({ ...data, rating: value }));
};
const handleBookingDescChange = (e) => {
  setEditBookingData(data => ({ ...data, description: e.target.value }));
};

// Admin Dashboard Data
const adminDashboardData = {
  // Key metrics
  totalBookings: 84,
  totalCheckIns: 23,
  totalCheckOuts: 12,
  totalRevenue: 98,
  overallRating: 4.6,
  
  // Growth percentages
  bookingsGrowth: 5.70,
  checkInsGrowth: 3.56,
  checkOutsGrowth: -1.06, // negative growth
  revenueGrowth: 6.70,
  
  // Room availability data by most booked hotels
  roomStats: {
    'Urbanza Suites': { occupied: 45, reserved: 12, available: 8, notReady: 2 },
    'Grand Palace': { occupied: 38, reserved: 15, available: 5, notReady: 3 },
    'Lakeview Resort': { occupied: 32, reserved: 10, available: 12, notReady: 1 },
    'The Orchid Hotel': { occupied: 28, reserved: 8, available: 15, notReady: 2 },
    'Taj Hotels': { occupied: 42, reserved: 18, available: 6, notReady: 4 }
  },
  
  // Revenue over time (Last 6 Months)
  revenueData: [
    { month: 'Dec 2024', revenue: 300000 },
    { month: 'Jan 2025', revenue: 350000 },
    { month: 'Feb 2025', revenue: 320000 },
    { month: 'Mar 2025', revenue: 380000 },
    { month: 'Apr 2025', revenue: 410000 },
    { month: 'May 2025', revenue: 315000 },
  ],
  
  // Reservations over time (Last 7 Months)
  reservationsData: [
    { date: 'Jan 2025', booked: 2100, cancelled: 450 },
    { date: 'Feb 2025', booked: 1850, cancelled: 380 },
    { date: 'Mar 2025', booked: 2400, cancelled: 520 },
    { date: 'Apr 2025', booked: 2650, cancelled: 410 },
    { date: 'May 2025', booked: 2200, cancelled: 320 },
    { date: 'Jun 2025', booked: 2900, cancelled: 490 },
    { date: 'Jul 2025', booked: 2750, cancelled: 380 },
  ],
  
  // Booking platforms
  platformData: [
    { name: 'Urbanza Suites', value: 25, color: '#00C49F' },
    { name: 'Grand Palace', value: 20, color: '#FFBB28' },
    { name: 'Lakeview Resort', value: 15, color: '#FF8042' },
    { name: 'The Orchid Hotel', value: 12, color: '#8884d8' },
    { name: 'Taj Hotels', value: 10, color: '#82ca9d' },
    { name: 'Grand Hyatt', value: 8, color: '#ffc658' },
    { name: 'The Westin', value: 6, color: '#ff7c7c' },
    { name: 'Others', value: 4, color: '#8dd1e1' },
  ],
  
  // Rating breakdown
  ratingData: {
    facilities: 4.4,
    cleanliness: 4.7,
    services: 4.6,
    comfort: 4.8,
    location: 4.5
  },
  
  // Recent activities/tasks
  recentTasks: [
    {
      date: 'June 19, 2025',
      task: 'Set Up Conference Room 8 for 10 AM Meeting',
      type: 'setup'
    },
    {
      date: 'June 19, 2025', 
      task: 'Restock Housekeeping Supplies on 3rd Floor',
      type: 'housekeeping'
    },
    {
      date: 'June 23, 2025',
      task: 'Inspect and Clean the Pool Area',
      type: 'maintenance'
    },
    {
      date: 'June 25, 2025',
      task: 'Check In Service During Peak Hours (4 PM - 6 PM)',
      type: 'service'
    }
  ]
};

// Colors for charts
const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const handleBookingSave = (idx) => {
  setBookings(bookings => {
    const updated = bookings.map((b, i) => i === idx ? { ...b, ...editBookingData } : b);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    return updated;
  });
  setEditBookingIdx(null);
};
// Persist bookings to localStorage on change
useEffect(() => {
  localStorage.setItem('userBookings', JSON.stringify(bookings));
}, [bookings]);
const handleBookingCancel = () => {
  setEditBookingIdx(null);
};

// CRUD handlers
const handleDelete = (idx) => {
  setReservations(reservations => reservations.filter((_, i) => i !== idx));
};
const handleEdit = (idx) => {
  setEditIdx(idx);
  const originalReservation = reservations[idx];
  setEditData(originalReservation);
  setOriginalEditData(originalReservation); // Store original data to track changes
};
const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditData(data => ({ ...data, [name]: value }));
};
const handleEditSave = (idx) => {
  const updatedReservation = editData;
  const originalStatus = originalEditData?.status;
  
  // Only add to bookings if status is CHANGED to "Paid" (wasn't previously "Paid")
  if (updatedReservation.status === "Paid" && originalStatus !== "Paid") {
    console.log(`Status changed from "${originalStatus}" to "Paid" - adding to bookings`);
    
    // Add to bookings with additional required fields
    const newBooking = {
      hotel: updatedReservation.hotel,
      location: getHotelLocation(updatedReservation.hotel), // Helper function to get location
      checkIn: updatedReservation.checkIn,
      checkOut: updatedReservation.checkOut,
      guests: updatedReservation.guests,
      image: updatedReservation.image || hotelImages[updatedReservation.hotel],
      rating: 0, // Default rating
      description: "" // Default description
    };
    
    // Add to bookings
    setBookings(prevBookings => {
      const updatedBookings = [...prevBookings, newBooking];
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      return updatedBookings;
    });
  }
  
  // Update reservations
  setReservations(reservations => reservations.map((r, i) => i === idx ? editData : r));
  setEditIdx(null);
  setOriginalEditData(null); // Clear original data after saving
};

// Helper function to get hotel location
const getHotelLocation = (hotelName) => {
  const locationMap = {
    "Urbanza Suites": "Delhi",
    "Grand Palace": "Mumbai", 
    "Lakeview Resort": "Bangalore",
    "The Orchid Hotel": "Mumbai",
    "Whistling Meadows Resort": "Goa",
    "Radisson Blu Hotel": "Bangalore",
    "Lotus Heritage Palace": "Jaipur",
    "Taj Hotels": "Mumbai",
    "Le Royal Meridien": "Kochi",
    "The Westin": "Chennai",
    "Lemon Tree Hotels": "Delhi",
    "Grand Hyatt": "Mumbai",
    "Novotel Hyderabad": "Hyderabad",
    "ITC Grand Chola": "Chennai"
  };
  return locationMap[hotelName] || "Unknown";
};
const handleEditCancel = () => {
  setEditIdx(null);
  setOriginalEditData(null); // Clear original data when canceling
};
// Create handlers
const handleCreateChange = (e) => {
  const { name, value } = e.target;
  setCreateData(data => ({ ...data, [name]: value }));
};
const handleCreateSave = () => {
  const newReservation = {
    ...createData,
    image: hotelImages[createData.hotel]
  };
  
  // Check if status is "Paid" 
  if (createData.status === "Paid") {
    // Add to bookings as well
    const newBooking = {
      hotel: createData.hotel,
      location: getHotelLocation(createData.hotel),
      checkIn: createData.checkIn,
      checkOut: createData.checkOut,
      guests: createData.guests,
      image: hotelImages[createData.hotel],
      rating: 0,
      description: ""
    };
    
    setBookings(prevBookings => {
      const updatedBookings = [...prevBookings, newBooking];
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      return updatedBookings;
    });
  }
  
  // Add to reservations
  setReservations(reservations => [newReservation, ...reservations]);
  setShowCreate(false);
  setCreateData({ hotel: "Urbanza Suites", checkIn: "", checkOut: "", status: "Paid", guests: 1 });
};
const handleCreateCancel = () => {
  setShowCreate(false);
  setCreateData({ hotel: "Urbanza Suites", checkIn: "", checkOut: "", status: "Paid", guests: 1 });
};

return (
    <div className="profile-layout">
        <aside className="profile-sidebar">
            <div className="profile-user">
                <div className="profile-avatar-container">
                  <div className="profile-avatar-border" data-gender={profileData.gender}>
                    <img 
                      src={getProfileImage(profileData.profilePicture, profileData.gender)} 
                      alt="user" 
                      className={`profile-avatar ${profileData.profilePicture ? 'custom-photo' : ''}`} 
                    />
                  </div>
                  <div className="profile-edit-overlay">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="profile-picture-input"
                      id="sidebar-profile-upload"
                    />
                    <label htmlFor="sidebar-profile-upload" className="profile-edit-btn-small">
                      <img src={editIcon} alt="Edit" className="edit-icon" />
                    </label>
                  </div>
                </div>
                <div className="profile-username">{user?.name || user?.email || "User"}</div>
                <div className="profile-role"></div>
            </div>
            <nav className="profile-nav">
                {tabs.map((tab) => (
                    <div
                        key={tab.key}
                        className={`profile-tab${activeTab === tab.key ? " active" : ""}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.label}
                    </div>
                ))}
            </nav>
            <div className="profile-sidebar-footer">
                <div className="profile-create-teams">
                    <div className="profile-create-icon" aria-label="Create Teams" role="img">👤</div>
                    <div>
                        <div className="profile-create-title">Synergech</div>
                        <div className="profile-create-desc">Your Stay, Just a Click Away!</div>
                    </div>
                </div>
            </div>
        </aside>
      <main className="profile-main">
        {/* Content for each tab can be rendered here */}
        {activeTab === "reservation" && (
          <div className="crud-table-container">
            <div className="crud-table-header-row">
              <h3>Reservations</h3>
              <button className="crud-create-btn" onClick={() => navigate('/hotels')}>+ Book Hotel</button>
            </div>
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Guests</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {showCreate && (
                  <tr>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <img src={hotelImages[createData.hotel]} alt={createData.hotel} className="hotel-thumb" />
                      <select name="hotel" value={createData.hotel} onChange={handleCreateChange} className="crud-input">
                        <option value="Urbanza Suites">Urbanza Suites</option>
                        <option value="Grand Palace">Grand Palace</option>
                        <option value="Lakeview Resort">Lakeview Resort</option>
                      </select>
                    </td>
                    <td><input name="checkIn" type="date" value={createData.checkIn} onChange={handleCreateChange} className="crud-input" /></td>
                    <td><input name="checkOut" type="date" value={createData.checkOut} onChange={handleCreateChange} className="crud-input" /></td>
                    <td>
                      <select name="status" value={createData.status} onChange={handleCreateChange} className="crud-input">
                        <option value="Paid">Paid</option>
                        <option value="Cart">Cart</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </td>
                    <td><input name="guests" type="number" min="1" value={createData.guests} onChange={handleCreateChange} className="crud-input" /></td>
                    <td>
                      <button className="crud-action-btn crud-edit" onClick={handleCreateSave} title="Save">💾</button>
                      <button className="crud-action-btn crud-delete" onClick={handleCreateCancel} title="Cancel">✖️</button>
                    </td>
                  </tr>
                )}
                {reservations.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <img src={row.image || hotelImages[row.hotel]} alt={row.hotel} className="hotel-thumb" />
                      {row.hotel}
                    </td>
                    {editIdx === idx ? (
                      <>
                        <td><input name="checkIn" value={editData.checkIn} onChange={handleEditChange} className="crud-input" /></td>
                        <td><input name="checkOut" value={editData.checkOut} onChange={handleEditChange} className="crud-input" /></td>
                        <td>
                          <select name="status" value={editData.status} onChange={handleEditChange} className="crud-input">
                            <option value="Paid">Paid</option>
                            <option value="Cart">Cart</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </td>
                        <td><input name="guests" type="number" min="1" value={editData.guests} onChange={handleEditChange} className="crud-input" /></td>
                        <td>
                          <button className="crud-action-btn crud-edit" onClick={() => handleEditSave(idx)} title="Save">💾</button>
                          <button className="crud-action-btn crud-delete" onClick={handleEditCancel} title="Cancel">✖️</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{row.checkIn}</td>
                        <td>{row.checkOut}</td>
                        <td><span className={`crud-status ${row.status.toLowerCase()}`}>{row.status}</span></td>
                        <td>{row.guests}</td>
                        <td>
                          <button className="crud-action-btn crud-edit" onClick={() => handleEdit(idx)} title="Edit">✏️</button>
                          <button className="crud-action-btn crud-delete" onClick={() => handleDelete(idx)} title="Delete">🗑️</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="crud-table-footer">{reservations.length} items</div>
          </div>
        )}
        {activeTab === "bookings" && (
          <div className="crud-table-container">
            <div className="crud-table-header-row">
              <h3>Past Bookings</h3>
            </div>
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Location</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Guests</th>
                  <th>Rating</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, idx) => (
                  <tr key={idx}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <img src={booking.image} alt={booking.hotel} className="hotel-thumb" />
                      {booking.hotel}
                    </td>
                    <td>{booking.location}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.guests}</td>
                    <td>
                      {editBookingIdx === idx ? (
                        <div className="rating-stars">
                          {[1,2,3,4,5].map(star => (
                            <span
                              key={star}
                              className={star <= editBookingData.rating ? "star filled" : "star"}
                              onClick={() => handleBookingRating(star)}
                              style={{ cursor: 'pointer' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="rating-stars">
                          {[1,2,3,4,5].map(star => (
                            <span
                              key={star}
                              className={star <= booking.rating ? "star filled" : "star"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td style={{ minWidth: 180 }}>
                      {editBookingIdx === idx ? (
                        <input
                          className="crud-input"
                          name="description"
                          value={editBookingData.description}
                          onChange={handleBookingDescChange}
                          placeholder="Describe your experience..."
                        />
                      ) : (
                        <span>{booking.description || <span style={{ color: '#bdbdbd' }}>No description</span>}</span>
                      )}
                    </td>
                    <td>
                      {editBookingIdx === idx ? (
                        <>
                          <button className="crud-action-btn crud-edit" onClick={() => handleBookingSave(idx)} title="Save">💾</button>
                          <button className="crud-action-btn crud-delete" onClick={handleBookingCancel} title="Cancel">✖️</button>
                        </>
                      ) : (
                        <button className="crud-action-btn crud-edit" onClick={() => handleBookingEdit(idx)} title="Edit">✏️</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="crud-table-footer">{bookings.length} items</div>
          </div>
        )}
        {activeTab === "admin" && (
          <div className="admin-dashboard">
            {/* Dashboard Header */}
            <div className="dashboard-header">
              <h2>Dashboard</h2>
            </div>

            {/* Key Metrics Cards */}
            <div className="dashboard-metrics">
              <div className="metric-card">
                <div className="metric-icon">🏨</div>
                <div className="metric-content">
                  <div className="metric-label">Total Bookings</div>
                  <div className="metric-value">{adminDashboardData.totalBookings}</div>
                  <div className={`metric-growth ${adminDashboardData.bookingsGrowth > 0 ? 'positive' : 'negative'}`}>
                    {adminDashboardData.bookingsGrowth > 0 ? '↗' : '↘'} {Math.abs(adminDashboardData.bookingsGrowth)}% from last week
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">📋</div>
                <div className="metric-content">
                  <div className="metric-label">Check In</div>
                  <div className="metric-value">{adminDashboardData.totalCheckIns}</div>
                  <div className={`metric-growth ${adminDashboardData.checkInsGrowth > 0 ? 'positive' : 'negative'}`}>
                    {adminDashboardData.checkInsGrowth > 0 ? '↗' : '↘'} {Math.abs(adminDashboardData.checkInsGrowth)}% from last week
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">📤</div>
                <div className="metric-content">
                  <div className="metric-label">Check Out</div>
                  <div className="metric-value">{adminDashboardData.totalCheckOuts}</div>
                  <div className={`metric-growth ${adminDashboardData.checkOutsGrowth > 0 ? 'positive' : 'negative'}`}>
                    {adminDashboardData.checkOutsGrowth > 0 ? '↗' : '↘'} {Math.abs(adminDashboardData.checkOutsGrowth)}% from last week
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">💰</div>
                <div className="metric-content">
                  <div className="metric-label">Total Revenue</div>
                  <div className="metric-value">${adminDashboardData.totalRevenue.toLocaleString()}</div>
                  <div className={`metric-growth ${adminDashboardData.revenueGrowth > 0 ? 'positive' : 'negative'}`}>
                    {adminDashboardData.revenueGrowth > 0 ? '↗' : '↘'} {Math.abs(adminDashboardData.revenueGrowth)}% from last week
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="dashboard-charts">
              {/* Room Availability & Revenue */}
              <div className="chart-row">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Room Availability by Top Hotels</h3>
                    <div className="chart-menu">⋯</div>
                  </div>
                  <div className="room-legend">
                    <div className="room-stat-item">
                      <div className="room-stat-color occupied"></div>
                      <span className="room-stat-label">Occupied</span>
                    </div>
                    <div className="room-stat-item">
                      <div className="room-stat-color reserved"></div>
                      <span className="room-stat-label">Reserved</span>
                    </div>
                    <div className="room-stat-item">
                      <div className="room-stat-color available"></div>
                      <span className="room-stat-label">Available</span>
                    </div>
                    <div className="room-stat-item">
                      <div className="room-stat-color not-ready"></div>
                      <span className="room-stat-label">Not Ready</span>
                    </div>
                  </div>
                  <div className="room-visual">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Object.entries(adminDashboardData.roomStats).map(([hotel, stats]) => ({
                        hotel: hotel.replace(' Hotel', '').replace(' Hotels', ''),
                        occupied: stats.occupied,
                        reserved: stats.reserved,
                        available: stats.available,
                        notReady: stats.notReady
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="hotel" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={12}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                          labelFormatter={(label) => `Hotel: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="occupied" fill="#4ade80" name="Occupied" />
                        <Bar dataKey="reserved" fill="#a855f7" name="Reserved" />
                        <Bar dataKey="available" fill="#06b6d4" name="Available" />
                        <Bar dataKey="notReady" fill="#f97316" name="Not Ready" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Revenue sent</h3>
                    <select className="chart-selector">
                      <option>Last 6 Months</option>
                    </select>
                  </div>
                  <div className="revenue-highlight">
                    <span className="revenue-amount">$315,060</span>
                    <span className="revenue-date">May 2025</span>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={adminDashboardData.revenueData}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#06b6d4" 
                        fillOpacity={1} 
                        fill="url(#revenueGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reservations & Booking Platforms */}
              <div className="chart-row">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Reservations</h3>
                    <select className="chart-selector">
                      <option>Last 7 Months</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={adminDashboardData.reservationsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="booked" fill="#4ade80" name="Booked" />
                      <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Booking by Hotel</h3>
                    <div className="chart-menu">⋯</div>
                  </div>
                  <div className="platform-content">
                    <ResponsiveContainer width="50%" height={200}>
                      <PieChart>
                        <Pie
                          data={adminDashboardData.platformData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {adminDashboardData.platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="platform-legend">
                      {adminDashboardData.platformData.map((platform, index) => (
                        <div key={index} className="platform-item">
                          <div className="platform-color" style={{ backgroundColor: platform.color }}></div>
                          <span className="platform-percent">{platform.value}%</span>
                          <span className="platform-name">{platform.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="profile-settings-container">
            <div className="profile-settings-header">
              <h2>Welcome, {profileData.fullName || user?.name || "Amanda"}</h2>
              <p className="profile-date">Sun, 07 June 2025</p>
              {user?.email && (
                <div className="profile-email-indicator">
                  <span className="profile-save-status">📧 Profile saved for: {user.email}</span>
                </div>
              )}
            </div>
            
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-avatar-container">
                  <div className="profile-card-avatar" data-gender={profileData.gender}>
                    <img 
                      src={getProfileImage(profileData.profilePicture, profileData.gender)} 
                      alt="Profile" 
                      className={`profile-card-avatar-img ${profileData.profilePicture ? 'custom-photo' : ''}`} 
                    />
                  </div>
                  <div className="profile-card-edit-overlay">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="profile-picture-input"
                      id="card-profile-upload"
                    />
                    <label htmlFor="card-profile-upload" className="profile-edit-btn-small">
                      <img src={editIcon} alt="Edit" className="edit-icon" />
                    </label>
                    {profileData.profilePicture && (
                      <button 
                        onClick={removeProfilePicture}
                        className="profile-remove-btn-small"
                        title="Remove photo"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
                <div className="profile-card-info">
                  <h3>{profileData.fullName || user?.name || "Alexa Rawles"}</h3>
                  <p>{profileData.email || user?.email || "alexarawles@gmail.com"}</p>
                </div>
                <div className="profile-buttons">
                  <button className="profile-save-btn" onClick={handleProfileSave}>Save</button>
                  <button className="profile-edit-btn">Edit</button>
                </div>
              </div>
              
              <div className="profile-form">
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      placeholder="Your Full Name" 
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      className="profile-form-input"
                    />
                  </div>
                  <div className="profile-form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      name="nickName"
                      placeholder="Your Nick Name" 
                      value={profileData.nickName}
                      onChange={handleProfileChange}
                      className="profile-form-input"
                    />
                  </div>
                </div>
                
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label>Gender</label>
                    <select 
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      className="profile-form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label>Country</label>
                    <select 
                      name="country"
                      value={profileData.country}
                      onChange={handleProfileChange}
                      className="profile-form-select"
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
                
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label>Phone Number</label>
                    <div className="phone-input-container">
                      {profileData.country && countryPhoneConfig[profileData.country] && (
                        <span className="country-code">
                          {countryPhoneConfig[profileData.country].code}
                        </span>
                      )}
                      <input 
                        type="tel"
                        name="phoneNumber"
                        placeholder={getPhoneConstraints(profileData.country).placeholder}
                        value={profileData.phoneNumber}
                        onChange={handleProfileChange}
                        maxLength={getPhoneConstraints(profileData.country).maxLength}
                        className={`profile-form-input ${profileData.country ? 'with-country-code' : ''}`}
                        disabled={!profileData.country}
                      />
                    </div>
                    {profileData.country && countryPhoneConfig[profileData.country] && (
                      <small className="phone-format-hint">
                        Format: {countryPhoneConfig[profileData.country].format}
                      </small>
                    )}
                  </div>
                  <div className="profile-form-group">
                    <label>Time Zone</label>
                    <select 
                      name="timeZone"
                      value={profileData.timeZone}
                      onChange={handleProfileChange}
                      className="profile-form-select"
                    >
                      <option value="">Select Time Zone</option>
                      <option value="GMT+5:30 (India)">GMT+5:30 (India)</option>
                      <option value="GMT-5 (EST)">GMT-5 (EST)</option>
                      <option value="GMT-8 (PST)">GMT-8 (PST)</option>
                      <option value="GMT+0 (UTC)">GMT+0 (UTC)</option>
                    </select>
                  </div>
                </div>
                
                <div className="profile-email-section">
                  <h4>My email Address</h4>
                  {emailAddresses.map((emailItem, index) => (
                    <div key={index} className="profile-email-item">
                      <div className="profile-email-info">
                        <div className="profile-email-address">
                          {emailItem.email}
                          {emailItem.isPrimary && <span className="primary-badge">Primary</span>}
                        </div>
                        <div className="profile-email-time">{emailItem.timeAdded}</div>
                      </div>
                      {!emailItem.isPrimary && (
                        <button 
                          className="email-remove-btn"
                          onClick={() => {
                            const updatedEmails = emailAddresses.filter((_, i) => i !== index);
                            setEmailAddresses(updatedEmails);
                            localStorage.setItem('userEmails', JSON.stringify(updatedEmails));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {showAddEmail && (
                    <div className="add-email-form">
                      <input
                        type="email"
                        placeholder="Enter new email address"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="add-email-input"
                      />
                      <div className="add-email-buttons">
                        <button 
                          className="add-email-save-btn"
                          onClick={handleAddEmail}
                        >
                          Add Email
                        </button>
                        <button 
                          className="add-email-cancel-btn"
                          onClick={() => {
                            setShowAddEmail(false);
                            setNewEmail("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!showAddEmail && (
                    <button 
                      className="profile-add-email-btn"
                      onClick={() => setShowAddEmail(true)}
                    >
                      + Add Email Address
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
);
};

export default Profile;
