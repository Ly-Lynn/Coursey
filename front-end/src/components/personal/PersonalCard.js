import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Card, 
    Avatar, 
    CardContent, 
    CardActions,
    Box,
    Snackbar
} from "@mui/material";
import CustomButton from "../../components/custom_components/CustomButton";
import CustomTextField from "../custom_components/CustomTextField";
import CustomTypography from "../custom_components/CustomTypography";
import CardHeader from "@mui/material/CardHeader";
import { toast } from "react-hot-toast"
import { updateProfile } from "../../redux/slices/authSlice";
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

    const [exists, setExists] = useState(false);
    const [editMode, setEditMode] = useState(false); 
    const [userData, setUserData] = useState({
        token: auth.accessToken,
        username: userInfo.username,
        gmail: userInfo.gmail,
        avatar: userInfo.avatar
    });
    
    const [beforeUpdate, setBeforeUpdate] = useState({ ...userInfo });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                toast.error('Chỉ chấp nhận file JPEG và PNG');
                return;
            }

            if (file.size > maxSize) {
                toast.error('Kích thước file phải nhỏ hơn 5MB');
                return;
            }

            try {
                const base64 = await convertToBase64(file);
                
                setUserData(prev => ({
                    ...prev,
                    avatar: base64
                }));
            } catch (error) {
                console.error("Lỗi chuyển đổi hình ảnh:", error);
                toast.error("Không thể tải hình ảnh. Vui lòng thử lại.");
            }
        }
    };

    // Save changes
    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            console.log("User data before update: ", beforeUpdate.avatar, userData.avatar);
            if (
                userData.username === beforeUpdate.username && 
                userData.gmail === beforeUpdate.gmail && 
                userData.avatar === beforeUpdate.avatar
            ) {
                setExists(true);
                setEditMode(false);
                return;
            }
            
            dispatch(updateProfile(userData)); 
            console.log("User data after update: ", auth.user);
            
            setEditMode(false);
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
            <Snackbar
                open={exists}
                autoHideDuration={1200}
                onClose={() => setExists(false)}
                message="Nothing changed!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: '#000', 
                        color: 'white', 
                        fontSize: '16px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                }}
            />
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
                        title="Your Information" 
                    />
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
                            {/* gmail */}
                            <CustomTextField
                                size="small"
                                label="gmail"
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