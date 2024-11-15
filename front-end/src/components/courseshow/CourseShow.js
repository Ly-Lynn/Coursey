import React, { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Pagination } from "@mui/material";
import axios from "axios";
import { updateCoursesSuccess, updateCoursesFailure } from "../../redux/actions/serverActions";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './courseshow.modal.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1AA1AE',
      }
    }
  });
  

const CourseShow = ({ courses, title="Popular Courses" }) => {
    const [page, setPage] = useState(1); 
    console.log(courses)
    courses = courses.courses
    const totalCourses = courses.length;
    console.log("Total courses: ", totalCourses);
    
    const totalPage = Math.ceil(totalCourses / 4);

    return (
        <ThemeProvider className="container" theme={theme}>
            <div className="title">
                <h3 className="mt-2" style={{marginBottom:0}}>{title}</h3>
            </div>
            <div className="row p-3">
                {courses && courses.slice((page - 1) * 4, page * 4).map((course) => (
                    <div className="col-md-3" key={course.course_id}>
                        <CourseCard
                            courseID={course.course_id}
                            courseName={course.course_name}
                            courseDescription={course.course_intro}
                            courseRating={course.rate}
                            courseLecturer={course.lecturer_id} 
                            courseOrganizer={course.host_id} 
                        />  
                    </div>
                ))}
            </div>
            <Pagination
                className="d-flex justify-content-end .custom-pagination"
                count={totalPage}
                page={page}
                onChange={(event, value) => setPage(value)}
                variant="outlined"
                color="primary"
                style={{marginBottom: "5px"}}
            />
            
        </ThemeProvider>
    );
};

export default CourseShow;