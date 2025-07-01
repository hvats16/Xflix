import axios from 'axios';
import { config } from '../config';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      // console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    if (process.env.NODE_ENV === 'development') {
      // console.error('API Error:', errorMessage);
    }

    // Handle different types of errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // console.warn('Unauthorized access');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      // console.error('Server error occurred');
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
      status: error.response?.status,
    });
  }
);

// API methods
export const api = {
  // Get all videos with optional query parameters
  getVideos: async (params = {}) => {
    try {
      const response = await apiClient.get('/videos', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload a new video
  uploadVideo: async (videoData) => {
    try {
      const response = await apiClient.post('/videos', videoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update video views
  updateViews: async (videoId) => {
    try {
      const response = await apiClient.patch(`/videos/${videoId}/views`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update video votes
  updateVotes: async (videoId, voteType = 'up') => {
    try {
      const response = await apiClient.patch(`/videos/${videoId}/votes`, {
        vote: voteType,
        change: 'increase'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient; 