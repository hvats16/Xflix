import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link} from "react-router-dom";
import {Stack,Divider} from "@mui/material";

function VideoCard({video}){
  const getTotalDays=(releaseDate)=>{
    let diff=new Date().getTime()-new Date(releaseDate).getTime();
    let totalDiff=diff/(1000*3600*24);
    let res = Math.floor(totalDiff);
    if(res>365){
        return `${Math.floor(res/365)} years ago`
    }else if(res>30){
        return `${Math.floor(res/30)} months ago`
    }else if(res===0){
        return "Today";
    }else{
        return releaseDate;
    }
}
    return (
      <Link to={`/video/${video._id}`}>
      <Card sx={{width:"100%",height:"100%",backgroundColor:"#181818" }}>
      <CardActionArea sx={{height:"100%"}}>
        <CardMedia
          height={150}
          component="img"
          image={video.previewImage}
          alt={video.title}
        />
        <CardContent sx={{ height:"100%", backgroundColor:"#202020",p:2}}>
          <Typography gutterBottom variant="h5" component="h2" color="#fff" sx={{fontSize:"14.5px",fontWeight:"600",whiteSpace:"nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
            {video.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">
            <Typography variant="body2" color="#999999">
              {video.genre}
            </Typography>
            <Divider sx={{ height: 16,borderColor:"#999999"}} orientation="vertical" />
            <Typography variant="body2" color="#999999">
              {getTotalDays(video.releaseDate)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    )
}
export default VideoCard;