import {combineReducers} from 'redux';
// import {userReducer} from './userReducer';
import {updateCourses} from './serverReducer';

export const rootReducers = combineReducers({
    // user: userReducer,
    courses: updateCourses
});

export default rootReducers;