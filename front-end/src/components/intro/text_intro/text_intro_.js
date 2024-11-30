import React from 'react';
import './text_intro.modul.css';
import { Link } from 'react-router-dom';
import CustomButton from '../../custom_components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import AuthDialog from '../../auth/AuthDialog';
import { useState } from 'react';
import ModalOverlay from '../../custom_components/ModalOverlay';
import { Box, ButtonGroup } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';

const Title = styled('span')({
    fontWeight: 'bold',
    fontSize: '5rem',
    background: 'linear-gradient(to right, #000000, #ffffff)',
    WebkitBackgroundClip: 'text',
    color: '',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)',
    // Thêm outline cho chữ
    WebkitTextStroke: '1px rgba(0, 0, 0, 0.5)', 
});

const Text = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated;
    const [authState, setAuthState] = useState(null);
    const navigate = useNavigate();
    const handleSignUp = () => {
        setAuthState('signup');
    }
    const handleExplore = () => {
        navigate('/courses');
    }

    return (
        <div className="left">
            <Box sx={{ color:'black'}}>
                <Title style={{ fontWeight: 'bold', fontSize: '5rem' }}>We are Coursey!</Title> <br/>
                <span style={{ fontSize: '4rem', marginLeft: '2rem', color:'red'}}>1500+</span> 
                <span style={{ fontSize: '2rem' , marginLeft: '1rem'}}>learners every day</span> <br/>
            </Box>
            <ButtonGroup>
                {!isAuthenticated &&
                    <CustomButton variant='contained' 
                    sx={{ marginLeft: '30em', marginTop:'1rem', fontWeight:'bold'}}
                    onClick={handleSignUp}>
                    Join with us now</CustomButton>
                }
                <CustomButton variant='outlined'
                            sx={{ marginLeft: '30em', marginTop:'1rem', fontWeight:'bold'}}
                            onClick={handleExplore}>
                Explore</CustomButton>
            </ButtonGroup>
            {authState && 
                <ModalOverlay>
                    <div className="modal-content">
                        <AuthDialog authState={authState} onClose={() => setAuthState(null)} />
                    </div>
                </ModalOverlay>
            }
        </div>
    )
}
export default Text;