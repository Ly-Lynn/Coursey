import React from "react";
import { useState } from "react";
import '.././style/courseCard.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { colors } from "../../assests/colors";

// temporary
import courseImage from "../../assests/images/course_img1.png";
import cornell_logo from "../../assests/images/cornell.jpg";

const CourseCard = ({
    courseID,
    courseName = "Fundamentals AI for Beginner",
    courseDescription = "Course Description",
    courseRating = 3.5,   
    courseLecturer = "John Doe",
    courseOrganizer = "Cornell University",
    size = "small" // New prop for size: "small", "medium", or "large"
}) => {
  
  const renderStars = (courseRate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= courseRate) {
            stars.push(<StarIcon key={i} sx={{ color: '#fbc02d' }} />); 
        } else if (i - 0.5 <= courseRate) {
            stars.push(<StarHalfIcon key={i} sx={{ color: '#fbc02d' }} />);
        } else {
            stars.push(<StarBorderIcon key={i} sx={{ color: '#fbc02d' }} />); 
        }
    }
    return stars;
  }

  const onCourseClick = () => {
    console.log("Course ID: ", courseID);
  }

  // Define sizes
  const sizes = {
    small: { height: "260px", imageHeight: "100px", titleVariant: "body1", descriptionLines: 1 },
    medium: { height: "300px", imageHeight: "150px", titleVariant: "h6", descriptionLines: 2 },
    large: { height: "400px", imageHeight: "200px", titleVariant: "h6", descriptionLines: 3 }
  };

  const currentSize = sizes[size] || sizes.large;

  return (
    <Card 
        key={courseID} 
        sx={{
            height: currentSize.height,
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
        }} 
        onClick={onCourseClick}
    >
        <CardMedia
            component="img"
            height={currentSize.imageHeight}
            image={courseImage}
            alt={courseName}
        />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant={currentSize.titleVariant} sx={{ fontWeight: 'bold', mb: 1 }}>
                    {courseName}
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 1 }}>
                    {courseLecturer}
                </Typography>

                <Typography variant="body2" 
                            sx={{
                              color: 'text.secondary',
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: currentSize.descriptionLines,
                              WebkitBoxOrient: 'vertical',
                            }}
                >
                    {courseDescription}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar className="logo" alt="cornell" src={cornell_logo} sx={{ width: 24, height: 24, mr: 1 }}
                            style={{width: "45px", height: "45px"}}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {courseOrganizer}
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderStars(courseRating)} 
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