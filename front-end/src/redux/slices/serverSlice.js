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
            console.log("Reducer: UPDATE_CURRENT_STUDY_SUCCESS", action.payload);
            state.currentStudy = action.payload;
            state.currentStudyError = '';

        },
        updateCurrentStudyFailure: (state, action) => {
            state.currentStudy = [];
            state.currentStudyError = action.payload;
        },

        // Completed study courses
        updateCompletedStudySuccess: (state, action) => {
            console.log("Reducer: UPDATE_COMPLETED_STUDY_SUCCESS", action.payload);
            state.completedStudy = action.payload;
            state.completedStudyError = '';
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
    updateCurrentStudySuccess,
    updateCurrentStudyFailure,
    updateCompletedStudySuccess,
    updateCompletedStudyFailure
} = serverSlice.actions;

export default serverSlice.reducer;
