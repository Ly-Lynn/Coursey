import React from 'react';
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";


const CustomButton = styled(Button)(({ variant }) => ({
    borderRadius: 0,
    // textTransform: 'none',
    transition: 'all 0.2s ease',
    
    ...(variant === 'contained' && {
      backgroundColor: '#000',
      color: 'white',
      '&:hover': {
        backgroundColor: '#333',
      },
    }),
  
    ...(variant === 'outlined' && {
      backgroundColor: 'white',
      color: '#000',
      border: '1px solid #000',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        border: '1px solid #000',
      },    
    }),
  }));

export default CustomButton;