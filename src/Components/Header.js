import React, { useState, useCallback } from 'react';
import { Box, Stack, InputBase, IconButton, Divider, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/XFLIX-LOGO.png';
import UploadDialog from './UploadDialog';

const Header = React.memo(({ search = '', onSearchChange }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setIsDialogOpened(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpened(false);
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    onSearchChange?.(value);
    
    // Show search bar when user starts typing
    if (value && !isSearchVisible) {
      setIsSearchVisible(true);
    }
  }, [onSearchChange, isSearchVisible]);

  const handleSearchFocus = useCallback(() => {
    setIsSearchVisible(true);
  }, []);

  const handleSearchBlur = useCallback((e) => {
    // Hide search bar if it's empty and user clicks away
    if (!e.target.value) {
      setIsSearchVisible(false);
    }
  }, []);

  return (
    <>
      <Box className="header">
        <Box className="header-title">
          <Link to="/" aria-label="Go to homepage">
            <img 
              className="xflix-icon" 
              src={logo} 
              alt="Xflix Logo"
              loading="lazy"
            />
          </Link>
        </Box>

        {/* Search Bar - Always rendered but conditionally visible */}
        <Box 
          className="search-bar" 
          sx={{
            height: 40,
            m: 0.5,
            opacity: isSearchVisible || search ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            visibility: isSearchVisible || search ? 'visible' : 'hidden',
          }}
        >
          <Stack direction="row">
            <InputBase
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={search}
              sx={{
                ml: 1,
                color: "#909090",
                p: 0.5,
                width: { sm: 200, md: 400 }
              }}
              placeholder="Search videos..."
              inputProps={{
                'aria-label': 'Search videos',
              }}
            />
            <Divider 
              sx={{ 
                height: 26, 
                mt: 0.8, 
                borderColor: "#444D56" 
              }} 
              orientation="vertical" 
            />
            <IconButton 
              type="button" 
              sx={{ p: '10px', color: "#808080" }} 
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Search Toggle Button - Mobile */}
        {!isSearchVisible && (
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              sx={{ color: "#808080" }}
              aria-label="Toggle search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        {/* Upload Button */}
        <Box className="upload-button" sx={{ ml: 1 }}>
          <Button
            onClick={handleOpenDialog}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<FileUploadOutlinedIcon />}
            aria-label="Upload video"
          >
            <Typography 
              variant='button' 
              sx={{ 
                display: { xs: "none", sm: "block" }, 
                ml: 0.5,
                textTransform: 'none'
              }}
            >
              Upload
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* Upload Dialog */}
      {isDialogOpened && (
        <UploadDialog 
          open={isDialogOpened} 
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
});

Header.displayName = 'Header';

export default Header;