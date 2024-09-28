import React from 'react';
import './text_intro.modul.css';
import {Link} from 'react-router-dom';

const Text = () => {
    return (
        <div className="left">
            <span style={{ fontWeight: 'bold', fontSize: '80px' }}>We are Coursey!</span> <br/>
            <span style={{ fontSize: '70px', marginLeft: '20px'}}>1500+</span> 
            <span style={{ fontSize: '30px' , marginLeft: '10px'}}>learners every day</span> <br/>
            <div className="btn">Join with us now</div>
        </div>
    )
}
export default Text;