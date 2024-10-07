import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.modul.css'
import AuthDialog from '../../auth/AuthDialog';

const NavBar = () => {
    const [authState, setAuthState] = useState(null);

    const openSignup = () => setAuthState('signup');
    const openLogin = () => setAuthState('signin');
    const closeDialog = () => setAuthState(null);
    
    return (
        <>
            <div className="navbar">
                <Link to="/courses" className="btn_nav" id="courses_nav">Courses</Link>
                <div onClick={openLogin} className="btn_nav" id="login_nav">Login</div>
                <div onClick={openSignup} className="btn_nav" id="join-us">Join us</div>
            </div>
            {authState && 
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AuthDialog authState={authState} onClose={closeDialog} />
                    </div>
                </div>
            }
        </>
    );
};
export default NavBar