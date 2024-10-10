import * as types from '../types/serverTypes';

const initialState = {
    courses: [],    
    error: ''
};

export const updateCourses = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_COURSES_SUCCESS:
            console.log("Reducer: UPDATE_COURSES_SUCCESS", action.payload);
            return { ...state, courses: action.payload, error: '' };
        case types.UPDATE_COURSES_FAILURE:
            return { ...state, courses: [], error: action.payload };
        default:
            return state;
    }
};