import React from "react";
import { useState } from "react";

import { Card, CardContent } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function LessonCard ({ video_id = 101,
                            video_title = "Introduction to Django",
                            video_duration = "10:00",
                            finished=false,
 }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Card 
            sx={{ 
                display: "flex", 
                flexDirection: "row", 
                padding: "1rem", 
                alignItems: "center", 
                border:"1px solid black",
                borderRadius:0,
                margin: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                '&:hover': {
                    backgroundColor: "#f5f5f5",
                },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <PlayCircleOutlineIcon sx={{ fontSize: 40, color: isHovered ? "#4caf50" : "#000" }} />
            <CardContent>
                <h4>{video_title}</h4>
                <p><AccessTimeFilledIcon sx={{ fontSize: 15 }} /> {video_duration}</p>
            </CardContent>
        </Card>
    );
}
