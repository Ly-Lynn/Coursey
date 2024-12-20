// src/redux/stores/mockStore.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; 
import serverReducer from '../slices/serverSlice'; 
import authReducer from '../slices/authSlice';

const mockStore = configureStore({
  reducer: {
    user: userReducer,
    server: serverReducer,
    auth: authReducer,
  }
});

export default mockStore;