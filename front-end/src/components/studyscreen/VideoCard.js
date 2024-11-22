import React from "react";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";

export default function VideoCard ({ 
    videoID='101',
    video_title="Introduction to Django",
    src="https://www.youtube.com/embed/t2Xs6KF6LoI",
}) {
    return (
        <Card sx={{ width: 345 }}>
            <CardActionArea>
                <iframe 
                    width="100%" 
                    height="194" 
                    src={src} 
                    title={video_title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            </CardActionArea>
            <CardContent>
                {video_title}
            </CardContent>
        </Card>
    );
}