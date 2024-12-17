import { createSlice } from '@reduxjs/toolkit';

const serverSlice = createSlice({
    name: 'server',
    initialState: {
        courses: [],
        // ads: [],
        coursesError: '',
        adsError: '',
        
        currentStudy: [],
        currentStudyError: '',

        completedStudy: [],
        completedStudyError: '',

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

        // Current study courses
        updateCurrentStudySuccess: (state, action) => {
            
            const courses = Array.isArray(action.payload) 
                ? action.payload 
                : [action.payload];
            
            const courseIds = courses.map(course => 
                typeof course === 'object' ? course.course_id : course
            );
            state.currentStudy = courseIds || [];
            console.log("Reducer: UPDATE_CURRENT_STUDY_SUCCESS", state.currentStudy);
            state.currentStudyError = '';

        },
        updateCurrentStudyFailure: (state, action) => {
            state.currentStudy = [];
            state.currentStudyError = action.payload;
        },

        // Completed study courses
        updateCompletedStudySuccess: (state, action) => {
            
            const courses = Array.isArray(action.payload) 
                ? action.payload 
                : [action.payload];
            
            const courseIds = courses.map(course => 
                typeof course === 'object' ? course.course_id : course
            );
            state.completedStudy = courseIds || [];
            console.log("Reducer: UPDATE_COMPLETED_STUDY_SUCCESS", state.completedStudy);
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
