
// src/utils/constants.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/users/login',
  REGISTER: '/users',
  LOGOUT: '/users/logout',
  ME: '/users/me',
  
  // Movies
  MOVIES: '/movies',
  MOVIE_BY_ID: (id) => `/movies/${id}`,
  
  // Cinemas
  CINEMAS: '/cinemas',
  CINEMA_BY_ID: (id) => `/cinemas/${id}`,
  
  // Showtimes
  SHOWTIMES: '/showtimes',
  SHOWTIME_BY_ID: (id) => `/showtimes/${id}`,
  
  // Reservations
  RESERVATIONS: '/reservations',
  RESERVATION_BY_ID: (id) => `/reservations/${id}`,
  CHECKIN: (id) => `/reservations/checkin/${id}`,
  
  // User Modeling
  MOVIES_SUGGESTIONS: (username) => `/movies/usermodeling/${username}`,
  CINEMA_SUGGESTIONS: (username) => `/cinemas/usermodeling/${username}`,
  SEAT_SUGGESTIONS: (username) => `/reservations/usermodeling/${username}`,
};

export const SEAT_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  SELECTED: 'selected',
};

export const USER_ROLES = {
  GUEST: 'guest',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Romance',
  'Adventure',
  'Animation',
  'Documentary',
];

export const LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Kannada',
];

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  BOOKING_SUCCESS: 'Booking confirmed!',
  BOOKING_ERROR: 'Booking failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};