import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Card, 
    Avatar, 
    CardContent, 
    CardActions,
    Box,
    Snackbar,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../components/custom_components/CustomButton";
import CustomTextField from "../custom_components/CustomTextField";
import CustomTypography from "../custom_components/CustomTypography";
import CardHeader from "@mui/material/CardHeader";
import { toast } from "react-hot-toast"
import { updateProfile } from "../../redux/slices/authSlice";
import { CustomToast } from "../custom_components/CustomToast";

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export default function PersonalCard() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const userInfo = auth.user;
    const [success, setSuccess] = useState(false);
    const [exists, setExists] = useState(false);
    const [editMode, setEditMode] = useState(false); 
    const [passwordChangeMode, setPasswordChangeMode] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [userData, setUserData] = useState({
        token: auth.accessToken,
        username: userInfo.username,
        gmail: userInfo.gmail,
        avatar: userInfo.avatar,
        oldpass: '',
        newpass: ''
    });
    
    const [beforeUpdate, setBeforeUpdate] = useState({ ...userInfo });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleToggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            const maxSize = 1 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                toast.error('Only JPG and PNG', {
                    style: {
                      backgroundColor: "black",
                      color: "#fff"
                    }
                  });
                return;
            }

            if (file.size > maxSize) {
                toast.error('Size too large', {
                    style: {
                      backgroundColor: "black",
                      color: "#fff"
                    }
                  }
                );
                return;
            }

            try {
                const base64 = await convertToBase64(file);
                
                setUserData(prev => ({
                    ...prev,
                    avatar: base64
                }));
            } catch (error) {
                console.error("Error convert image:", error);
                toast.error("Error occurs while converting image", {
                    style: {
                      backgroundColor: "black",
                      color: "#fff"
                }
                });
            }
        }
    };

    const handleChangePass = () => {
        setPasswordChangeMode(!passwordChangeMode);
        // Reset password visibility when switching modes
        setShowOldPassword(false);
        setShowNewPassword(false);
    };

    // Save changes
    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            // Check if any changes were made to user info
            if (
                userData.username === beforeUpdate.username && 
                userData.gmail === beforeUpdate.gmail && 
                userData.avatar === beforeUpdate.avatar &&
                (!passwordChangeMode || (userData.oldpass === '' && userData.newpass === ''))
            ) {
                setExists(true);
                setEditMode(false);
                setPasswordChangeMode(false);
                return;
            }
            
            dispatch(updateProfile(userData)); 
            console.log("User data after update: ", auth.user);
            setSuccess(true);
            setEditMode(false);
            setPasswordChangeMode(false);
            setBeforeUpdate({ 
                ...userData,
                avatar: userData.avatar 
            }); 
        } catch (error) {
            console.error("Error updating profile:", error); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div style={{margin:'1rem 8rem 1.5rem 8rem'}}>
            <CustomToast onClose={() => setExists(false)} onOpen={exists} message={"Nothing changed!"} />
            <CustomToast onClose={() => setSuccess(false)} onOpen={success} message={"Profile updated!"} />
            <Card sx={{ 
                display: "flex", 
                flexDirection: "row", 
                padding: "1rem", 
                alignItems: "center", 
                border:"1px solid black", 
                borderRadius:0, 
                boxShadow:'0px 4px 12px rgba(0, 0, 0, 0.5)' 
            }}>
                {/* Avatar Section with Upload Option */}
                <Box sx={{ position: 'relative', marginRight: "1rem" }}>
                    <Avatar 
                        src={userData.avatar} 
                        alt="Avatar" 
                        variant="square" 
                        sx={{ 
                            width: "100px", 
                            height: "100px", 
                            opacity: editMode ? 0.7 : 1 
                        }} 
                    />
                    {editMode && (
                        <>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="avatar-upload-button"
                                type="file"
                                onChange={handleAvatarUpload}
                            />
                            <label 
                                htmlFor="avatar-upload-button"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                Upload
                            </label>
                        </>
                    )}
                </Box>

                <Box sx={{ flex: 1 }}>
                    <CardHeader 
                        sx={{p:0, paddingLeft:1}} 
                        titleTypographyProps={{ fontSize: '1.25rem', fontWeight:'bold'}} 
                        title={passwordChangeMode ? "Change Password" : "Your Information"} 
                    />
                    <CardContent>
                        {!passwordChangeMode && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {/* Username */}
                                <CustomTextField
                                    size="small"
                                    value={userData.username}
                                    label="Username"
                                    name="username"
                                    variant={editMode ? "filled" : "outlined"}
                                    editmode={editMode.toString()}
                                    
                                />
                                {/* gmail */}
                                <CustomTextField
                                    size="small"
                                    label="Email"
                                    name="gmail"
                                    value={userData.gmail}
                                    onChange={handleChange}
                                    editmode={editMode.toString()}
                                    variant={editMode ? "filled" : "outlined"}
                                    InputProps={{
                                        readOnly: !editMode,
                                    }}
                                />
                            </Box>
                        )}

                        {passwordChangeMode && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {/* Old password */}
                                <CustomTextField
                                    size="small"
                                    label="Old password"
                                    name="oldpass"
                                    editmode={passwordChangeMode.toString()}
                                    type={showOldPassword ? "text" : "password"}
                                    onChange={handleChange}
                                    variant="filled"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle old password visibility"
                                                    onClick={handleToggleOldPasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showOldPassword ? <VisibilityOff style={{color:'white'}} /> : <Visibility style={{color:'white'}}/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* New Password */}
                                <CustomTextField
                                    size="small"
                                    label="New password"
                                    name="newpass"
                                    editmode={passwordChangeMode.toString()}
                                    type={showNewPassword ? "text" : "password"}
                                    onChange={handleChange}
                                    variant="filled"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle new password visibility"
                                                    onClick={handleToggleNewPasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff style={{color:'white'}} /> : <Visibility style={{color:'white'}}/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        )}
                    </CardContent>

                    <CardActions>
                        {!editMode && !passwordChangeMode ? (
                            <>
                                <CustomButton variant="outlined" onClick={() => setEditMode(true)}>
                                    Edit Info
                                </CustomButton>
                                <CustomButton onClick={handleChangePass} variant="contained" color="error">
                                    Change Password
                                </CustomButton>
                            </>
                        ) : passwordChangeMode ? (
                            <CustomButton 
                                variant="contained" 
                                color="success" 
                                onClick={handleSaveChanges}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Password"}
                            </CustomButton>
                        ) : (
                            <CustomButton 
                                variant="contained" 
                                color="success" 
                                onClick={handleSaveChanges}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </CustomButton>
                        )}
                    </CardActions>
                </Box>
            </Card>
        </div>
    );
}