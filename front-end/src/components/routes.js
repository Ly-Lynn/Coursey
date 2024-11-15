import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseScreen from '../screens/Course/CourseScreen';
import MainPage from '../screens/Home/homeScreen';
import CourseInfoPage from '../screens/Course/CourseInfo';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/courses" element={<CourseScreen />} />
                <Route path="/courseinfo" element={<CourseInfoPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
