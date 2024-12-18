import React, { useState } from "react";
import CourseCard from "./courseCard";
import { Pagination } from "@mui/material";
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
  
const CourseShow = ({ 
    courses, 
    title="Popular Courses", 
    layout = "4x1"  // New prop to specify layout
}) => {
    const [page, setPage] = useState(1); 
    
    // Determine courses per page and column class based on layout
    const config = {
        "4x1": {
            coursesPerPage: 4,
            columnClass: "col-md-3"
        },
        "4x4": {
            coursesPerPage: 16,  // 4 courses * 8 rows
            columnClass: "col-md-3"
        }
    };

    const { coursesPerPage, columnClass } = config[layout] || config["4x1"];
    
    const totalCourses = courses.length;
    const totalPage = Math.ceil(totalCourses / coursesPerPage);

    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <div className="title">
                    <h3 className="" style={{marginBottom:0}}>{title}</h3>
                </div>
                <div className="row p-3">
                    {courses && courses
                        .slice((page - 1) * coursesPerPage, page * coursesPerPage)
                        .map((course) => (
                            <div className={columnClass} key={course.course_id}>
                                <CourseCard
                                    courseID={course.course_id}
                                    courseImage={course.image}
                                    hostLogo={course.logo_image}
                                    courseName={course.course_name}
                                    courseDescription={course.course_intro}
                                    courseRating={course.rate}
                                    courseLecturer={course.name} 
                                    courseOrganizer={course.host_name} 
                                />  
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    className="d-flex justify-content-end .custom-pagination"
                    count={totalPage}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    variant="outlined"
                    color="standard"
                    style={{marginBottom: "5px"}}
                />
            </div>
        </ThemeProvider>
    );
};

export default CourseShow;