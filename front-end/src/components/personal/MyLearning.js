import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, 
        Box,
        Paper,
        ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hostName, API_ENDPOINTS } from "../../config/env";

import CompletedCard from "./CompletedCard";
import InProgressCard from "./InProgressCard";

export default function MyLearning({ isCompleted=false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user || {});
    const server = useSelector((state) => state.server || {});
    const completedCoursesID = user.completedStudy; //an object with course_id and progress
    const currentCoursesID = user.currentStudy;
    const allCourses = server.courses;
    const completedCoursesMap = new Map(
        completedCoursesID.map(item => [item.course_id, item.progress])
      );
      
    const currentCoursesMap = new Map(
        currentCoursesID.map(item => [item.course_id, item.progress])
      );
    const completedCourses = allCourses
        .filter(course => completedCoursesMap.has(course.course_id))
        .map(course => ({
            ...course,
            progress: completedCoursesMap.get(course.course_id),
    }));

    const currentCourses = allCourses
        .filter(course => currentCoursesMap.has(course.course_id))
        .map(course => ({
            ...course,
            progress: currentCoursesMap.get(course.course_id),
    }));
    console.log("Completed Courses: ", completedCourses);
    console.log("Current Courses: ", currentCourses);
    
    return (
        <div style={{
            padding: "20px",
            maxWidth: "100%",
            height: "100%"
        }}>
            <Paper elevation={3} sx={{
                maxHeight: "40vh", 
                border:0,
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0)",
                overflow: "auto", 
            }}>
                <Box sx={{
                    display: "flex", 
                    flexDirection: "column",
                    padding: {
                        xs: "0 1rem", 
                        md: "0 5rem", 
                        lg: "0 10rem" 
                    },
                    gap: 1
                }}>
                    {isCompleted ? completedCourses.map((course) => {
                        return <CompletedCard key={course.course_id}
                                            courseID={course.course_id}
                                            course_name={course.course_name}
                                            host_name={course.host_name}
                                            progress={course.progress}
                                            course_image={course.image}/>
                    }) : currentCourses.map((course) => {
                        return <InProgressCard key={course.course_id}
                                            courseID={course.course_id}
                                            course_name={course.course_name}
                                            host_name={course.host_name}
                                            progress={course.progress}
                                            course_image={course.image}/>
                    })}
                </Box>
            </Paper>
        </div>
    );
}