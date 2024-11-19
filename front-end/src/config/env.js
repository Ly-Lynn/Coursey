// src/config/env.js
const ENV = {
    development: {
      hostName: 'http://localhost:3000/',
    },
    production: {
      hostName: 'https://f02b-222-253-85-202.ngrok-free.app/',
    }
  };
  
  const environment = 'production';
  
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

    GET_COURSE_INFO: 'course/getCourseInfo.php',
    CHECK_BOUGHT: 'course/checkCourseUser.php',
    GET_BEST_RATING: 'course/getBestRatingCourse.php',
    GET_BEST_VIEWING: 'course/getBestViewCourse.php' ,
    GET_URL_VID: 'python/getUrllist',

    GET_CURRENT_STUDY: '',  // trả thông tin từng course mà user đang học
    GET_COMPLETED_STUDY: '', // trả thông tin từng course mà user đã học xong
  };