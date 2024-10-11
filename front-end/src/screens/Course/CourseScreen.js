import { React, useState,lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header/header_";
import SlideShow from "../../components/slideshow/SlideShow";
import axios from "axios";
import { updateCoursesSuccess, updateCoursesFailure } from "../../redux/actions/serverActions";
import "./CourseScreen.modul.css"
const CourseShow = lazy(() => import("../../components/courseshow/CourseShow"));

const CourseScreen = (

) => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/dummy_data/courses.json");
                dispatch(updateCoursesSuccess(response.data));
                setLoading(false);
            } catch (error) {
                dispatch(updateCoursesFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCourses();
    }, [dispatch]);

    if (loading) {
        return <h1>...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }
    console.log("Courses: ", courses);
    return (
        <div className="courses">
            <Header />
            <SlideShow />
            <Suspense fallback={<div className="pac-man"></div>}>
                <CourseShow courses={courses} />
            </Suspense>

            <Suspense fallback={<div className="pac-man"></div>}>
                <CourseShow courses={courses} />
            </Suspense>

            <Suspense fallback={<div className="pac-man"></div>}>
                <CourseShow courses={courses} />
            </Suspense>
        </div>
    );
}

export default CourseScreen;
