import { createSlice } from '@reduxjs/toolkit';

const serverSlice = createSlice({
    name: 'server',
    initialState: {
        courses: [],
        // ads: [],
        coursesError: '',
        adsError: '',

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

        
    },
});

export const {
    updateCoursesSuccess,
    updateCoursesFailure,
    
} = serverSlice.actions;

export default serverSlice.reducer;
