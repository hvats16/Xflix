// import logo from './logo192.png';
import React, { Suspense } from 'react';
import './App.css';
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';

// Components
import LandingPage from './Components/LandingPage';
import VideoPage from './Components/VideoPage';
import theme from './theme.js';
import { config } from './config';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          minHeight="100vh"
          p={3}
        >
          <Alert severity="error" sx={{ maxWidth: 600 }}>
            <strong>Something went wrong!</strong>
            <br />
            {this.state.error?.message || 'An unexpected error occurred'}
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingFallback = () => (
  <Box 
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="100vh"
  >
    <CircularProgress color="primary" size={60} />
  </Box>
);

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider 
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            autoHideDuration={6000}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route 
                  path="/" 
                  element={<LandingPage />} 
                />
                <Route 
                  path="/video/:videoId" 
                  element={<VideoPage />} 
                />
                {/* Catch-all route for 404 pages */}
                <Route 
                  path="*" 
                  element={
                    <Box 
                      display="flex" 
                      flexDirection="column" 
                      alignItems="center" 
                      justifyContent="center" 
                      minHeight="100vh"
                      p={3}
                    >
                      <Alert severity="info" sx={{ maxWidth: 600 }}>
                        <strong>Page not found</strong>
                        <br />
                        The page you're looking for doesn't exist.
                      </Alert>
                    </Box>
                  } 
                />
              </Routes>
            </Suspense>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
