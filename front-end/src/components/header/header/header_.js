import React from 'react';
import './header.modul.css';
import NavBar from '../navBar/navBar_';
import SearchBar from '../searchBar/searchBar_'; 
import logo from './logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import NavBarAuth from '../navBar/navBarAuth_';

const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated;
    console.log(isAuthenticated)

    const handleTextChange = (text) => {
        console.log(text);
    }
    const handleFocus = () => {
        console.log('focused');
    }


    return (
        <div className="header">
            <img className='logo' style={{width:"200px"}} alt='logo' src={logo}/>
            <SearchBar 
                onFocus={handleFocus}
                onChangeText={handleTextChange} />
            {isAuthenticated && <NavBar/>}
            {!isAuthenticated && <NavBarAuth />}     
        </div>
    )
}
export default Header;