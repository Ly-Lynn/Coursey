import React, { useEffect, useState } from 'react';
import { Grid, Paper, Box, IconButton, Typography, Modal } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LessonCard from "../../components/studyscreen/LessonCard"
import VideoCard from "../../components/studyscreen/VideoCard";
import CustomButton from '../custom_components/CustomButton';
import toast from 'react-hot-toast';
import { hostName, API_ENDPOINTS } from '../../config/env';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusVid, addCompletedStudy } from '../../redux/slices/userSlice';
import shadows from '@mui/material/styles/shadows';
import { CustomModal } from '../custom_components/CustomModal';

export default function StudyScreen({ courseID }) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isCompleteCourseModalOpen, setIsCompleteCourseModalOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const videos = user.currentVids;
    console.log("Videos: ", videos);
    const auth = useSelector((state) => state.auth);
    const token = auth.accessToken;
    
    console.log("Videos: ", videos);

    const [currentVid, setCurrentVid] = useState(videos[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const allVideosCompleted = videos.every(video => video.complete === 1);
        if (allVideosCompleted) {
            setIsCompleteCourseModalOpen(true);
            dispatch(addCompletedStudy({ courseID: courseID }));
        }

    }, [videos]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNext = () => {
        const currentIndex = videos.findIndex(video => video.url === currentVid.url);
        if (currentIndex >= 0 && currentIndex < videos.length - 1) {
            setCurrentVid(videos[currentIndex + 1]);
        } else {
            console.log("No more videos.");
        }
    }

    const handleComplete = async () => {
        setLoading(true);
        dispatch(updateStatusVid({ url: currentVid.url }));
        const updatedCurrentVid = { ...currentVid, complete: 1 };
        setCurrentVid(updatedCurrentVid);
        try {
            const response = await fetch(`${hostName}${API_ENDPOINTS.UPDATE_STATUS_VID}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseID: courseID,
                    videoCode: currentVid.url,
                    userID: auth.user.id
                }),
            });
            if (response.status !== 200) {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
            const res = await response.json();
            console.log("Response: ", res);
            toast.success("Congrats! You've completed the video.");
            setLoading(false);
        }
        catch (error) {
            console.error("Error updating video status:", error);
            toast.error("Failed to update video status.");
            setLoading(false);
        }
        setLoading(false);
    }

    const handleCloseCompletionModal = () => {
        setIsCompleteCourseModalOpen(false);
    }

    return (
        <Box sx={{ p: 3, display: 'flex', position: 'relative' }}>
            <CustomModal 
                onOpen={isCompleteCourseModalOpen}
                onClose={handleCloseCompletionModal}
                title="Congratulations! 🎉"
                subtitle="You've successfully completed all videos in this course!"
            />

            <IconButton 
                onClick={toggleMenu} 
                sx={{ 
                    color:'white',
                    backgroundColor: 'black',
                    position: 'absolute', 
                    top: -10, 
                    left: 10, 
                    zIndex: 1000,
                    '&:hover': {
                        backgroundColor: 'black'
                    }
                }}
            >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Grid 
                sx={{ 
                    width: isMenuOpen ? '30rem' : '0', 
                    height: '75vh',
                    marginTop: '1rem', 
                    overflowY: 'auto', 
                    transition: 'width 0.3s ease',
                    visibility: isMenuOpen ? 'visible' : 'hidden'
                }} 
                container 
                direction="row"
            >
                {videos.map((video, index) => (
                    <LessonCard 
                        key={video.url}
                        video_id={video.url}
                        video_title={video.title}
                        video_duration={parseInt(video.duration * 60)}
                        complete={video.complete}
                        onClick={() => setCurrentVid(video)}
                    />
                ))}
            </Grid>
            <Box sx={{ margin:"1rem",  
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end', }}>
                <VideoCard 
                    sx={{
                        width: isMenuOpen ? 'calc(100% - 30rem)' : '70%',
                        transition: 'width 0.3s ease',
                    }}
                    videoID={currentVid.url}
                    video_title={currentVid.title}
                    src={`https://www.youtube.com/embed/${currentVid.url}`}
                />
                {currentVid.complete ?
                    <CustomButton onClick={handleNext} style={{ marginTop:'0.5rem'}} variant='contained'>Next video</CustomButton>
                    : 
                    <CustomButton onClick={handleComplete} style={{ marginTop:'0.5rem'}} variant='contained'>Complete!</CustomButton>
                }
            </Box>
        </Box>
    );
}