import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, 
        Box,
        Paper,
        ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hostName, API_ENDPOINTS } from "../../config/env";

import CompletedCard from "./CompletedCard";
import InProgressCard from "./InProgressCard";

export default function MyLearning(isCompleted=false) {
    const dispatch = useDispatch();
    const server = useSelector((state) => state.server);
    const completedCourses = server.completedStudy;
    const currentCourses = user.currentStudy;
    
    return (
        <div>
            <Paper>
                <Box sx={{display:"flex", flexDirection:"row", padding:"0 10rem 0 10rem"}}>
                    {isCompleted ? completedCourses.map((course) => {
                        return <CompletedCard />
                    }) : currentCourses.map((course) => {
                        return <InProgressCard />
                    })}
                </Box>
            </Paper>
        </div>
    );

}