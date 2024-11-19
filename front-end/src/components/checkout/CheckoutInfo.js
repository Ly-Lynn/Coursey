import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { 
    Box,
    Paper,
    Grid,
    TextField,
    Typography,
    Button,
    Container,
    Divider,
    colors,
    InputLabel,
    Select,
    MenuItem,
    FormControl
  } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';

// Styled components remain unchanged...
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    color:"black",
    fontWeight:"bold",
    border: "2px solid black",
    borderRadius: 0,
    marginBottom: theme.spacing(3),
}));

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black', 
    },
    '& label': {
        color:'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', 
      },
    },
    '& .MuiInputBase-input': {
      color: 'black', 
    },
});

const StyledSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.8)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000',
    },
    '& .MuiSelect-select': {
        color: '#000', 
    },
    '& .MuiSvgIcon-root': {
        color: '#000', 
    },
    '& .MuiInputLabel-root': {        
        color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': {  
        color: '#000',
    }
});

const StyledMenuItem = styled(MenuItem)({
    '&.MuiMenuItem-root': {
        color: '#000',
    },
    '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&.Mui-selected:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default function CheckoutInfo({ buynow=null }) {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.user.orders);
    const [ordersLocal, setOrdersLocal] = useState([]);

    useEffect(() => {
        if (buynow) {
            // Fetch buy now course information
            const fetchBuyNow = async () => {
                try {
                    const order = await axios.get(``);
                    console.log(order.data);
                    setOrdersLocal([order.data]);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchBuyNow();
        } else {
            setOrdersLocal(orders);
        }
    }, [buynow, orders]); // Add dependencies

    const totalPrice = ordersLocal.reduce((sum, order) => sum + (order.cost), 0);

    const handleRemoveItem = (course_id) => {
        dispatch({ type: 'user/removeOrder', payload: course_id});
    };

    const handleItemClick = (courseID) => {
        window.location.href = `/courseinfo?courseID=${courseID}`;
    };

    return (
        <Container maxWidth="xs">
          <Box sx={{ width: '100%', mt: 4 }}>
            <StyledPaper elevation={3}>
              <Typography sx={{fontWeight:"bold"}} variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Grid container sx={{justifyContent:"center"}}>
                <Grid item >
                    {ordersLocal.map((order, index) => (
                        <MenuItem 
                            onClick={() => handleItemClick(order.course_id)} 
                            key={index} 
                            style={{ paddingTop: '12px', paddingBottom: '12px' }}
                        >
                            <ListItemIcon>
                                <img 
                                    src={order.image} 
                                    style={{ 
                                        width: "70px", 
                                        height: "70px",  
                                        objectPosition: "center",
                                        objectFit: "cover",
                                        paddingRight: "0.5rem",
                                    }}
                                    alt={order.course_name}
                                />
                            </ListItemIcon>
                            <div style={{ width: "100%"}}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                }}>
                                    <span style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '100%',
                                        lineHeight: '1.2em',
                                        maxHeight: '2.4em',
                                        fontSize: '1rem',
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal',
                                    }}>
                                        {order.course_name}
                                    </span>
                                </div>
                                <div style={{ 
                                    fontSize: '0.8rem', 
                                    color: 'gray',
                                    marginTop: '4px'
                                }}>
                                    {order.lecturer_name}
                                </div>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <strong style={{ 
                                        fontSize:'0.75rem',
                                        display: 'block',
                                        marginTop: '4px',
                                        textAlign:"center"
                                    }}>
                                        ${order.cost.toFixed(2)}
                                    </strong>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            handleRemoveItem(order.course_id);
                                        }}
                                        sx={{
                                            color: 'grey.500',
                                            '&:hover': {
                                                color: 'error.main',
                                            }
                                        }}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>    
                                </div>
                            </div>
                        </MenuItem>
                    ))}
                </Grid>
                <Divider sx={{ width: '100%', margin: '16px 0' }} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily:"Arial" }}>
                    <strong>Total:</strong>
                    <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                <Button variant="contained" color="" style={{borderRadius:0, marginTop:"1rem", width:'100%', backgroundColor:"black", color:'white'}}>Confirm Checkout</Button>
              </Grid>
            </StyledPaper>
          </Box>
        </Container>
    );
}