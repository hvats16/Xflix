import React, { useEffect, useState, useCallback } from "react";
import { 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Stack, 
  Typography, 
  Divider,
  Box,
  Alert
} from '@mui/material';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import './VideoPlayer.css';
import { useVideos } from "../hooks/useVideos";
import { getVideoEmbedUrl, formatDate } from "../utils/helpers";
import { config } from "../config";

const VideoPlayer = React.memo(({ video }) => {
  const [selectedVote, setSelectedVote] = useState("");
  const [voteError, setVoteError] = useState("");
  
  const { updateVideoVotes } = useVideos();

  // Handle voting
  const handleVote = useCallback(async (voteType) => {
    if (selectedVote === voteType) {
      return; // Don't vote twice for the same type
    }

    try {
      setVoteError("");
      const result = await updateVideoVotes(video._id, voteType);
      
      if (result.success) {
        setSelectedVote(voteType);
      } else {
        setVoteError(result.error || "Failed to vote");
      }
    } catch (error) {
      setVoteError("An error occurred while voting");
    }
  }, [video._id, selectedVote, updateVideoVotes]);

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  if (!video) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Alert severity="error">Video not found</Alert>
      </Box>
    );
  }

  const embedUrl = getVideoEmbedUrl(video.videoLink);

  return (
    <Card 
      sx={{ 
        width: "100%", 
        borderRadius: "6px", 
        boxShadow: 3,
        backgroundColor: "#181818"
      }}
    >
      {/* Video Player */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="iframe"
          src={`${embedUrl}?autoplay=${config.ui.videoPlayer.autoplay ? 1 : 0}&mute=${config.ui.videoPlayer.mute ? 1 : 0}`}
          sx={{
            border: 0,
            width: "100%",
            height: { xs: "16rem", sm: "25rem", md: "30rem", lg: "35rem" },
          }}
          title={video.title}
          allowFullScreen
        />
      </Box>

      {/* Video Information */}
      <CardContent sx={{ backgroundColor: "#181818", p: 3 }}>
        {/* Title */}
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            fontWeight: 600,
            mb: 2,
            color: "#fff"
          }}
        >
          {video.title}
        </Typography>

        {/* Metadata and Actions Row */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          justifyContent="space-between" 
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={2}
        >
          {/* Metadata */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontSize: "0.9rem", color: "#797979" }}>
              {video.genre}
            </Typography>
            <Divider 
              sx={{ height: 20, borderColor: "#797979" }} 
              orientation="vertical" 
            />
            <Typography sx={{ fontSize: "0.9rem", color: "#797979" }}>
              {video.contentRating} rating
            </Typography>
          </Stack>

          {/* Voting Section */}
          <Stack 
            direction="row" 
            spacing={0} 
            sx={{
              border: "1px solid #444D56",
              borderRadius: "50px",
              overflow: "hidden"
            }}
          >
            <Button
              onClick={() => handleVote("up")}
              variant="text"
              color="secondary"
              sx={{
                borderRadius: "50px 0 0 50px",
                px: 2,
                py: 1,
                backgroundColor: selectedVote === "up" ? "rgba(255,255,255,0.1)" : "transparent",
                '&:hover': {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
              startIcon={
                <ThumbUpAltIcon 
                  sx={{ 
                    color: selectedVote === "up" ? "#fff" : "#797979" 
                  }} 
                />
              }
              disabled={selectedVote === "up"}
            >
              {formatNumber(video.votes?.upVotes || 0)}
            </Button>
            
            <Divider 
              sx={{ borderColor: "#444D56" }} 
              orientation="vertical" 
              flexItem
            />
            
            <Button
              onClick={() => handleVote("down")}
              variant="text"
              color="secondary"
              sx={{
                borderRadius: "0 50px 50px 0",
                px: 2,
                py: 1,
                backgroundColor: selectedVote === "down" ? "rgba(255,255,255,0.1)" : "transparent",
                '&:hover': {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
              startIcon={
                <ThumbDownAltIcon 
                  sx={{ 
                    color: selectedVote === "down" ? "#fff" : "#797979" 
                  }} 
                />
              }
              disabled={selectedVote === "down"}
            >
              {formatNumber(video.votes?.downVotes || 0)}
            </Button>
          </Stack>
        </Stack>

        {/* Vote Error */}
        {voteError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {voteError}
          </Alert>
        )}

        {/* Additional Information */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ fontSize: "0.8rem", color: "#797979" }}>
            {formatNumber(video.viewCount || 0)} views
          </Typography>
          <div className="dot"></div>
          <Typography sx={{ fontSize: "0.8rem", color: "#797979" }}>
            {formatDate(video.releaseDate)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;