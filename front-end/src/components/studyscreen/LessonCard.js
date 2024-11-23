import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const CardFinished = styled(Card)(({ theme }) => ({
    height: "5rem",
    // width: "200px",
    backgroundColor: "#000",
    display: "flex",
    color:'white',
    flexDirection: "row",
    paddingLeft: '1rem',
    alignItems: "center",
    border:"1px solid black",
    borderRadius:0,
    margin: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    '&:hover': {
        backgroundColor: "#fff",
        color: 'black'
    },
}));

const CardNotFinished = styled(Card)(({ theme }) => ({
    height: "5rem",
    // width: "200px",
    display: "flex",
    flexDirection: "row",
    paddingLeft: '1rem',
    alignItems: "center",
    border:"1px solid black",
    borderRadius:0,
    margin: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    '&:hover': {
        backgroundColor: "#000",
        color: 'white'
    },
}));

export default function LessonCard ({ 
    video_id = 101,
    video_title = "Introduction to Django",
    video_duration = "10:00",
    finished = true 
}) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div style={{width:'500px'}}>
            {finished ? (
                <CardFinished 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <PlayCircleOutlineIcon sx={{ fontSize: 40, color: isHovered ? "#000" : "#fff" }} />
                    <CardContent>
                        <h6 style={{margin:0, marginBottom:'0.5rem'}}>{video_title}</h6>
                        <p style={{margin:0}}><AccessTimeFilledIcon sx={{ fontSize: 15 }} /> {video_duration}</p>
                    </CardContent>
                </CardFinished>
            ) : (
                <CardNotFinished 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <PlayCircleOutlineIcon sx={{ fontSize: 40, color: isHovered ? "#fff" : "#000" }} />
                    <CardContent>
                        <h6 style={{margin:0, marginBottom:'0.5rem'}}>{video_title}</h6>
                        <p style={{margin:0}}><AccessTimeFilledIcon sx={{ fontSize: 15 }} /> {video_duration}</p>
                    </CardContent>
                </CardNotFinished>
            )}
        </div>
    );
}