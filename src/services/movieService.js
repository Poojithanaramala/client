// src/services/movieService.js
import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const movieService = {
  /**
   * Get all movies
   */
  getAllMovies: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.MOVIES);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get movie by ID
   */
  getMovieById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.MOVIE_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get personalized movie suggestions
   */
  getMovieSuggestions: async (username) => {
    try {
      const response = await api.get(API_ENDPOINTS.MOVIES_SUGGESTIONS(username));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create movie (admin only)
   */
  createMovie: async (movieData) => {
    try {
      const response = await api.post(API_ENDPOINTS.MOVIES, movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update movie (admin only)
   */
  updateMovie: async (id, movieData) => {
    try {
      const response = await api.put(API_ENDPOINTS.MOVIE_BY_ID(id), movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete movie (admin only)
   */
  deleteMovie: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.MOVIE_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload movie photo
   */
  uploadMoviePhoto: async (movieId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/movies/photo/${movieId}`, formData, {
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

export default movieService;