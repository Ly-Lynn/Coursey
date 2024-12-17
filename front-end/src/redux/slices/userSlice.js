import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const initialState = {
    orders: [],
    currentStudy: [],
    currentStudyError: '',
    completedStudy: [],
    completedStudyError: '',

    currentVids: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload); 
        },
        removeOrder: (state, action) => {
            state.orders = state.orders.filter(order => order.course_id !== action.payload);
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
        addCurrentStudy: (state, action) => {
            state.currentStudy.push(action.payload);
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
        addCompletedStudy: (state, action) => {
            console.log(state.currentStudy);
            const currentStudyIndex = state.currentStudy.findIndex(id => id === parseInt(action.payload.courseID));
            if (currentStudyIndex !== -1) {
                state.currentStudy.splice(currentStudyIndex, 1);
            }
            state.completedStudy.push(parseInt(action.payload.courseID));
            console.log("Reducer: ADD_COMPLETED_STUDY", state.completedStudy);
        },
        updateCompletedStudyFailure: (state, action) => {
            state.completedStudy = [];
            state.completedStudyError = action.payload;
        },

        initialCurrentVids: (state, action) => {
            state.currentVids = action.payload;
        },
        updateStatusVid: (state, action) => {
            // console.log("Reducer: UPDATE_STATUS_VID", action.payload);
            const index = state.currentVids.findIndex(vid => vid.url === action.payload.url);
            state.currentVids[index].complete = 1;
        },
        buyCourse: (state, action) => {
            for (let i = 0; i < action.payload.length; i++) {
                state.currentStudy.push(action.payload[i]);
            }
        },
    },
});

export const { addOrder, 
            removeOrder, 
            updateStatusVid,
            initialCurrentVids,
            updateCurrentStudySuccess,
            updateCurrentStudyFailure,
            updateCompletedStudySuccess,
            updateCompletedStudyFailure,
            addCompletedStudy,
            // addCurrentCourse, 
            // addFinishedCourse 
            buyCourse
        } = userSlice.actions;

export default userSlice.reducer;
