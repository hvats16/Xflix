import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Grid, Divider, LinearProgress, Box, Alert } from "@mui/material";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import VideoCard from "./VideoCard";
import { useVideos } from "../hooks/useVideos";

const VideoPage = React.memo(() => {
  const { pathname } = useLocation();
  const params = useParams();
  const videoId = params.videoId;
  
  const { videos, isLoading, error, getVideoById, updateVideoViews, clearError } = useVideos();
  const [currentVideo, setCurrentVideo] = useState(null);

  // Get current video
  useEffect(() => {
    if (videoId && videos.length > 0) {
      const video = getVideoById(videoId);
      setCurrentVideo(video);
      
      // Update view count when video is loaded
      if (video) {
        updateVideoViews(videoId);
      }
    }
  }, [videoId, videos]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Memoized related videos (exclude current video)
  const relatedVideos = useMemo(() => {
    return videos.filter(video => video._id !== videoId);
  }, [videos, videoId]);

  // Memoized related video cards
  const relatedVideoCards = useMemo(() => {
    return relatedVideos.map((video) => (
      <Grid
        key={video._id}
        item
        display="flex"
        justifyContent="center"
        p={2}
        xs={12}
        sm={6}
        md={4}
        lg={3}
      >
        <VideoCard video={video} />
      </Grid>
    ));
  }, [relatedVideos]);

  // If video not found and not loading, redirect to home
  if (!isLoading && !currentVideo && videos.length > 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* Loading indicator */}
      {isLoading && (
        <Box sx={{ position: "absolute", width: "100%", zIndex: 1000 }}>
          <LinearProgress color="primary" sx={{ height: "2px" }} />
        </Box>
      )}

      {/* Error display */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Box>
      )}

      <Header />

      {currentVideo ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ mt: { sm: 2 } }}
        >
          {/* Main Video Section */}
          <Grid item xs={12} sm={11} lg={10}>
            <VideoPlayer video={currentVideo} />
            <Divider
              sx={{ 
                width: "100%", 
                borderColor: "#444D56",
                my: 2
              }}
              orientation="horizontal"
            />
          </Grid>

          {/* Related Videos Section */}
          <Grid item xs={12} sm={11.6} lg={10.6}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              m={0}
              width="100%"
              p={2}
            >
              {relatedVideoCards.length > 0 ? (
                relatedVideoCards
              ) : (
                !isLoading && (
                  <Grid item xs={12}>
                    <Box 
                      display="flex" 
                      justifyContent="center" 
                      alignItems="center" 
                      minHeight="20vh"
                    >
                      <Alert severity="info">
                        No related videos available.
                      </Alert>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        // Loading state for video content
        !error && (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="60vh"
          >
            <Alert severity="info">
              Loading video...
            </Alert>
          </Box>
        )
      )}
    </>
  );
});

VideoPage.displayName = 'VideoPage';

export default VideoPage;
