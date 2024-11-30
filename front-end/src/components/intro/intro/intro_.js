import React from 'react';
import Image from '../img_intro/img_intro_';
import Text from '../text_intro/text_intro_';
import { styled } from '@mui/material';

const IntroBox = styled('div')({
    marginTop:'1rem',
    display: 'grid',
    'grid-template-columns': 'auto auto',
    'place-items': 'center',
    width: '100%',
    gap: '50px',
});

const Intro = () => {
    return (
        <IntroBox>
            <Text />
            <Image />
        </IntroBox>
    )
}
export default Intro;