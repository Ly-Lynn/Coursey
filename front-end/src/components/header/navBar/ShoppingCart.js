import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import './navBar.modul.css'
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Badge, Button } from "@mui/material";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { styled } from "@mui/material/styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const OrderButton = styled(Button)({
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#000",
    },
    borderRadius: 0,
    // fontWeight: "bold",
});

const CustomBadge = styled(Badge)({
    "& .MuiBadge-badge": {
        backgroundColor:"black"
    }
});

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.user.orders);
    // console.log(orders);   
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveItem = (course_id) => {
        dispatch({ type: 'user/removeOrder', payload: course_id});
    }

    const handleItemClick = (courseID) => {
        window.location.href = `/courseinfo?courseID=${courseID}`;
    }
        // 

    const totalPrice = orders.reduce((sum, order) => sum + (order.cost), 0);

    return (
        <div className="navbar" style={{padding: 0}}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flex: 1
            }}>
                <Tooltip title="Shopping Cart">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ 
                            position: 'relative',
                        }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <CustomBadge badgeContent={orders.length} color="primary">
                            <ShoppingCartIcon />
                        </CustomBadge>
                    </IconButton>
                </Tooltip>    
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: '450px',
                            width: '300px',
                        }
                    }}
                    slotProps={{
                        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                        transformOrigin: { vertical: 'top', horizontal: 'center' },
                        getContentAnchorEl: null,
                    }}
                >
                    {orders.length > 0 ? (
                        <>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {orders.map((order, index) => (
                                    <MenuItem onClick={() => handleItemClick(order.course_id)} key={index} style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                                        <ListItemIcon>
                                            <img src={order.image} style={{ 
                                                width: "70px", 
                                                height: "70px",  
                                                objectPosition: "center",
                                                objectFit: "cover",
                                                paddingRight: "0.5rem",
                                            }}/>
                                        </ListItemIcon>
                                        <div style={{ width: "70%"}}>
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
                                                    minHeight: '2.4em'
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
                                            <div className="d-flex">
                                                <strong style={{ 
                                                    fontSize:'0.75rem',
                                                    display: 'block',
                                                    marginTop: '4px'
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
                            </div>
                            <Divider />
                            <MenuItem>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Total:</strong>
                                    <strong>${totalPrice.toFixed(2)}</strong>
                                    
                                </div>
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem>Cart is empty</MenuItem>
                    )}
                    
                    <MenuItem sx={{ 
                        justifyContent: "center",
                        padding: '16px'
                    }}>
                        <OrderButton
                            component={Link}
                            to="/checkout"
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartCheckoutIcon />}
                            fullWidth
                            size="medium"
                        >
                            Checkout
                        </OrderButton>
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    );
}

export default ShoppingCart;