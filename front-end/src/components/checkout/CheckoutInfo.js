import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { hostName, API_ENDPOINTS } from "../../config/env";
import { toast } from "react-hot-toast";
import { buyCourse, resetOrder } from "../../redux/slices/userSlice";
import { CustomModal } from "../custom_components/CustomModal";
import CircularProgress from '@mui/material/CircularProgress';

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
    const [loading, setLoading] = useState(false);
    const [successBuy, setSuccessBuy] = useState(false);
    const allCourses = useSelector((state) => state.server.courses);
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);
    
    useEffect(() => {
        if (buynow) {
            const course = allCourses.find(course => course.course_id === parseInt(buynow));
            if (course) {
                setOrdersLocal([course]);
            }
        } else {
            setOrdersLocal(orders);
        }
    }, [buynow, orders, allCourses]);

    const totalPrice = ordersLocal.reduce((sum, order) => sum + (order.cost), 0);

    const handleRemoveItem = (course_id) => {
        dispatch({ type: 'user/removeOrder', payload: course_id});
    };

    const handleItemClick = (courseID) => {
        navigate(`/courseinfo?courseID=${courseID}`);
    };
    const onCloseNoti = () => {
        setSuccessBuy(false);
        navigate('/');
    }
    if (loading) {
        return (
            <div style={{
                position: 'fixed', // Để Overlay phủ toàn màn hình
                top: 0, 
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
                display: 'flex',
                justifyContent: 'center', // Canh giữa theo chiều ngang
                alignItems: 'center', // Canh giữa theo chiều dọc
                zIndex: 9999, // Đảm bảo overlay phủ lên các thành phần khác
              }}>
                <CircularProgress color="inherit" />
              </div>
        ) ;
    }

    const handleCheckout = async () => {
        setLoading(true);
        const courseIDs = ordersLocal.map(order => order.course_id);
        console.log("Course IDs: ", courseIDs);
        const userID = auth.user.id;
        const email = auth.user.gmail;

        try {
            const response = await fetch(`${hostName}${API_ENDPOINTS.BUY_COURSE}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: userID,
                    courseIDs: courseIDs
                }),
            });
            if (response.status !== 200) {
                const errorData = await response.json();
                toast.error(errorData.message);
                console.error(errorData.message);
            }
            const res = await response.json();
            console.log("Buy course response: ", res);
            dispatch(buyCourse(courseIDs));
            dispatch(resetOrder());
            setLoading(false);
            setSuccessBuy(true);
            // console.log("Current study", user.currentStudy);
            
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxWidth="xs">
            <CustomModal
                onOpen={successBuy}
                onClose={onCloseNoti}
                title="Thank you! 💖"
                subtitle="You have successfully purchased the course(s)."
            />
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
                <Button onClick={handleCheckout} variant="contained" color="" style={{borderRadius:0, marginTop:"1rem", width:'100%', backgroundColor:"black", color:'white'}}>Confirm Checkout</Button>
              </Grid>
            </StyledPaper>
          </Box>
        </Container>
    );
}