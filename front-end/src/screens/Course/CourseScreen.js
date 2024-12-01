import { hostName, API_ENDPOINTS } from "../../config/env";
import { React, useState, lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header/header_";
import SlideShow from "../../components/slideshow/SlideShow";
import axios from "axios";
import { updateCoursesSuccess, updateCoursesFailure, updateAdsSuccess, updateAdsFailure } from "../../redux/slices/serverSlice";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import "./coursescreen.modul.css";
import LoadingFallback from "../../components/fallback/LoadingFallBack";
const CourseShow = lazy(() => import("../../components/courseshow/CourseShow"));


const CourseScreen = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.server.courses);
    const ads = useSelector((state) => state.server.ads);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await axios.get(`${hostName}${API_ENDPOINTS.GET_BEST_RATING}`);
                dispatch(updateCoursesSuccess(courses.data.message));
                setLoading(false);
            } catch (error) {
                dispatch(updateCoursesFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        };
        // const fetchCourses = async () => {
        //     try {
        //         const response = await fetch(`${hostName}${API_ENDPOINTS.GET_BEST_RATING}`, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             }
        //         });

        //         if (!response.ok) {
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }

        //         const data = await response.json();
        //         const courses = data.message;
        //         const courseTable = document.getElementById('course-table');
        //         console.log("COURSES", courses);
            
            // const courses = await response.json();
            // dispatch(updateCoursesSuccess(courses));
            // console.log("Courses: ", courses);
        //     setLoading(false);
        //     } catch (error) {
        //     dispatch(updateCoursesFailure(error.message));
        //     setError(error.message);
        //     setLoading(false);
        //     }
        // };
        const fetchAds = async () => {
            try {
                const ads = await axios.get("/dummy_data/ads.json");
                console.log("Ads: ", ads.data);
                dispatch(updateAdsSuccess(ads.data));
                console.log("Ads: after");
                setLoading(false);
            } catch (error) {
                dispatch(updateAdsFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        }
        fetchAds();
        fetchCourses();
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }
    
    return (
        <div className="courses">
            <Header />
            <SlideShow ads={ads} />
            
            <Container maxWidth="xl" sx={{ paddingBottom: 4 }}>
                <Grid container direction="column" spacing={4}>
                    <Grid item>
                        <Box sx={{ 
                            width: '100%',
                            display: 'flex', 
                            justifyContent: 'center'
                        }}>
                            <Box sx={{ width: '100%', maxWidth: 'lg' }}>
                                <Suspense fallback={<LoadingFallback />}>
                                    {courses && <CourseShow courses={courses} />}
                                </Suspense>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box sx={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'center'
                        }}>
                            <Box sx={{ width: '100%', maxWidth: 'lg' }}>
                                <Suspense fallback={<LoadingFallback />}>
                                    {courses && <CourseShow courses={courses} />}
                                </Suspense>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box sx={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'center'
                        }}>
                            <Box sx={{ width: '100%', maxWidth: 'lg' }}>
                                <Suspense fallback={<LoadingFallback />}>
                                    {courses && <CourseShow courses={courses} />}
                                </Suspense>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default CourseScreen;