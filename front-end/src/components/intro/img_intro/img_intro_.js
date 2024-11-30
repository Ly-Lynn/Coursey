import React from 'react';
import './img_intro.modul.css';
import img from "./llama.png";
import { styled } from '@mui/material';

const Text = styled('div')({
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    display: 'flex',
    marginLeft: '20px',
    textAlign: 'center',
    '@media (max-width: 600px)': {
        fontSize: '1.5rem',
        marginLeft: '10px',
    },
    '@media (max-width: 400px)': {
        fontSize: '1rem',
        marginLeft: '5px',
    }
});

const Image = () => {
    return (
        <div className="Right">
            <img className='intro_img' src={img}/>
                <Text className="text">
                    <div>
                        <div class="text_">The world </div>
                        <div class="text_">at your fingertips!</div>
                    </div>
            </Text>
            
        </div>
    )
}
export default Image;

