import React from 'react';
import './bigtech_logo.modul.css';
import amazon from './amazon.png';
import meta from './meta.png';
import netflix from './netflix.png';
import google from './google.png';
import apple from './apple.png';

const BigTechLogo = () => {
    return (
        <div class="BigtechLogo">
            <img src={meta}/>
            <img src={apple}/>
            <img src={amazon}/>
            <img src={netflix}/>
            <img src={google}/>
        </div>
    )
}
export default BigTechLogo;