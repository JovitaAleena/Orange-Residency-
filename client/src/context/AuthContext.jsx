import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Clear session-specific data that shouldn't persist across logins
    localStorage.removeItem('intendedBooking');
    // Note: User-specific profile data (userProfile_email) is intentionally kept
    // so users can retain their profile pictures and settings per email
  };

  useEffect(() => {
    // Sync user state with localStorage if needed
    const stored = localStorage.getItem('user');
    if (!user && stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
