import React from 'react';
import { styled } from '@mui/material';
import { Container, LeftText, RightText, HighlightText } from '../../custom_components/CustomIntroText';

const Text_ = () => {
    return (
        <Container>
            <LeftText >
                Courses from <HighlightText sx={{fontSize:'2.4rem'}}>big techs</HighlightText>
            </LeftText>
            <RightText>
                all over the world                
            </RightText>
 
        </Container>
    )
   
}
export default Text_;