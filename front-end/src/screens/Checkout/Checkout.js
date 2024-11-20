import React from "react";
import CheckoutUserForm from "../../components/checkout/CheckoutUserForm";
import CheckoutInfo from "../../components/checkout/CheckoutInfo";
import Header from "../../components/header/header/header_";

import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Checkout () {
    const dispatch = useDispatch();
    const { courseID } = useParams() || "";

    return (
        <div>
            <Header />
            {/* <Typography variant="h6" sx={{textAlign: "left", fontStyle:"", marginLeft:"12rem"}}>Checkout</Typography> */}
            <Box sx={{display:"flex", flexDirection:"row", padding:"0 10rem 0 10rem"}}>
                <CheckoutUserForm />
                <CheckoutInfo buynow={courseID}/>
            </Box>
        </div>
    );
}