import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './navBar.modul.css'
const NavBar = () => {
    return (
        <div className="navbar">
           <Link to="/courses" class="btn_nav" id="courses_nav">Courses</Link>
           <Link to="/login" class="btn_nav" id="login_nav">Login</Link>
           <Link to="/join-us" class="btn_nav" id="join-us">Join us</Link>
        </div>
    )
}
export default NavBar