import React from 'react';
import Text_ from '../text/text_';
import BigTechLogo from '../bigtech_logo/bigtech_logo_';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
const Container = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    // gap: '50px',
    'margin-top': '1rem',
    flexDirection: 'row',
});

const BigTechIntro = () => {
    return(
        <Container >
            <Text_ />
            <BigTechLogo/>
        </Container>

        )

}
export default BigTechIntro;