import react from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { connect } from 'react-redux';
import Header from "../../components/header/header/header_"
import Intro from "../../components/intro/intro/intro_"
// import { fetchPosts } from '../../actions/postActions';

const MainPage = () => {
    return (
        <div>
            <Header />
            <Intro />
        </div>
    )
}

export default MainPage;