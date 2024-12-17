// src/config/env.js
const ENV = {
    development: {
      hostName: 'http://localhost:8080/',
    },
    production: {
      hostName: 'https://6b90-203-205-32-65.ngrok-free.app',
    }
  };
  
  const environment = 'development';
  
  export const config = ENV[environment];
  
  export const { hostName } = config;
  
  export const API_ENDPOINTS = {
    SIGNUP: 'auth/signup.php',
    LOGIN: 'auth/login.php',
    RESET_PASSWORD: 'auth/sendPassword.php',
    LOGOUT: 'auth/logout.php',

    GET_USER:'users/getUsers.php',
    GET_ALL_USER: 'users/getAllUsers.php',
    UPDATE_USER: 'users/updateUsers.php',
    DELETE_USER: 'users/deleteUsers.php',

    GET_ALL_COURSE: 'course/getAllCourse.php',
    GET_COURSE_INFO: 'adminv2/courseService.php',
    CHECK_BOUGHT: 'course/checkCourseUser.php',
    GET_BEST_RATING: 'course/getBestRatingCourse.php',
    GET_BEST_VIEWING: 'course/getBestViewCourse.php' ,

    BUY_COURSE: 'course/buyCourse.php',
    UPDATE_STATUS_VID: 'course/updateDoneVideo.php',

    GET_CURRENT_COURSES: 'course/getCurrentCourse.php',  
    GET_FINISHED_COURSES: 'course/getFinishCourse.php',  

    GET_LIST_VIDS: 'course/getUrlList.php', 
  };