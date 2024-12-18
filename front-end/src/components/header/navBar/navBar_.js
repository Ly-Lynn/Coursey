import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.modul.css'
import AuthDialog from '../../auth/AuthDialog';
import CustomButton from '../../custom_components/CustomButton';
import ModalOverlay from '../../custom_components/ModalOverlay';

const NavBar = () => {
    const [authState, setAuthState] = useState(null);

    const openSignup = () => setAuthState('signup');
    const openLogin = () => setAuthState('signin');
    const closeDialog = () => setAuthState(null);
    
    return (
        <>
            <div className="navbar">
                <Link to="/courses" className="btn_nav" style={{color:'black', fontWeight:"bold"}}>Courses</Link>
                <CustomButton variant='outlined' 
                            style={{ fontWeight: 'bold'}}
                            onClick={openLogin}>
                    Login
                </CustomButton>
                <CustomButton variant='contained' 
                            style={{ fontWeight: 'bold'}}
                            onClick={openSignup}>
                    Sign up
                </CustomButton>
            </div>
            {authState && 
                <ModalOverlay>
                    <div className="modal-content">
                        <AuthDialog authState={authState} onClose={closeDialog} />
                    </div>
                </ModalOverlay>
            }
        </>
    );
};
export default NavBar