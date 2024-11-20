import React, { useState, useEffect } from "react";
import { Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText } from "@mui/material";
    import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from "@mui/material/styles";
import { Bold } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";

const BannerInfoButton = styled(Button)({
    border: 0,
    borderRadius: 0,
    marginTop: "1rem",
    width: "80%", 
    color: "white",
    backgroundColor: "black",
    fontWeight: "bold",
});

const BannerInfoIcon = styled(IconButton)({
    marginTop: "1rem",
    marginLeft: "1rem",
    color: "black",
    // width: "20%",
})

const BannerCard = styled(Card)({
    border: "2px solid white",
    borderRadius: 0,
});
const InfoBanner = ({
    course_id = 101,
    title="Course Title", 
    lecturer_name = "John Doe",
    image="image.png", 
    cost="0.00", 
    hours=0 
}) => {
    const [exists, setExists] = useState(false);
    console.log(course_id, title, lecturer_name, image, cost, hours);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.user.orders);
    const navigate = useNavigate();
    const handleAddItem = () => {
        if (orders.some(order => order.course_id === course_id)) {
            setExists(true);
            return;
        }
        dispatch({ type: 'user/addOrder', payload: {course_id: course_id, 
                                                    course_name: title, 
                                                    lecturer_name:lecturer_name, 
                                                    cost: cost, 
                                                    image: image}});
    }

    const handleBuyNow = () => {
        
        navigate(`/checkout?buynow=${course_id}`);
    };
    return (
        <div>
        <Snackbar
            open={exists}
            autoHideDuration={1200}
            onClose={() => setExists(false)}
            message="Course already exists in cart"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            variant="filled"
            sx={{
                '& .MuiSnackbarContent-root': {
                  backgroundColor: '#FF6161', 
                  color: 'white', 
                  fontSize: '16px', 
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                },
              }}
        />
        <BannerCard sx={{maxWidth: 330}}>
            <CardMedia 
                component="img"
                height="200"
                image={image}    
                alt={title}
            />
            
            <CardContent>
                <Typography variant="h4" component="div" sx={{fontWeight:"bold"}}>
                    ${cost}
                </Typography>
                <div>
                    <BannerInfoButton 
                        variant="contained" 
                        color="primary"
                        onClick={handleBuyNow}>
                        Buy Now
                    </BannerInfoButton>
                    <BannerInfoIcon onClick={handleAddItem} color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </BannerInfoIcon>
                </div>
                <Typography variant="subtitle1" color="text.secondary" sx={{margin:"0.5rem", fontWeight:"bold"}}>
                    This course includes:
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${hours} hours of video`} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <PhoneIphoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Can access with phone and TV" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <AllInclusiveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Infinite access" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <EmojiEventsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Certificate award" />
                        </ListItem>
                    </List>
                </Typography>
                
            </CardContent>
        </BannerCard>
        </div>
    );
}

export default InfoBanner;