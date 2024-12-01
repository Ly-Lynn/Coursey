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
    CHANGE_PASS: 'auth/changePassword.php',
    FORGOT_PASSWORD: 'auth/forgotPassword.php',
    RESET_PASSWORD: 'auth/resetPassword.php',
    LOGOUT: 'auth/logout.php',

    GET_USER:'users/getUsers.php',
    GET_ALL_USER: 'users/getAllUsers.php',
    UPDATE_USER: 'users/updateUsers.php',
    DELETE_USER: 'users/deleteUsers.php',
    UPDATE_PROFILE: 'auth/updateProfile.php',

    GET_ALL_COURSE: 'course/getAllCourse.php',
    GET_COURSE_INFO: 'course/getCourseInfo.php',
    CHECK_BOUGHT: 'course/checkCourseUser.php',
    GET_BEST_RATING: 'course/getBestRatingCourse.php',
    GET_BEST_VIEWING: 'course/getBestViewCourse.php' ,
    GET_URL_VID: 'python/getUrllist',

    //{
    //   "username": "lynn",
    //    "userID": "1"
    // }  
    GET_CURRENT_COURSES: 'course/getCurrentCourse.php',  // trả mảng course_id mà user đang học (hay dã mua)
    GET_FINISHED_COURSES: 'course/getFinishCourse.php', // trả mảng course_id mà user đã học xong (có thêm trường progress và trường certificate - link ảnh chứng chỉ) 
  };