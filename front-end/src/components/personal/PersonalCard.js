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

const Ribbon = styled(Paper)(({ theme }) => ({
    textAlign: 'center',    
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: '30px',
    top: 'calc(0.2 * 0.5em)',
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
    console.log(userInfo);

    const [editMode, setEditMode] = useState(false); // Toggle chế độ chỉnh sửa
    const [editQuote, setEditQuote] = useState(false);
    const [userData, setUserData] = useState({
        username: userInfo.username,
        email: userInfo.email,
    });

    const [quote, setQuote] = useState(userInfo.quote);
    const [loading, setLoading] = useState(false); // Loading state khi gọi API

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            await dispatch(updateProfile(userData)).unwrap(); 
            setEditMode(false); 
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
        <div>
            <Card sx={{ display: "flex", flexDirection: "row", padding: "1rem", alignItems: "center", border:"1px solid black" }}>
                <Avatar src={userInfo.ava} alt="Avatar" variant="square" sx={{ width: "15%", height: "15%", marginRight: "1rem" }} />

                <Box sx={{ flex: 1 }}>
                    <CardHeader title="Your Information" />
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {/* Username */}
                            <TextField
                                label="Username"
                                name="username"
                                sx={{width: "60%"}}
                                value={userData.username}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: !editMode,
                                }}
                                variant="outlined"
                            />
                            {/* Email */}
                            <TextField
                                label="Email"
                                name="email"
                                sx={{width: "60%"}}
                                value={userData.email}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: !editMode,
                                }}
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>

                    <CardActions>
                        {!editMode ? (
                            <>
                                <Button variant="contained" onClick={() => setEditMode(true)}>
                                    Edit Info
                                </Button>
                                <Button variant="contained" color="error">
                                    Change Password
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" color="success" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
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