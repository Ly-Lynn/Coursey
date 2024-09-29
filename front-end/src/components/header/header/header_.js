import React from 'react';
import './header.modul.css';
import NavBar from '../navBar/navBar_';
import SearchBar from '../searchBar/searchBar_'; 
import logo from './logo.png';

const Header = () => {
    const handleTextChange = (text) => {
        console.log(text);
    }
    const handleFocus = () => {
        console.log('focused');
    }

    return (
        <div className="header">
            <img className='logo' alt='logo' src={logo}/>
            <SearchBar 
                onFocus={handleFocus}
                onChangeText={handleTextChange} />
            <NavBar/>           
        </div>
    )
}
export default Header;