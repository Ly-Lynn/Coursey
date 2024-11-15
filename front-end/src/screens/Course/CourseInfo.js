import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./CourseScreen.modul.css"
import InfoBanner from "../../components/course_info/banner";
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header/header/header_';
import { styled } from "@mui/material/styles";
import StarRating from '../../components/courseshow/StarRating';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { 
  Grid,
  Typography, 
  Button, 
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText } from "@mui/material";
const InfoTypography = styled(Typography)({
  color: "white",
  marginBottom: "1rem",
});
const InfoBox = styled(Box)({
  display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  flexDirection: 'column',
  border: "2px solid gray",
});

const CreateListGained = ({ list }) => (
  <Grid container spacing={2}>
    {Array(2)
      .fill()
      .map((_, col) => (
        <Grid item xs={6} key={col}>
          <List>
            {list
              .slice(col * Math.ceil(list.length / 2), (col + 1) * Math.ceil(list.length / 2))
              .map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
          </List>
        </Grid>
      ))}
  </Grid>
);
const CreateListRequired = ({ list }) => (
  <Grid container spacing={2}>
    <List>
      {list.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <PriorityHighIcon sx={{color:"red"}} />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  </Grid>
);


const CourseInfoPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  console.log(isAuthenticated)
  const location = useLocation();
  const [courseData, setCourseData] = useState(null);
    console.log(location.search)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseID = searchParams.get('courseID');
    // console.log(courseID)
    const fetchCourseDetails = async (id) => {
      const response = await axios.get(`/dummy_data/courses.json`);
      console.log(response.data, id)
      setCourseData(response.data.find((course) => course.course_id === parseInt(id)));
    };
    fetchCourseDetails(courseID);
  }, [location.search]);


  if (!courseData) {
    return (
      <div className="d-flex justify-content-center">
          <div className="loader"></div>
      </div>
  )
  }
  console.log(courseData)
  return (
    <div>
      { !isAuthenticated && <Header /> }
      <div className='info-intro'>
        <div className='info-intro-container'>
          <div className='info-intro-wrapper'>
            <InfoTypography variant="h4" component="div" sx={{fontWeight:"bold", margin:"1rem 0 1rem 0", height:"3rem"}}>
                {courseData.course_name}
            </InfoTypography>
            <InfoTypography 
              className='course-intro'
              variant="h6" 
              component="div" 
              sx={{
                height: "7rem",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {courseData.course_intro}
            </InfoTypography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography variant="body1" component="div" sx={{margin: "0 0.5rem 0 1rem", color:"#fbc02d", fontWeight:"bold"}}>
                    {courseData.rate} 
              </Typography>
              <StarRating rating={courseData.rate} />
              <Typography variant="body1" component="div" sx={{color:"white"}}>
                     ({courseData.rating_count} ratings)
              </Typography>
            </Box>
          </div>
        </div>
      </div>
      <div className='info-content'>
        <div className='info-gained-container'>
          <InfoBox>
              <h4 style={{textAlign:"left", margin:"1rem 0 0rem 1.5rem"}}>You will gain</h4>
              <div className='gained-info'>
                <CreateListGained list={courseData.more_info.gained} />
              </div>
          </InfoBox>
        </div>
        <div className='info-required-container'>
          <Box className="info-gained-container">
              <h4 style={{textAlign:"left", margin:"1rem 0 1rem 1.5rem"}}>Requirement</h4>
              <div className='gained-info'>
                <CreateListRequired list={courseData.more_info.required} />
              </div>
          </Box>
        </div>
      </div>
      <div className='banner-container'>
        { courseData && <InfoBanner title={courseData.course_name} image={courseData.image} cost={courseData.cost} hours={courseData.hours} /> }

      </div>
    </div>
  );
};

export default CourseInfoPage;