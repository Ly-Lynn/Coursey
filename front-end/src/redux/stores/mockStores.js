// src/redux/stores/mockStore.js
import { configureStore } from '@reduxjs/toolkit';
import { updateCourses, updateAds } from '../reducers/serverReducer'; // điều chỉnh path theo project của bạn

const mockStore = configureStore({
  reducer: {
    courses: updateCourses,
    ads: updateAds,
  }
});

export default mockStore;