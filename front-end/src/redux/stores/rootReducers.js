import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; 
import serverReducer from '../slices/serverSlice'; 
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
    user: userReducer,
    server: serverReducer,
    auth: authReducer,
});

export default rootReducer;
