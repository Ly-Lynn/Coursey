import React from 'react';
import { Snackbar } from '@mui/material';

export const CustomToast = ({ onOpen, onClose, message }) => {
    return (
        <div>
            <Snackbar
                open={onOpen}
                autoHideDuration={1200}
                onClose={onClose}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: '#000', 
                        color: 'white', 
                        fontSize: '16px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                }}
            />
        </div>
    );
}