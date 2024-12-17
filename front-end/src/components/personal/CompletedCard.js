import React from "react";
import { Card, CardHeader, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Divider, Button, ButtonGroup, LinearProgress, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

export default function CompletedCard({ courseID=101, 
                                        course_name="Django Web Framework", 
                                        progress = 50,
                                        host_name='Meta',
                                        course_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8ocX1uyxWlO0NGGjiwM4w00ooWe9e3DMoA&s" }) {
    
    const navigate = useNavigate();
    const handleRevision = () => {
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
                    <Box  sx={{ width: "75%"}}>
                    <Typography sx={{marginLeft:'1rem', marginBottom:'0.5rem'}} variant="body2">Course | {host_name}</Typography>

                    <Typography sx={{marginLeft:'1rem',fontWeight:'bold'}} variant="h5">{course_name}</Typography>
                    {/* <Link to={`/courses/${courseID}`}> */}
                    <CardContent style={{ display: 'flex'}}>
                        <CheckCircleIcon color="success" sx={{marginRight:'0.5rem'}}/>
                        <Typography style={{ display:"flex", alignItems:"center"}} variant="body2" color="text.secondary">Great Work! You have passed all requirements and can view your course certificate now.</Typography>
                    </CardContent>
                    </Box>
                    <Divider style={{marginRight:'1rem'}} orientation="vertical" variant="middle" flexItem />
                    <Box sx={{ display:"flex", width:'12rem', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <CustomButton style={{ height: "3rem", borderRadius:0}} color='#000' variant="contained">Your Certificate</CustomButton>
                        <CustomButton style={{ height: "3rem", borderRadius:0, fontWeight:'bold'}} color='#000' variant="text">Rate</CustomButton>
                        <CustomButton style={{ height: "3rem", borderRadius:0, fontWeight:'bold'}} color='#000' variant="text" onClick={handleRevision}>Revision</CustomButton>
                        
                    </Box>
                    {/* </Link> */}
                </Box>
            </Card>
        </div>
    );
}