// This file contains hotel image imports for use in the Bookings table
import hotel1 from './Orange Residency/MAN07831.JPG';
import hotel2 from './Orange Residency/MAN07836.JPG';
import hotel3 from './Orange Residency/MAN07837.JPG';
import hotel4 from './Orange Residency/MAN07840.JPG';
import hotel5 from './Orange Residency/MAN07842.JPG';
import hotel6 from './Orange Residency/MAN07844.JPG';
import hotel7 from './Orange Residency/MAN07846.JPG';
import hotel8 from './Orange Residency/MAN07847.JPG';
import hotel9 from './Orange Residency/MAN07850.JPG';
import hotel10 from './Orange Residency/MAN07851.JPG';
import hotel11 from './Orange Residency/MAN07857.JPG';
import hotel12 from './Orange Residency/MAN07858.JPG';
import hotel13 from './Orange Residency/MAN07861.JPG';
import hotel14 from './Orange Residency/MAN07865.JPG';
import hotel15 from './Orange Residency/MAN07866.JPG';
import hotel16 from './Orange Residency/MAN07867.JPG';
import hotel17 from './Orange Residency/MAN07874.JPG';
import hotel18 from './Orange Residency/MAN07876.JPG';
import hotel19 from './Orange Residency/MAN07879.JPG';
import hotel20 from './Orange Residency/MAN07882.JPG';
import hotel21 from './Orange Residency/MAN07885.JPG';
import hotel22 from './Orange Residency/MAN07891.JPG';
import hotel23 from './Orange Residency/MAN07904.JPG';
import hotel24 from './Orange Residency/MAN07915.JPG';
import hotel25 from './Orange Residency/MAN07923.JPG';

// Array of all available hotel images for random selection
export const allHotelImages = [
  hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10,
  hotel11, hotel12, hotel13, hotel14, hotel15, hotel16, hotel17, hotel18, hotel19, hotel20,
  hotel21, hotel22, hotel23, hotel24, hotel25
];

// Function to get a random image based on hotel name (consistent for same hotel)
export const getRandomHotelImage = (hotelName) => {
  // Create a simple hash from hotel name to ensure consistency
  let hash = 0;
  for (let i = 0; i < hotelName.length; i++) {
    const char = hotelName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % allHotelImages.length;
  return allHotelImages[index];
};

export const hotelImages = {
  'Urbanza Suites': hotel1,
  'Grand Palace': hotel2,
  'Lakeview Resort': hotel3,
  'Sunset Villa': hotel4,
  'Mountain Retreat': hotel5,
  'City Lights Hotel': hotel6,
  // Additional hotels from the booking system
  'The Orchid Hotel': hotel7,
  'Whistling Meadows Resort': hotel8,
  'Radisson Blu Hotel': hotel9,
  'Lotus Heritage Palace': hotel10,
  'Taj Hotels': hotel11,
  'Le Royal Meridien': hotel12,
  'The Westin': hotel13,
  'Lemon Tree Hotels': hotel14,
  'Grand Hyatt': hotel15,
  'Novotel Hyderabad': hotel16,
  'ITC Grand Chola': hotel17,
  // Additional variety
  'Marriott Hotels': hotel19,
  'Hilton Hotels': hotel20,
  'Sheraton Hotels': hotel21,
  'Hyatt Regency': hotel22,
  'Four Seasons': hotel23,
  'Ritz Carlton': hotel24,
  'InterContinental': hotel25,
  // Default fallback
  'default': hotel18,
};
