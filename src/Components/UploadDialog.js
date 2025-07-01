import React, { useState, useCallback } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  CircularProgress,
  Alert
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { useVideos } from '../hooks/useVideos';
import { validateVideoData } from '../utils/helpers';

const UploadDialog = React.memo(({ open, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState("");
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadVideo } = useVideos();
  
  const [formData, setFormData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: ""
  });

  // Handle form field changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }, [errors]);

  // Validate and upload video
  const handleUpload = useCallback(async () => {
    try {
      setUploadError("");
      
      // Validate form data
      const validation = validateVideoData(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      setIsUploading(true);
      const result = await uploadVideo(formData);
      
      if (result.success) {
        enqueueSnackbar('Video uploaded successfully!', { variant: 'success' });
        onClose();
        
        // Reset form
        setFormData({
          videoLink: "",
          title: "",
          genre: "",
          contentRating: "",
          releaseDate: "",
          previewImage: ""
        });
        
        // Navigate to home to see the new video
        navigate("/");
      } else {
        setUploadError(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadError('An unexpected error occurred');
      // console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle dialog close
  const handleClose = useCallback(() => {
    if (!isUploading) {
      onClose();
    }
  }, [isUploading, onClose]);

  const genreOptions = [
    { value: "Education", label: "Education" },
    { value: "Sports", label: "Sports" },
    { value: "Comedy", label: "Comedy" },
    { value: "Lifestyle", label: "Lifestyle" }
  ];

  const ratingOptions = [
    { value: "7+", label: "7+" },
    { value: "12+", label: "12+" },
    { value: "16+", label: "16+" },
    { value: "18+", label: "18+" }
  ];

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={isUploading}
    >
      <DialogTitle>Upload Video</DialogTitle>
      
      <DialogContent 
        sx={{
          scrollbarWidth: "thin",
          display: "flex",
          gap: 2,
          flexDirection: "column",
          paddingTop: "10px !important",
        }}
      >
        <DialogContentText>
          Fill in the details below to upload your video.
        </DialogContentText>

        {/* Upload Error */}
        {uploadError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {uploadError}
          </Alert>
        )}

        {/* Video Link */}
        <TextField
          onChange={handleInputChange}
          value={formData.videoLink}
          autoFocus
          margin="dense"
          name="videoLink"
          label="Video Link"
          type="url"
          fullWidth
          variant="outlined"
          helperText="Enter the YouTube or video URL"
          error={!!errors.videoLink}
          disabled={isUploading}
          required
        />
        {errors.videoLink && (
          <FormHelperText error>{errors.videoLink}</FormHelperText>
        )}

        {/* Thumbnail Image */}
        <TextField
          onChange={handleInputChange}
          value={formData.previewImage}
          margin="dense"
          name="previewImage"
          label="Thumbnail Image Link"
          type="url"
          fullWidth
          variant="outlined"
          helperText="URL for the video thumbnail image"
          error={!!errors.previewImage}
          disabled={isUploading}
        />

        {/* Title */}
        <TextField
          onChange={handleInputChange}
          value={formData.title}
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          helperText="Enter a descriptive title for your video"
          error={!!errors.title}
          disabled={isUploading}
          required
        />
        {errors.title && (
          <FormHelperText error>{errors.title}</FormHelperText>
        )}

        {/* Genre */}
        <FormControl 
          fullWidth 
          margin="dense" 
          error={!!errors.genre}
          disabled={isUploading}
          required
        >
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            value={formData.genre}
            label="Genre"
            onChange={handleInputChange}
          >
            {genreOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors.genre || "Select the video category"}
          </FormHelperText>
        </FormControl>

        {/* Content Rating */}
        <FormControl 
          fullWidth 
          margin="dense"
          error={!!errors.contentRating}
          disabled={isUploading}
          required
        >
          <InputLabel>Age Rating</InputLabel>
          <Select
            name="contentRating"
            value={formData.contentRating}
            label="Age Rating"
            onChange={handleInputChange}
          >
            {ratingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors.contentRating || "Select appropriate age group"}
          </FormHelperText>
        </FormControl>

        {/* Release Date */}
        <TextField
          onChange={handleInputChange}
          value={formData.releaseDate}
          InputLabelProps={{ shrink: true }}
          margin="dense"
          name="releaseDate"
          label="Release Date"
          type="date"
          fullWidth
          variant="outlined"
          helperText="When was this video released?"
          error={!!errors.releaseDate}
          disabled={isUploading}
          required
        />
        {errors.releaseDate && (
          <FormHelperText error>{errors.releaseDate}</FormHelperText>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={isUploading}
          startIcon={isUploading ? <CircularProgress size={16} /> : null}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
        
        <Button
          color="secondary"
          onClick={handleClose}
          disabled={isUploading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
});

UploadDialog.displayName = 'UploadDialog';

export default UploadDialog;
