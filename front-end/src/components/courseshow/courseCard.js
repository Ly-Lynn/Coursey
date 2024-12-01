import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tooltip } from "@mui/material";
// import courseImage from "../../assests/images/course_img1.png";
import cornell_logo from "../../assests/images/cornell.jpg";

import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating"; 

const CourseCard = ({
    courseID,
    courseImage,
    hostLogo = cornell_logo,
    courseName = "Fundamentals AI for Beginner",
    courseDescription = "Course Description",
    courseRating = 3.5,   
    courseLecturer = "John Doe",
    courseOrganizer = "Cornell University",
    size = "medium", // Kích thước: "small", "medium", "large"
    titleLines = 2,
    descriptionLines = 2
}) => {
    const navigate = useNavigate();
  
  const onCourseClick = () => {
    console.log("Course ID: ", courseID);
    navigate(`/courseinfo?courseID=${courseID}`);
  }

  const sizes = {
    small: { 
      cardHeight: "260px", 
      imageHeight: "120px", 
      titleVariant: "body1", 
      descriptionVariant: "caption" 
    },
    medium: { 
      cardHeight: "320px", 
      imageHeight: "160px", 
      titleVariant: "body1", 
      descriptionVariant: "body2" 
    },
    large: { 
      cardHeight: "400px", 
      imageHeight: "200px", 
      titleVariant: "h5", 
      descriptionVariant: "body2" 
    }
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <Card 
        key={courseID} 
        sx={{
            height: currentSize.cardHeight,
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'
            }
        }} 
        onClick={onCourseClick}
    >
        <CardMedia
            component="img"
            height={currentSize.imageHeight}
            image={courseImage}
            alt={courseName}
            sx={{ 
                objectFit: 'cover', 
                width: '100%' ,
                mb:0
            }}
        />

        <CardContent 
            sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                p: 2, // Padding cố định
                height: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography 
                    variant={currentSize.titleVariant} 
                    sx={{ 
                        fontWeight: 'bold', 
                        mt:0,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: titleLines,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: `${1.5 * titleLines}em`, 
                    }}
                >
                    {courseName}
                </Typography>

                <Typography 
                    variant="body2" 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: 'text.secondary',
                        mt:0, 
                        mb: 0,
                        height: '1.5em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {courseLecturer}
                </Typography>
                <Tooltip title={courseDescription}>
                    <Typography 
                        variant={currentSize.descriptionVariant}
                        sx={{
                            color: 'text.secondary',
                            mb: 1,
                            mt: 0,
                            display: '-webkit-box',
                            whiteSpace: 'nowrap',
                            WebkitLineClamp: descriptionLines,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                            wordBreak: 'break-word', 
                            maxHeight: `${1 * descriptionLines}em`, 
                        }}
                    >
                        {courseDescription}
                    </Typography>
                </Tooltip>
            </Box>

            {/* Footer card */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    // mt: 2
                }}
            >
                {/* Logo và tên tổ chức */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                        alt="cornell" 
                        src={hostLogo} 
                        sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 0.5 
                        }}
                    />
                    <Tooltip title={courseOrganizer}>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'text.secondary',
                                maxWidth: '6rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'wrap',
                            }}
                        >
                            {courseOrganizer}
                        </Typography>
                    </Tooltip>
                </Box>
                
                {/* Đánh giá sao */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarRating rating={courseRating} /> 
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {courseRating} 
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
  );
}

export default CourseCard;
