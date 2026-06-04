import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent, Tooltip } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const CARD_WIDTH = 300; 
const CARD_HEIGHT = 80; 

const CardFinished = styled(Card)(({ theme }) => ({
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    backgroundColor: "green",
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
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
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
    complete = true,
    onClick,
}) {
    const [isHovered, setIsHovered] = useState(false);

    const truncateTitle = (title) => {
  if (!title) return "Untitled"; // fallback
  return title.length > 30 ? title.substring(0, 30) + "..." : title;
};


    const CardComponent = complete ? CardFinished : CardNotFinished;

    return (
        <div onClick={onClick} style={{width: `${CARD_WIDTH}px`}}>
            <CardComponent 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <PlayCircleOutlineIcon sx={{ 
                    fontSize: 40, 
                    color: isHovered 
                        ? (complete ? "#000" : "#fff") 
                        : (complete ? "#fff" : "#000") 
                }} />
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 !important',
                    marginLeft: '1rem',
                }}>
                    <Tooltip title={video_title} placement="top">
                        <h6 style={{
                            margin: 0, 
                            marginBottom: '0.1rem', 
                            width: `${CARD_WIDTH - 120}px`, // Adjust based on icon and padding
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap'
                        }}>
                            {truncateTitle(video_title)}
                        </h6>
                    </Tooltip>
                    <p style={{
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <AccessTimeFilledIcon sx={{ fontSize: 15 }} /> 
                        {video_duration} m
                    </p>
                </CardContent>
            </CardComponent>
        </div>
    );
}