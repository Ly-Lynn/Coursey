import React from 'react';
import img1 from './bighost_logos/harvard.png';
import img2 from './bighost_logos/yale.png';
import img3 from './bighost_logos/uni.png';
import img4 from './bighost_logos/cornell.png';
import { styled, Tooltip } from '@mui/material';
import { HoverImage } from '../custom_components/CustomIntroText';
const LogoContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    padding: '3rem',
    flexDirection: 'row',
});

const BigHostLogo = () => {
    const logoDetails = [
        { src: img1, name: 'Harvard University' },
        { src: img2, name: 'Yale University' },
        { src: img3, name: 'University of Cambridge' },
        { src: img4, name: 'Cornell University' }
    ];

    return (
        <LogoContainer>
            {logoDetails.map((logo, index) => (
                <Tooltip title={logo.name} key={index}>
                    <HoverImage 
                        src={logo.src} 
                        alt={`logo-${index}`} 
                    />
                </Tooltip>
            ))}
        </LogoContainer>
    )
}

export default BigHostLogo;