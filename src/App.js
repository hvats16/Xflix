// import logo from './logo192.png';
import React from 'react';
import './App.css';
import LandingPage from './Components/LandingPage';
import { ThemeProvider } from "@mui/material";
import theme from './theme.js'
import VideoPage from './Components/VideoPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import endPoint from './config';
import axios from 'axios';
import { SnackbarProvider } from 'notistack'


function App() {
  let [videos, setVideos] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  const fetchVideos = async (url) => {
    try {
      setIsLoading(true);
      let response = await axios.get(url);
      let data = response.data.videos;
      setVideos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
      fetchVideos(endPoint)
  },[]);

  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
          <Routes>
            <Route exact path='/' element={<LandingPage videos={videos} setVideos={setVideos} isLoading={isLoading} setIsLoading={setIsLoading} fetchVideos={fetchVideos}/>}/>
            <Route exact path='/video/:videoId' element={<VideoPage videos={videos} isLoading={isLoading}/>}/>
          </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
