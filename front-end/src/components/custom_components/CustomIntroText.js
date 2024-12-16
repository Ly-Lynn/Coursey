// text.modul.js (hoặc text.modul.css.js)
import { styled } from '@mui/material';

// Ảnh 
export const HoverImage = styled('img')({
    height: '80px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)', 
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)', 
        cursor: 'pointer', 
    }
});
export const ImageWrapper = styled('div')({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});


export const Container = styled('div')({
    display: 'flex',
    justifyContent: 'left',
    width: '50%',
    'margin-top': '1rem',
    color: 'white',
    backgroundColor: 'black',
    fontSize: '2.2rem',
    fontWeight: 'bold',
});

export const LeftText = styled('div')({
    paddingTop: '1rem',
    paddingLeft: '1rem',
});

export const RightText = styled('div')({
    paddingLeft: '1rem',
    paddingTop: '4rem',
    paddingBottom: '1rem',
});

export const HighlightText = styled('span')({
    color: 'red', 
    fontSize: '2.1rem', 
    fontWeight: 'bold', 
    transition: 'transform 0.3s ease',
    '&:hover': {
        textShadow: '2px 2px 4px rgba(255,0,0,0.7)', 
        cursor: 'pointer',
    }
});
