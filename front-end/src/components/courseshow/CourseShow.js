import React, { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Pagination } from "@mui/material";
import axios from "axios";
import { updateCoursesSuccess, updateCoursesFailure } from "../../redux/actions/serverActions";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './courseshow.modal.css';

const CourseShow = ( {title="Popular Courses"} ) => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Moved here


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
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }
    console.log("Courses: ", courses);
    const totalCourses = courses.length;
    console.log("Total courses: ", totalCourses);
    
    const totalPage = Math.ceil(totalCourses / 4); // Using Math.ceil to ensure we round up

    return (
        <div className="container">
            <div className="ribbon">
                <h1 className="mt-3">{title}</h1>
            </div>
            <div className="row p-3">
                {courses && courses.slice((page - 1) * 4, page * 4).map((course) => (
                    <div className="col-md-3" key={course.course_id}>
                        <CourseCard
                            courseID={course.course_id}
                            courseName={course.course_name}
                            courseDescription={course.course_intro}
                            courseRating={course.rate}
                            courseLecturer={course.lecturer_id} // Temporary ID
                            courseOrganizer={course.host_id} // Temporary ID
                        />
                    </div>
                ))}
            </div>
            <Pagination
                className="mt-3"
                count={totalPage}
                page={page}
                onChange={(event, value) => setPage(value)}
            />
        </div>
    );
};

export default CourseShow;
