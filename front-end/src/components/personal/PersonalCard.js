import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, 
        Avatar, 
        CardContent, 
        Typography,
        Button,
        CardActions,
        Box,
        Paper,
        TextField,
        CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { updateProfile } from "../../redux/slices/authSlice";

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import CustomButton from "../../components/custom_components/CustomButton";

const CustomTypography = styled("div")({
    fontFamily: "'Press Start 2P', system-ui",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "20px",
    lineHeight: 1.2,
    resize: "both", 
    "@media (max-width: 600px)": {
        fontSize: "5px",
    },
});

const CustomTextField = styled(TextField)(({ theme, editmode }) => ({
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

const Ribbon = styled(Paper)(({ theme }) => ({
    textAlign: 'center',    
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: '12rem',
    top: 'calc(2.4 * 1.5em)',
    height:"200px",
    width:"200px",
    padding: '0.2em',
    background: 'rgba(250, 0,0,0.5)',
    borderRight: '0.5em solid rgba(0, 0, 0, 0.3)',
    borderBottom: '0.8em solid transparent',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    clipPath: 'polygon(calc(100% - 0.5em) 0, 0 0, 0 100%, calc(50% - 0.25em) calc(100% - 1.3em), calc(100% - 0.5em) 100%, calc(100% - 0.5em) 0.5em, 100% 0.5em)',
  }));

export default function PersonalCard() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const userInfo = auth.user;
    console.log("PersonalCard info", userInfo);
    const [exists, setExists] = useState(false);
    
    const [editMode, setEditMode] = useState(false); 
    const [editQuote, setEditQuote] = useState(false);
    const [userData, setUserData] = useState({
        username: userInfo.username,
        email: userInfo.email,
    });
    
    const [beforeUpdate, setBeforeUpdate] = useState({ ...userInfo });

    const [quote, setQuote] = useState(userInfo.quote);
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            if (userData.username === beforeUpdate.username && userData.email === beforeUpdate.email) {
                setExists(true);
                setEditMode(false);
                return;
            }
            // await dispatch(updateProfile(userData)).unwrap(); 
            console.log("User data afer update: ", userData);
            setEditMode(false);
            setBeforeUpdate({ ...userData }); 
        } catch (error) {
            console.error("Error updating profile:", error); 
        } finally {
            setLoading(false); 
        }
    };

    const handleChangeQuote = (e) => {
        setQuote(e.target.value); 
    };

    return (
        <div style={{margin:'1rem 8rem 1.5rem 8rem'}}>
            <Snackbar
                open={exists}
                autoHideDuration={1200}
                onClose={() => setExists(false)}
                message="Nothing changed!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                variant="filled"
                sx={{
                    '& .MuiSnackbarContent-root': {
                    backgroundColor: '#000', 
                    color: 'white', 
                    fontSize: '16px', 
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                }}
            />
            <Card sx={{ display: "flex", flexDirection: "row", padding: "1rem", alignItems: "center", border:"1px solid black", borderRadius:0, boxShadow:'0px 4px 12px rgba(0, 0, 0, 0.5)' }}>
                <Avatar src={userInfo.ava} alt="Avatar" variant="square" sx={{ width: "100px", height: "100px", marginRight: "1rem" }} />

                <Box sx={{ flex: 1 }}>
                    <CardHeader sx={{p:0, paddingLeft:1}} titleTypographyProps={{ fontSize: '1.25rem', fontWeight:'bold'}} title="Your Information" />
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {/* Username */}
                            <CustomTextField
                                size="small"
                                editmode={editMode.toString()}
                                value={userData.username}
                                onChange={handleChange}
                                label="Username"
                                name="username"
                                variant={editMode ? "filled" : "outlined"}
                                InputProps={{
                                    readOnly: !editMode,
                                }}
                            />
                            {/* Email */}
                            <CustomTextField
                                size="small"
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                editmode={editMode.toString()}
                                variant={editMode ? "filled" : "outlined"}
                                InputProps={{
                                    readOnly: !editMode,
                                }}
                            />
                        </Box>
                    </CardContent>

                    <CardActions>
                        {!editMode ? (
                            <>
                                <CustomButton variant="outlined" onClick={() => setEditMode(true)}>
                                    Edit Info
                                </CustomButton>
                                <CustomButton variant="contained" color="error">
                                    Change Password
                                </CustomButton>
                            </>
                        ) : (
                            <CustomButton variant="contained" color="success" onClick={handleSaveChanges}>
                                Save Changes
                            </CustomButton>
                        )}
                    </CardActions>
                </Box>

                <Ribbon>
                {editQuote ? (
                        <TextField
                            value={quote}
                            onChange={handleChangeQuote}
                            onBlur={() => setEditQuote(false)} // Tắt chế độ chỉnh sửa khi mất focus
                            autoFocus
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "'Press Start 2P', system-ui",
                                fontSize: "1.2rem",
                                textAlign: "center",
                                width: "100%",
                            }}
                            variant="standard"
                        />
                    ) : (
                        <CustomTypography onClick={() => setEditQuote(true)}>
                            {quote || "Click to add a quote"}
                        </CustomTypography>
                    )}
                </Ribbon>
            </Card>
        </div>
    );
}