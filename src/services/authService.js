// src/services/authService.js
import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { setAuthToken, removeAuthToken } from '../utils/helpers';

const authService = {
  /**
   * Login user
   */
  login: async (username, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, {
        username,
        password,
      });
      
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register new user
   */
  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
      removeAuthToken();
    } catch (error) {
      // Even if API call fails, remove token locally
      removeAuthToken();
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.patch(API_ENDPOINTS.ME, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload user photo
   */
  uploadPhoto: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/users/photo/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;