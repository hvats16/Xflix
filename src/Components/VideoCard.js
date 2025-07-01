import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Stack,
  Divider,
  Box
} from '@mui/material';
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const VideoCard = React.memo(({ video }) => {
  if (!video) {
    return null;
  }

  const handleImageError = (e) => {
    // Set a fallback image if the preview image fails to load
    e.target.src = '/placeholder-video.jpg'; // You can add a placeholder image
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
  };

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          width: "100%", 
          height: "100%", 
          backgroundColor: "#181818",
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          }
        }}
        elevation={2}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              height={150}
              component="img"
              image={video.previewImage}
              alt={video.title}
              onError={handleImageError}
              loading="lazy"
              sx={{
                objectFit: 'cover',
                backgroundColor: '#2c2c2c', // Fallback color while loading
              }}
            />
            
            {/* Content Rating Badge */}
            {video.contentRating && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                }}
              >
                {video.contentRating}
              </Box>
            )}
          </Box>

          <CardContent sx={{ 
            height: "100%", 
            backgroundColor: "#202020", 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Title */}
            <Typography 
              gutterBottom 
              variant="h6" 
              component="h3" 
              color="#fff" 
              sx={{
                fontSize: "14.5px",
                fontWeight: "600",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mb: 1,
                lineHeight: 1.3,
              }}
              title={video.title} // Show full title on hover
            >
              {video.title}
            </Typography>

            {/* Metadata */}
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">
              <Typography 
                variant="body2" 
                color="#999999"
                sx={{ 
                  fontSize: '0.8rem',
                  textTransform: 'capitalize'
                }}
              >
                {video.genre}
              </Typography>
              
              <Divider 
                sx={{ 
                  height: 16, 
                  borderColor: "#999999" 
                }} 
                orientation="vertical" 
              />
              
              <Typography 
                variant="body2" 
                color="#999999"
                sx={{ fontSize: '0.8rem' }}
              >
                {formatDate(video.releaseDate)}
              </Typography>
            </Stack>

            {/* View Count (if available) */}
            {video.viewCount && (
              <Typography 
                variant="body2" 
                color="#777777"
                sx={{ 
                  fontSize: '0.7rem',
                  mt: 0.5,
                }}
              >
                {video.viewCount.toLocaleString()} views
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;