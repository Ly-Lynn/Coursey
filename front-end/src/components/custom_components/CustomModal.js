import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import CustomButton from './CustomButton';

export const CustomModal = ({ onOpen, onClose, title, subtitle}) => {
    return (
        <Modal
        open={onOpen}
        onClose={onClose}
        aria-labelledby="course-completion-modal"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Box sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: 400,
            boxShadow: 24,
        }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {subtitle}
            </Typography>
            <CustomButton 
                onClick={onClose} 
                variant='contained'
            >
                Close
            </CustomButton>
        </Box>
    </Modal>
    )
}
