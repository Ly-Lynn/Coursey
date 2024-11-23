import React, { useState } from 'react';
import { Grid, Paper, Box, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LessonCard from "../../components/studyscreen/LessonCard"
import VideoCard from "../../components/studyscreen/VideoCard";

export default function StudyScreen() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const videos_list = [
        {
            video_id: 101,
            video_title: "Introduction to Django",
            video_duration: "10:00",
            finished: true
        },
        {
            video_id: 102,
            video_title: "Django Models",
            video_duration: "20:00",
            finished: false
        },
        {
            video_id: 103,
            video_title: "Django Views",
            video_duration: "30:00",
            finished: false
        },
        {
            video_id: 104,
            video_title: "Django Templates",
            video_duration: "40:00",
            finished: false
        },
        {
            video_id: 105,
            video_title: "Django Forms",
            video_duration: "50:00",
            finished: false
        },
        {
            video_id: 106,
            video_title: "Django Admin",
            video_duration: "60:00",
            finished: false
        },
    ];

    const current_vid_info = {
        video_id: 101,
        video_title: "Introduction to Django",
        src: "https://www.youtube.com/embed/t2Xs6KF6LoI"
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Box sx={{ p: 3, display: 'flex', position: 'relative' }}>
            <IconButton 
                onClick={toggleMenu} 
                sx={{ 
                    color:'black',
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    zIndex: 1000 
                }}
            >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Grid 
                sx={{ 
                    width: isMenuOpen ? '30rem' : '0', 
                    height: '80vh', 
                    overflowY: 'auto', 
                    transition: 'width 0.3s ease',
                    visibility: isMenuOpen ? 'visible' : 'hidden'
                }} 
                container 
                direction="row"
            >
                {videos_list.map((video, index) => (
                    <LessonCard 
                        key={index}
                        video_id={video.video_id}
                        video_title={video.video_title}
                        video_duration={video.video_duration}
                        finished={video.finished}
                    />
                ))}
            </Grid>
            
            <VideoCard 
                sx={{
                    width: isMenuOpen ? 'calc(100% - 30rem)' : '100%',
                    transition: 'width 0.3s ease'
                }}
                videoID={current_vid_info.video_id}
                video_title={current_vid_info.video_title}
                src={current_vid_info.src}
            />
        </Box>
    );
}