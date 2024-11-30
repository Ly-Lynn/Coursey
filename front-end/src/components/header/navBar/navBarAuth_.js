import React from "react";
import { Select, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import Divider from '@mui/material/Divider';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import { Link } from "react-router-dom";
import './navBar.modul.css'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingCart from "./ShoppingCart";
import { useNavigate } from "react-router-dom";

const NavBarAuth = ({
    userAva="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8ocX1uyxWlO0NGGjiwM4w00ooWe9e3DMoA&s", 
    userId=1,
    userName="Gojo Satoru"
}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickAccount = () => {
        navigate(`/account`);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };  
    return (
        <div className="navbar" style={{padding:0}}>
            <Link to="/courses" className="btn_nav">Courses</Link>
            <ShoppingCart />
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flex: 1
            }}>
                <Tooltip title="Account settings">
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
                        <Avatar sx={{ width: 50, height: 50 }} src={userAva}>M</Avatar>
                    </IconButton>
                </Tooltip>    
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 'calc(50% - 5px)',  // Căn giữa mũi tên
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem disableRipple>
                        <ListItemIcon>
                            <FaceOutlinedIcon fontSize="small"/> 
                        </ListItemIcon>
                        <Typography variant="subtitle1" component="div" sx={{fontWeight:"bold"}}>{userName}</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickAccount}>
                        <ListItemIcon>
                            <AutoAwesomeIcon fontSize="small" />
                        </ListItemIcon> My Account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>Logout
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    )
}

export default NavBarAuth;