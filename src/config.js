// Xflix Configuration
const config = {
  app: {
    name: process.env.REACT_APP_NAME || 'Xflix',
    version: process.env.REACT_APP_VERSION || '2.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://184b4819-8555-4ffd-b8f5-b4f43107dc32.mock.pstmn.io/v1',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
    endpoints: {
      videos: '/videos',
      upload: '/videos',
      views: (id) => `/videos/${id}/views`,
      votes: (id) => `/videos/${id}/votes`,
    }
  },
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    debugMode: process.env.REACT_APP_DEBUG_MODE === 'true',
    enableServiceWorker: process.env.REACT_APP_ENABLE_SERVICE_WORKER === 'true',
  },
  ui: {
    debounceDelay: 500,
    itemsPerPage: 20,
    videoPlayer: {
      autoplay: true,
      mute: true,
    }
  }
};

// API URLs
export const API_ENDPOINTS = {
  videos: `${config.api.baseUrl}${config.api.endpoints.videos}`,
  upload: `${config.api.baseUrl}${config.api.endpoints.upload}`,
  views: (id) => `${config.api.baseUrl}${config.api.endpoints.views(id)}`,
  votes: (id) => `${config.api.baseUrl}${config.api.endpoints.votes(id)}`,
};

// Legacy support
const endPoint = API_ENDPOINTS.videos;

export { config };
export default endPoint;