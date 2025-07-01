import React from 'react';

// Date and time utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

// URL utilities
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        searchParams.set(key, value.join(','));
      } else {
        searchParams.set(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
};

export const getVideoEmbedUrl = (videoLink) => {
  // Handle different video platforms
  if (videoLink.includes('youtube.com') || videoLink.includes('youtu.be')) {
    // Extract YouTube video ID and create embed URL
    const videoId = extractYouTubeId(videoLink);
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (videoLink.includes('vimeo.com')) {
    // Handle Vimeo URLs
    const videoId = videoLink.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  // Default handling - assume it's already an embed URL or direct link
  return videoLink.startsWith('http') ? videoLink : `https://${videoLink}`;
};

const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateVideoData = (data) => {
  const errors = {};
  
  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!data.videoLink?.trim()) {
    errors.videoLink = 'Video link is required';
  } else if (!validateUrl(data.videoLink)) {
    errors.videoLink = 'Please enter a valid URL';
  }
  
  if (!data.genre) {
    errors.genre = 'Genre is required';
  }
  
  if (!data.contentRating) {
    errors.contentRating = 'Content rating is required';
  }
  
  if (!data.releaseDate) {
    errors.releaseDate = 'Release date is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Debounce utility
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Storage utilities
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error('Failed to save to localStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      // console.error('Failed to get from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // console.error('Failed to remove from localStorage:', error);
    }
  }
};

// Performance utilities
export const lazyComponent = (importFunc) => {
  return React.lazy(importFunc);
};

// Error handling utilities
export const handleAsyncError = (error, fallbackMessage = 'Something went wrong') => {
  const message = error?.message || fallbackMessage;
  // console.error('Async operation failed:', error);
  return message;
}; 