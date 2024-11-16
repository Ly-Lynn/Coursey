import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingFallback = () => (
    <Box display="flex" justifyContent="center" alignItems="center" py={2}>
        <CircularProgress />
    </Box>
);

export default LoadingFallback;