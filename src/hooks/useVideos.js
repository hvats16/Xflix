import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { buildQueryString, handleAsyncError } from '../utils/helpers';
import { config } from '../config';

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch videos with filters
  const fetchVideos = useCallback(async (filters = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const queryParams = {};
      
      // Build query parameters
      if (filters.search) {
        queryParams.title = filters.search;
      }
      if (filters.genres && filters.genres.length > 0) {
        queryParams.genres = filters.genres.join(',');
      }
      if (filters.ageGroup) {
        queryParams.contentRating = filters.ageGroup;
      }
      if (filters.sortBy && filters.sortBy !== 'releaseDate') {
        queryParams.sortBy = filters.sortBy;
      }

      const data = await api.getVideos(queryParams);
      setVideos(data.videos || []);
    } catch (err) {
      const errorMessage = handleAsyncError(err, 'Failed to fetch videos');
      setError(errorMessage);
      // console.error('Error fetching videos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Upload video
  const uploadVideo = useCallback(async (videoData) => {
    try {
      setError(null);
      const response = await api.uploadVideo(videoData);
      
      // Refresh videos list after successful upload
      await fetchVideos();
      
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = handleAsyncError(err, 'Failed to upload video');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [fetchVideos]);

  // Update video views
  const updateVideoViews = useCallback(async (videoId) => {
    try {
      await api.updateViews(videoId);
      
      // Update local state to reflect view count increase
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video._id === videoId
            ? { ...video, viewCount: (video.viewCount || 0) + 1 }
            : video
        )
      );
    } catch (err) {
      // console.error('Error updating views:', err);
      // Don't show error to user for view updates as it's not critical
    }
  }, []);

  // Update video votes
  const updateVideoVotes = useCallback(async (videoId, voteType = 'up') => {
    try {
      await api.updateVotes(videoId, voteType);
      
      // Update local state to reflect vote changes
      setVideos(prevVideos =>
        prevVideos.map(video => {
          if (video._id === videoId) {
            const updatedVotes = { ...video.votes };
            if (voteType === 'up') {
              updatedVotes.upVotes = (updatedVotes.upVotes || 0) + 1;
            } else {
              updatedVotes.downVotes = (updatedVotes.downVotes || 0) + 1;
            }
            return { ...video, votes: updatedVotes };
          }
          return video;
        })
      );
      
      return { success: true };
    } catch (err) {
      const errorMessage = handleAsyncError(err, 'Failed to update vote');
      return { success: false, error: errorMessage };
    }
  }, []);

  // Get video by ID
  const getVideoById = useCallback((videoId) => {
    return videos.find(video => video._id === videoId);
  }, [videos]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    videos,
    isLoading,
    error,
    fetchVideos,
    uploadVideo,
    updateVideoViews,
    updateVideoVotes,
    getVideoById,
    clearError,
  };
}; 