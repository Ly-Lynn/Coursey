import React from "react";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";

export default function VideoCard ({ 
    videoID='101',
    video_title="Advanced Python Programming",
    src="https://www.youtube.com/embed/t2Xs6KF6LoI",
}) {
    return (
        <Card sx={{width:'100%', marginLeft:'3rem', height:'100%'}}>
            <CardActionArea>
                <iframe 
                    width="100%" 
                    height="500px" 
                    src={src} 
                    title={video_title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            </CardActionArea>
            <CardContent sx={{justifyContent:'center', textAlign:'left', fontSize:'1.5rem', fontWeight:"bold"}}>
                {video_title}
            </CardContent>
        </Card>
    );
}