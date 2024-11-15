import { React, useState,lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header/header_";
import SlideShow from "../../components/slideshow/SlideShow";
import axios from "axios";
import { updateCoursesSuccess, updateCoursesFailure, updateAdsSuccess, updateAdsFailure } from "../../redux/actions/serverActions";
import "./coursescreen.modul.css"
const CourseShow = lazy(() => import("../../components/courseshow/CourseShow"));

const CourseScreen = (

) => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses);
    const ads = useSelector((state) => state.ads);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await axios.get("/dummy_data/courses.json");
                dispatch(updateCoursesSuccess(courses.data));
                setLoading(false);
            } catch (error) {
                dispatch(updateCoursesFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        };
        const fetchAds = async () => {
            try {
                const response = await axios.get("/dummy_data/ads.json");
                console.log("Ads: ", response.data);
                dispatch(updateAdsSuccess(response.data));
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
            <div className="d-flex justify-content-center">
                <div className="loader"></div>
            </div>
        )
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }
    console.log("Courses: ", courses);

    return (
        <div className="courses">
            <Header />
            <SlideShow ads={ads}/>
            <Suspense fallback={<div className="d-flex justify-content-center"><div className="loader"></div></div>}>
                {
                    courses && <CourseShow courses={courses} />
                }
            </Suspense>

            <Suspense fallback={<div className="d-flex justify-content-center"><div className="loader"></div></div>}>
                {
                    courses && <CourseShow courses={courses} />
                }
            </Suspense>

            <Suspense fallback={<div className="d-flex justify-content-center"><div className="loader"></div></div>}>
                {
                    courses && <CourseShow courses={courses} />
                }
            </Suspense>
        </div>
    );
}

export default CourseScreen;
