import React, { useCallback, useMemo } from "react";
import { Stack, Button, Select, FormControl, MenuItem } from "@mui/material";
import "./Filter.css";

const Filter = React.memo(({ 
  genres = [], 
  onGenresChange, 
  ageGroup = "", 
  onAgeGroupChange, 
  sortBy = "releaseDate", 
  onSortByChange 
}) => {

  // Handle genre selection
  const handleGenreClick = useCallback((genreValue) => {
    if (genreValue === "All" && genres.length !== 0) {
      onGenresChange?.([]);
    } else if (genres.includes(genreValue)) {
      const newGenres = genres.filter(item => genreValue !== item);
      onGenresChange?.(newGenres);
    } else if (genreValue !== "All") {
      onGenresChange?.([...genres, genreValue]);
    }
  }, [genres, onGenresChange]);

  // Handle age group selection
  const handleAgeClick = useCallback((ageValue) => {
    if (ageValue === "Any" && ageGroup.length !== 0) {
      onAgeGroupChange?.("");
    } else if (ageValue !== "Any") {
      onAgeGroupChange?.(ageValue);
    }
  }, [ageGroup, onAgeGroupChange]);

  // Handle sort change
  const handleSortChange = useCallback((e) => {
    onSortByChange?.(e.target.value);
  }, [onSortByChange]);

  // Memoized data arrays
  const genreOptions = useMemo(() => [
    { value: "All", text: "All Genre" },
    { value: "Education", text: "Education" },
    { value: "Sports", text: "Sports" },
    { value: "Comedy", text: "Comedy" },
    { value: "Lifestyle", text: "Lifestyle" },
  ], []);

  const ageOptions = useMemo(() => [
    { value: "Any", text: "Any age group" },
    { value: "7+", text: "7+" },
    { value: "12+", text: "12+" },
    { value: "16+", text: "16+" },
    { value: "18+", text: "18+" }
  ], []);

  const sortOptions = useMemo(() => [
    { value: "releaseDate", text: "Release Date" },
    { value: "viewCount", text: "View Count" },
  ], []);

  // Memoized genre buttons
  const genreButtons = useMemo(() => {
    return genreOptions.map((item, index) => {
      const isSelected = item.value === "All" 
        ? genres.length === 0 
        : genres.includes(item.value);

      return (
        <Button
          variant={isSelected ? "contained" : "outlined"}
          onClick={() => handleGenreClick(item.value)}
          key={index}
          color="secondary"
          sx={{
            lineHeight: { xs: 1, md: 1.5 },
            textTransform: "none",
            flexShrink: 0,
            ml: 1.5,
            mr: 1.5,
            mb: 1.5,
            pl: 2,
            pr: 2,
            borderRadius: 8,
          }}
          aria-label={`Filter by ${item.text}`}
        >
          {item.text}
        </Button>
      );
    });
  }, [genreOptions, genres, handleGenreClick]);

  // Memoized age buttons
  const ageButtons = useMemo(() => {
    return ageOptions.map((item, index) => {
      const isSelected = ageGroup.length === 0 
        ? item.value === "Any" 
        : ageGroup === item.value;

      return (
        <Button
          variant={isSelected ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleAgeClick(item.value)}
          key={index}
          sx={{
            lineHeight: { xs: 1, md: 1.5 },
            textTransform: "none",
            flexShrink: 0,
            ml: 1.5,
            mr: 1.5,
            mb: 1.5,
            pl: 2,
            pr: 2,
            borderRadius: 8,
          }}
          aria-label={`Filter by ${item.text}`}
        >
          {item.text}
        </Button>
      );
    });
  }, [ageOptions, ageGroup, handleAgeClick]);

  return (
    <Stack className="filter-panel" p={2} spacing={2}>
      {/* Genre Filter Row */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" className="filter-list" sx={{ flexWrap: 'wrap' }}>
          {genreButtons}
        </Stack>
        
        {/* Sort Dropdown */}
        <FormControl size="small">
          <Select
            color="secondary"
            size="small"
            value={sortBy}
            onChange={handleSortChange}
            sx={{
              fontSize: 14,
              mb: 1.5,
              height: { xs: "2rem", md: "2.5rem" },
              border: "1px solid #444D56",
              pr: 1.5,
              flexShrink: 0
            }}
            aria-label="Sort videos by"
          >
            {sortOptions.map((item, index) => (
              <MenuItem 
                sx={{ fontSize: 14 }} 
                key={index} 
                value={item.value}
              >
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Age Group Filter Row */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" className="filter-list" sx={{ flexWrap: 'wrap' }}>
          {ageButtons}
        </Stack>
      </Stack>
    </Stack>
  );
});

Filter.displayName = 'Filter';

export default Filter;
