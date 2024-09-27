import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './style/navBar.css'
const Navbar = () => {
    return (
        <div class="navbar">
           <Link to="/courses" class="btn_nav" id="courses_nav">Courses</Link>
           <Link to="/login" class="btn_nav" id="login_nav">Login</Link>
           <Link to="/join-us" class="btn_nav" id="join-us">Join us</Link>
        </div>
    )
}
export default Navbar