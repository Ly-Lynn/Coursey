import React from "react";
import './style/courseCard.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { colors } from "../assests/colors";

// temporary
import courseImage from "../assests/images/course_img1.png";
import cornell_logo from "../assests/images/cornell.jpg";

const CourseCard = ({
  courseName= "Fundamentals AI for Beginner",
  courseDescription= "Course Description",
  // coursePrice,
  courseRating=3.5,   
  courseLecturer="John Doe",
  courseOrganizer="Cornell University",  
  // courseImage      
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

  return (
      <Card sx={{ maxWidth: 345 }}>
          <CardMedia
              component="img"
              height="194"
              image={courseImage}
              alt={courseName}
          />

          <CardContent>
              {/* Course Name */}
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {courseName}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight:'bold', color: 'text.secondary', marginBottom: 1 }}>
                  {courseLecturer}
              </Typography>

              {/* Course Description */}
              <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                  {courseDescription}
              </Typography>

              {/* Course Lectures */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <Avatar className="logo" alt="cornell" src={cornell_logo} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {courseOrganizer}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  {renderStars(courseRating)} 
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      {courseRating} 
                  </Typography>
                </Box>
              </Box>
              

              {/* Course Rating */}
              
          </CardContent>

          {/* Actions */}
          {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                  <ShareIcon />
              </IconButton>
          </CardActions> */}
      </Card>
  );
}

export default CourseCard;