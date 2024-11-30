import React from 'react';
import amazon from './bigtechImg/amazon.png';
import meta from './bigtechImg/meta.png';
import netflix from './bigtechImg/netflix.png';
import google from './bigtechImg/google.png';
import apple from './bigtechImg/apple.png';
import { styled, Tooltip } from '@mui/material';
import { HoverImage } from "../../custom_components/CustomIntroText"

const LogoContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    padding: '3rem',
    flexDirection: 'row',
});
const BigTechLogo = () => {
    const logoCompanies = [
        { src: meta, name: 'Meta' },
        { src: apple, name: 'Apple' },
        { src: amazon, name: 'Amazon' },
        { src: netflix, name: 'Netflix' },
        { src: google, name: 'Google' }
    ];
    return (
        <LogoContainer>
            {logoCompanies.map((logo, index) => (
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
export default BigTechLogo;