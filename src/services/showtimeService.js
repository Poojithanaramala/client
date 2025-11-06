// src/services/showtimeService.js
import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const showtimeService = {
  /**
   * Get all showtimes
   */
  getAllShowtimes: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.SHOWTIMES);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get showtime by ID
   */
  getShowtimeById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.SHOWTIME_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get showtimes by movie ID
   */
  getShowtimesByMovie: async (movieId) => {
    try {
      const response = await api.get(API_ENDPOINTS.SHOWTIMES);
      const showtimes = response.data;
      return showtimes.filter(showtime => showtime.movieId === movieId);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get showtimes by cinema ID
   */
  getShowtimesByCinema: async (cinemaId) => {
    try {
      const response = await api.get(API_ENDPOINTS.SHOWTIMES);
      const showtimes = response.data;
      return showtimes.filter(showtime => showtime.cinemaId === cinemaId);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create showtime (admin only)
   */
  createShowtime: async (showtimeData) => {
    try {
      const response = await api.post(API_ENDPOINTS.SHOWTIMES, showtimeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update showtime (admin only)
   */
  updateShowtime: async (id, showtimeData) => {
    try {
      const response = await api.patch(API_ENDPOINTS.SHOWTIME_BY_ID(id), showtimeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete showtime (admin only)
   */
  deleteShowtime: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.SHOWTIME_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default showtimeService;