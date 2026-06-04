// src/config/env.js
const environment = process.env.NODE_ENV || 'development';

const ENV = {
  development: {
    hostName: process.env.REACT_APP_API_URL,
  },
  production: {
    hostName: process.env.REACT_APP_API_URL,
  }
};

export const config = ENV[environment];
export const { hostName } = config;

  
  export const API_ENDPOINTS = {
    SIGNUP: 'auth/signup.php',
    LOGIN: 'auth/login.php',
    RESET_PASSWORD: 'auth/sendPassword.php',
    CHANGE_PASSWORD: 'auth/changePassword.php',
    LOGOUT: 'auth/logout.php',

    GET_USER:'users/getUsers.php',
    GET_ALL_USER: 'users/getAllUsers.php',
    UPDATE_USER: 'users/updateUsers.php',
    DELETE_USER: 'users/deleteUsers.php',

    GET_ALL_COURSE: 'course/getAllCourse.php',
    GET_COURSE_INFO: 'adminV2/courseService.php',
    CHECK_BOUGHT: 'course/checkCourseUser.php',
    GET_BEST_RATING: 'course/getBestRatingCourse.php',
    GET_BEST_VIEWING: 'course/getBestViewCourse.php' ,

    BUY_COURSE: 'course/buyCourse.php',
    UPDATE_STATUS_VID: 'course/updateDoneVideo.php',

    GET_CURRENT_COURSES: 'course/getCurrentCourse.php',  
    GET_FINISHED_COURSES: 'course/getFinishCourse.php',  

    GET_LIST_VIDS: 'course/getUrlList.php', 
  };