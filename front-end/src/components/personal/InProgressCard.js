import React from "react";
import { Card, CardHeader, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Divider, Button, ButtonGroup, LinearProgress, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router-dom";
import CustomButton from "../custom_components/CustomButton";

const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
    },
  });

  function LinearProgressWithLabel(props) {
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress style={{ borderRadius: "5px", height: "8px"}} color="primary" variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body1" sx={{ color: '#000', fontWeight:"bold" }}>
                {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    </ThemeProvider>
  );
}
LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function InProgressCard({ courseID=101, 
                                        course_name="Django Web Framework", 
                                        progress = 50,
                                        host_name='Meta',
                                        course_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8ocX1uyxWlO0NGGjiwM4w00ooWe9e3DMoA&s" }) {
    
    const navigate = useNavigate();
    const onStudyClick = () => {
        navigate(`/learn?courseID=${courseID}`);
    }

    return (
        <div style={{marginBottom:'1.5rem'}}>
            <Card sx={{ display: "flex", borderRadius:0, flexDirection: "row", padding: "1rem", alignItems: "center", border:"1px solid black" }}>
                <CardMedia
                    component="img"
                    style={{ width:"15%" }}
                    image={course_image}
                    alt="random"
                />
                <Box sx={{ display:'flex',  flex: 1 }}>
                    <Box  sx={{ width: "80%"}}>
                    <Typography sx={{marginLeft:'1rem', marginBottom:'0.5rem'}} variant="body2">Course | {host_name}</Typography>

                    <Typography sx={{marginLeft:'1rem',fontWeight:'bold'}} variant="h5">{course_name}</Typography>
                    <CardContent>
                        <LinearProgressWithLabel value={progress} />
                        <Typography variant="body2" color="text.secondary">Overall Progress</Typography>
                    </CardContent>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box sx={{ display:"flex", width:'12rem', justifyContent:'center', alignItems:'center'}}>
                        <CustomButton onClick={onStudyClick} style={{ height: "3rem", borderRadius:0}} endIcon={<KeyboardDoubleArrowRightIcon/>} color='#000' variant="contained">Study</CustomButton>
                    </Box>
                </Box>
            </Card>
        </div>
    );
}