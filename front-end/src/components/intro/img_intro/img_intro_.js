import React from 'react';
import './img_intro.modul.css';
import img from "./llama.png";

const Image = () => {
    return (
        <div className="Right">
            <img src={img}/>
                <div className="text">
                    <div>
                        <div class="text_">The world </div>
                        <div class="text_">at your fingertips!</div>
                    </div>
                      
            </div>
            
        </div>
    )
}
export default Image;

