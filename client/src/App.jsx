import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hotels from './components/Hotels';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Home';
import Login from './components/Login';
import SignIn from './components/SignIn';
import OtpVerify from './components/OtpVerify';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import Experiences from './components/Experiences';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/otp-verify" element={<OtpVerify />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/accommodation" element={<Hotels />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
