import { createSlice } from '@reduxjs/toolkit';

const serverSlice = createSlice({
    name: 'server',
    initialState: {
        courses: [],
        ads: [],
        coursesError: '',
        adsError: '',
        
        currentStudy: [],
        currentStudyError: '',

        completedStudy: [],
        completedStudyError: ''
    },
    reducers: {
        updateCoursesSuccess: (state, action) => {
            console.log("Reducer: UPDATE_COURSES_SUCCESS", action.payload);
            state.courses = action.payload;
            state.coursesError = '';
        },
        updateCoursesFailure: (state, action) => {
            state.courses = [];
            state.coursesError = action.payload;
        },

        // Ads reducers
        updateAdsSuccess: (state, action) => {
            console.log("Reducer: UPDATE_ADS_SUCCESS", action.payload);
            state.ads = action.payload;
            state.adsError = '';
        },
        updateAdsFailure: (state, action) => {
            state.ads = [];
            state.adsError = action.payload;
        },

        // Current study courses
        updateCurrentStudySuccess: (state, action) => {
            state.currentStudy = action.payload;

        },
        updateCurrentStudyFailure: (state, action) => {
            state.currentStudy = [];
            state.currentStudyError = action.payload;
        },

        // Completed study courses
        updateCompletedStudySuccess: (state, action) => {
            state.userCompletedCourses = action.payload;
        },
        updateCompletedStudyFailure: (state, action) => {
            state.completedStudy = [];
            state.completedStudyError = action.payload;
        }
    },
});

export const {
    updateCoursesSuccess,
    updateCoursesFailure,
    updateAdsSuccess,
    updateAdsFailure,
} = serverSlice.actions;

export default serverSlice.reducer;
