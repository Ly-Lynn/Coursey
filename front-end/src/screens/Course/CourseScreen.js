import { hostName, API_ENDPOINTS } from "../../config/env";
import { React, useState, lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header/header_";
import SlideShow from "../../components/slideshow/SlideShow";
import { updateCoursesSuccess, updateCoursesFailure, updateAdsSuccess, updateAdsFailure } from "../../redux/slices/serverSlice";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import "./coursescreen.modul.css";
import LoadingFallback from "../../components/fallback/LoadingFallBack";
import toast from "react-hot-toast";
const CourseShow = lazy(() => import("../../components/courseshow/CourseShow"));

const getBestCourses = (courses) => {
    const bestView = [...courses].sort((a, b) => b.views - a.views).slice(0, 5);
    const bestRating = [...courses].sort((a, b) => b.rate - a.rate).slice(0, 5);
    return [bestView, bestRating];
}



const CourseScreen = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.server.courses);
    // const ads = useSelector((state) => state.server.ads);
    const [bestView, setBestView] = useState([]);
    const [bestRating, setBestRating] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ads, setAds] = useState([]);
    
    useEffect(() => {
        if (courses.length > 0) {
            const [bestView, bestRating] = getBestCourses(courses);
            setBestView(bestView);
            setBestRating(bestRating);
            setAds(bestRating.slice(0, 3));
            setLoading(false);
        }
    }
    , [courses]);

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
                                    {courses && <CourseShow courses={bestView} />}
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
                                    {courses && <CourseShow courses={bestRating}
                                                            title="Best Rating Courses"/>}
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