import React from 'react';
import './text_intro.modul.css';

const Text = () => {
    return (
        <div className="left">
            <span style={{ fontWeight: 'bold', fontSize: '60px' }}>We are Coursey!</span> <br/>
            <span style={{ fontSize: '60px', marginLeft: '20px'}}>1500+</span> 
            <span style={{ fontSize: '20px' , marginLeft: '10px'}}>learners every day</span> <br/>
            <div className="btn">Join with us now</div>
        </div>
    )
}
export default Text;