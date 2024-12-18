import React from "react";
import CheckoutUserForm from "../../components/checkout/CheckoutUserForm";
import CheckoutInfo from "../../components/checkout/CheckoutInfo";
import Header from "../../components/header/header/header_";

import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Checkout () {
    const queryParams = new URLSearchParams(window.location.search);
    const courseID = queryParams.get('buynow');

    return (
        <div>
            <Header />
            <Box sx={{display:"flex", flexDirection:"row", padding:"0 10rem 0 10rem"}}>
                <CheckoutUserForm />
                <CheckoutInfo buynow={courseID}/>
            </Box>
        </div>
    );
}