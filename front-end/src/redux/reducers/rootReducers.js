import {combineReducers} from 'redux';
// import {userReducer} from './userReducer';
import {updateCourses, updateAds} from './serverReducer';
import authReducer from '../stores/authSlice';

export const rootReducers = combineReducers({
    // user: userReducer,
    auth: authReducer,
    courses: updateCourses,
    ads: updateAds,
});

export default rootReducers;