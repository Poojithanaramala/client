// src/utils/helpers.js

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date to short string
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format time
 */
export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = '₹') => {
  if (!amount && amount !== 0) return `${currency}0`;
  return `${currency}${amount.toLocaleString()}`;
};

/**
 * Capitalize first letter of each word
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate seat label
 */
export const getSeatLabel = (seat) => {
  if (typeof seat === 'string') return seat;
  return `${seat.row}${seat.number}`;
};

/**
 * Check if movie is currently showing
 */
export const isMovieShowing = (movie) => {
  const now = new Date();
  const releaseDate = new Date(movie.releaseDate);
  const endDate = new Date(movie.endDate);
  return now >= releaseDate && now <= endDate;
};

/**
 * Get time difference from now
 */
export const getTimeDifference = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diff = target - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return 'Now';
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone
 */
export const isValidPhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
};

/**
 * Get error message from API error
 */
export const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.error?.message || error.response.data?.error || 'Something went wrong';
  }
  if (error.request) {
    return 'Network error. Please check your connection.';
  }
  return error.message || 'An unexpected error occurred';
};

/**
 * Store token in localStorage
 */
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Get token from localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Remove token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};