import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseScreen from '../screens/Course/CourseScreen';
import MainPage from '../screens/Home/homeScreen';
import CourseInfoPage from '../screens/Course/CourseInfo';
import Checkout from '../screens/Checkout/Checkout';
import Personal from '../screens/Personal/Personal';
import StudyScreen from '../screens/Study/StudyScreen';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/courses" element={<CourseScreen />} />
                <Route path="/courseinfo" element={<CourseInfoPage />} />
                <Route path='/checkout' element={<Checkout />}></Route>
                <Route path='/account' element={<Personal />}></Route>
                <Route path='/learn' element={<StudyScreen />}></Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
