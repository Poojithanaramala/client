// src/services/reservationService.js
import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const reservationService = {
  /**
   * Get all reservations (user's reservations)
   */
  getAllReservations: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.RESERVATIONS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get reservation by ID
   */
  getReservationById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.RESERVATION_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create reservation
   */
  createReservation: async (reservationData) => {
    try {
      const response = await api.post(API_ENDPOINTS.RESERVATIONS, reservationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update reservation (admin only)
   */
  updateReservation: async (id, reservationData) => {
    try {
      const response = await api.patch(API_ENDPOINTS.RESERVATION_BY_ID(id), reservationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete reservation (admin only)
   */
  deleteReservation: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.RESERVATION_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check-in reservation
   */
  checkinReservation: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.CHECKIN(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get personalized seat suggestions
   */
  getSeatSuggestions: async (username) => {
    try {
      const response = await api.get(API_ENDPOINTS.SEAT_SUGGESTIONS(username));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default reservationService;