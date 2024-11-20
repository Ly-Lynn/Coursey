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
                // const courses = await axios.get(`${hostName}${API_ENDPOINTS.GET_BEST_RATING}`, {
                const courses = await axios.get("/dummy_data/courses.json");
                dispatch(updateCoursesSuccess(courses.data));
                console.log("Courses: ", courses.data);
                setLoading(false);
            } catch (error) {
                dispatch(updateCoursesFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        };
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
            
            {/* MUI Container cho 3 Suspense components theo hàng dọc */}
            <Container maxWidth="xl" sx={{ paddingBottom: 4 }}>
                <Grid container direction="column" spacing={4}>
                    {/* Suspense 1 */}
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

                    {/* Suspense 2 */}
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

                    {/* Suspense 3 */}
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