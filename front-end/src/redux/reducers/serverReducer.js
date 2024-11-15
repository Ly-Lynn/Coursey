import * as types from '../types/serverTypes';

const initialState = {
    courses: [],  
    error: ''
};
const initialStateAds = {
    ads: [],
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

export const updateAds = (state = initialStateAds, action) => {
    switch (action.type) {
        case types.UPDATE_ADS_SUCCESS:
            console.log("Reducer: UPDATE_ADS_SUCCESS", action.payload);
            return { ...state, ads: action.payload, error: '' };
        case types.UPDATE_ADS_FAILURE:
            return { ...state, ads: [], error: action.payload };
        default:
            return state;
    }
};