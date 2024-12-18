import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';

const CustomTextField = styled(TextField)(({ theme, editmode=true }) => ({
    width: '60%',
        
    '& .MuiOutlinedInput-root': {
        borderRadius: 0,
      '& fieldset': {
        borderColor: '#000',
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
      },
    },
    
    '& .MuiInputLabel-root': {
      color: '#000',
      '&.Mui-focused': {
        color: '#000',
      },
    },
  
    '& .MuiInputBase-input': {
      color: '#000',
    },
  
    ...(editmode === 'true' && {
      '& .MuiFilledInput-root': {
        borderRadius: 0,
        fontWeight: 'bold',
        backgroundColor: '#000',
        '&:hover': {
          backgroundColor: '#222',
        },
        '&.Mui-focused': {
          backgroundColor: '#000',
        },
        '& .MuiInputBase-input': {
          color: '#fff',
        },
      },
      '& .MuiInputLabel-root': {
        color: '#fff',
        '&.Mui-focused': {
          color: '#fff',
        },
      },
    }),
  }));
export default CustomTextField;