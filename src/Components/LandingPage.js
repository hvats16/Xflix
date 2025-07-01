import React, { useState, useCallback, useMemo } from "react";
import { Stack, Grid, LinearProgress, Box, Alert } from "@mui/material";
import Header from "./Header";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import { useVideos } from "../hooks/useVideos";
import { useDebounce } from "../hooks/useDebounce";
import { config } from "../config";

const LandingPage = React.memo(() => {
  // State for filters
  const [genres, setGenres] = useState([]);
  const [ageGroup, setAgeGroup] = useState("");
  const [sortBy, setSortBy] = useState("releaseDate");
  const [search, setSearch] = useState("");

  // Custom hooks
  const { videos, isLoading, error, fetchVideos, clearError } = useVideos();
  const debouncedSearch = useDebounce(search, config.ui.debounceDelay);

  // Memoized filter object
  const filters = useMemo(() => ({
    search: debouncedSearch,
    genres,
    ageGroup,
    sortBy,
  }), [debouncedSearch, genres, ageGroup, sortBy]);

  // Fetch videos when filters change
  React.useEffect(() => {
    fetchVideos(filters);
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleSearchChange = useCallback((newSearch) => {
    setSearch(newSearch);
  }, []);

  const handleGenresChange = useCallback((newGenres) => {
    setGenres(newGenres);
  }, []);

  const handleAgeGroupChange = useCallback((newAgeGroup) => {
    setAgeGroup(newAgeGroup);
  }, []);

  const handleSortByChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
  }, []);

  // Memoized video cards
  const videoCards = useMemo(() => {
    return videos.map((video) => (
      <Grid
        key={video._id}
        item
        display="flex"
        justifyContent="center"
        p={2}
        xs={11}
        sm={6}
        md={4}
        lg={3}
      >
        <VideoCard video={video} />
      </Grid>
    ));
  }, [videos]);

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

      <Stack direction="column" justifyContent="flex-start">
        <Header 
          search={search} 
          onSearchChange={handleSearchChange}
        />
        
        <Filter
          genres={genres}
          onGenresChange={handleGenresChange}
          ageGroup={ageGroup}
          onAgeGroupChange={handleAgeGroupChange}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
        />
        
        {/* Videos grid */}
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
          {videoCards.length > 0 ? (
            videoCards
          ) : (
            !isLoading && (
              <Grid item xs={12}>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center" 
                  minHeight="40vh"
                >
                  <Alert severity="info">
                    No videos found matching your criteria.
                  </Alert>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Stack>
    </>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
