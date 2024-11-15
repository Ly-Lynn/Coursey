import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const renderStars = (courseRate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= courseRate) {
            stars.push(<StarIcon key={i} sx={{ color: '#fbc02d', fontSize: '20px' }} />); 
        } else if (i - 0.5 <= courseRate) {
            stars.push(<StarHalfIcon key={i} sx={{ color: '#fbc02d', fontSize: '20px' }} />);
        } else {
            stars.push(<StarBorderIcon key={i} sx={{ color: '#fbc02d', fontSize: '20px' }} />); 
        }
    }
    return stars;
};

const StarRating = ({ rating }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderStars(rating)}
        </div>
    );
};

export default StarRating;
