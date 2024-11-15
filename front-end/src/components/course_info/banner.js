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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

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
    title="Course Title", 
    image="image.png", 
    cost="0.00", 
    hours=0 
}) => {
    // console.log(image, cost, hours);
    return (
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
                        color="primary">
                        Buy Now
                    </BannerInfoButton>
                    <BannerInfoIcon color="primary" aria-label="add to shopping cart">
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
    );
}

export default InfoBanner;