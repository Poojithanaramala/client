// src/services/cinemaService.js
import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const cinemaService = {
  /**
   * Get all cinemas
   */
  getAllCinemas: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.CINEMAS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get cinema by ID
   */
  getCinemaById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.CINEMA_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get personalized cinema suggestions
   */
  getCinemaSuggestions: async (username) => {
    try {
      const response = await api.get(API_ENDPOINTS.CINEMA_SUGGESTIONS(username));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create cinema (admin only)
   */
  createCinema: async (cinemaData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CINEMAS, cinemaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update cinema (admin only)
   */
  updateCinema: async (id, cinemaData) => {
    try {
      const response = await api.patch(API_ENDPOINTS.CINEMA_BY_ID(id), cinemaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete cinema (admin only)
   */
  deleteCinema: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.CINEMA_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cinemaService;