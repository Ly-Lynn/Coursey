import React from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";

export default function VideoCard ({ 
    videoID='101',
    video_title="Advanced Python Programming",
    src="https://www.youtube.com/embed/t2Xs6KF6LoI",
}) {
    return (
        <Card 
            sx={{
                width:'100%', 
                marginLeft:'3rem', 
                height:'100%',
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
                '&:hover': {
                    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
                }
            }}
        >
            <CardActionArea>
                <iframe 
                    width="100%" 
                    height="470px" 
                    src={src} 
                    title={video_title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            </CardActionArea>
            <CardContent 
                sx={{
                    justifyContent:'center', 
                    textAlign:'left', 
                    fontSize:'1.5rem', 
                    fontWeight:"bold", 
                    backgroundColor:'#000', 
                    color:'#fff'
                }}
            >
                {video_title}
            </CardContent>
        </Card>
    );
}