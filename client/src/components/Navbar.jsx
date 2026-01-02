import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../assets/orange.png";
import searchIcon from "../assets/searchIcon.svg";
import userIcon from "../assets/userIcon.svg";
  import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout with redirection to home page
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
    // Optional: Show a brief confirmation message
    setTimeout(() => {
      console.log('Successfully logged out and redirected to home page');
    }, 100);
  };

  return (
    <nav className="navbar-container sticky-navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-logo">
          <img
            src={logo}
            alt="Orange Residency"
            style={{ height: '55px', width: 'auto', display: 'block' }}
          />
        </a>
      </div>
      <div className="navbar-links">
        <a href="/" className="navbar-link">Home</a>
        <a href="/accommodation" className="navbar-link">Accommodation</a>
        <a href="/experiences" className="navbar-link">Experiences</a>
        <a href="/about" className="navbar-link">About</a>
        <a href="/contact" className="navbar-link">Contact</a>
      </div>
      <div className="navbar-actions">
        <img src={searchIcon} alt="search" className="navbar-icon" />
        {!user ? (
          <>
            <button onClick={() => navigate('/signin')} className="navbar-btn-login" style={{marginRight: '0.5rem'}}>Sign In</button>
            <button onClick={() => navigate('/login')} className="navbar-btn-login">Login</button>
          </>
        ) : (
          <div className="navbar-profile">
            <span onClick={() => navigate('/profile')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
              <img src={userIcon} alt="profile" className="navbar-icon" />
            </span>
            <span className="navbar-user-email">{user.email}</span>
            <button onClick={handleLogout} className="navbar-btn-login">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;