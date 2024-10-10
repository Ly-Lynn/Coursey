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
    courseName= "Fundamentals AI for Beginner",
    courseDescription= "Course Description",
    // coursePrice,
    courseRating=3.5,   
    courseLecturer="John Doe",
    courseOrganizer="Cornell University",  
  // courseImage      
}) => {
  
  const renderStars = (courseRate) => {
    // Input: courseRate from database
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
    // Redirect to course detail page
    console.log("Course ID: ", courseID);
  }

  return (
    <Card 
        key={courseID} 
        sx={{
            height: "400px",
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
        }} 
        onClick={onCourseClick}
    >
        <CardMedia
            component="img"
            height="200"
            image={courseImage}
            alt={courseName}
        />

        <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {courseName}
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary', marginBottom: 1 }}>
                {courseLecturer}
            </Typography>

            <Typography variant="body2" 
                        sx={{
                          color: 'text.secondary',
                          marginBottom: 1,
                          overflow: 'hidden',         // Ẩn phần nội dung tràn
                          textOverflow: 'ellipsis',   // Thêm dấu ba chấm
                          whiteSpace: 'nowrap',       // Giữ cho văn bản trên một dòng
                          display: 'block',           // Đảm bảo thuộc tính overflow hoạt động
                          maxWidth: '100%',           // Đảm bảo không vượt quá chiều rộng
                      }}
                        
            >
                {courseDescription}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar className="logo" alt="cornell" src={cornell_logo} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {courseOrganizer}
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderStars(courseRating)} 
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                        {courseRating} 
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);
}

export default CourseCard;