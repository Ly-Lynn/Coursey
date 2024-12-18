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
import toast from "react-hot-toast";
import { updateCompletedStudyFailure, updateCompletedStudySuccess, updateCurrentStudyFailure, updateCurrentStudySuccess } from "../../redux/slices/userSlice";
export default function MyLearning({ isCompleted=false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user || {});
    const server = useSelector((state) => state.server || {});
    const auth = useSelector((state) => state.auth || {});
    useEffect(() => {
        const fetchCurrent = async () => {
            try {
                const response = await fetch(`${hostName}${API_ENDPOINTS.GET_CURRENT_COURSES}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${auth.accessToken}`
                    },
                    body: JSON.stringify({
                        userID: auth.user.id,
                        username: auth.user.username
                    })
                });
                const result = await response.json();
                if (result.status !== 200) {
                    toast.error('Error', {
                        style: {
                            backgroundColor: "black",
                            color: "#fff"
                        }
                    });
                    dispatch(updateCurrentStudyFailure(result.message));
                }
                dispatch(updateCurrentStudySuccess(result.message));    
            } catch (error) {
                console.log('Error:', error);
                toast.error('Error', {
                    style: {
                        backgroundColor: "black",
                        color: "#fff"
                    }
                });
                dispatch(updateCurrentStudyFailure(error));
            }
        }
        const fetchCompleted = async () => {
            try {
                const response = await fetch(`${hostName}${API_ENDPOINTS.GET_FINISHED_COURSES}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${auth.accessToken}`
                    },
                    body: JSON.stringify({
                        id: auth.user.id,
                        username: auth.user.username
                    })
                });
                const result = await response.json();
                if (result.status !== 200) {
                    toast.error('Error', {
                        style: {
                            backgroundColor: "black",
                            color: "#fff"
                        }
                    });
                    dispatch(updateCompletedStudyFailure(result.message));
                }
                console.log('Completed Courses:', result);
                dispatch(updateCompletedStudySuccess(result.message));
            }
            catch (error) {
                console.log('Error:', error);
                toast.error('Error', {
                    style: {
                        backgroundColor: "black",
                        color: "#fff"
                    }
                });
                dispatch(updateCompletedStudyFailure(error));
            }
        }
        fetchCurrent();
        fetchCompleted();
    }, []);
    const completedCoursesID = Array.isArray(user.completedStudy) ? user.completedStudy : []; 
    const currentCoursesID = Array.isArray(user.currentStudy) ? user.currentStudy : [];
    const allCourses = server.courses;
    const completedCoursesMap = new Map(
        completedCoursesID.map(item => [item.course_id, item.progress])
      );
      
    const currentCoursesMap = new Map(
        currentCoursesID.map(item => [item.course_id, item.progress])
      ) ;
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