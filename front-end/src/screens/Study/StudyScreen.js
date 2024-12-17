import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MainStudy from "../../components/studyscreen/MainStudy";
import Header from "../../components/header/header/header_";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hostName, API_ENDPOINTS } from "../../config/env";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { initialCurrentVids } from "../../redux/slices/userSlice";

export default function StudyScreen() {
    const queryParams = new URLSearchParams(window.location.search);
    const courseID = queryParams.get('courseID');
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const token = auth.accessToken;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [vids, setVids] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Course ID: ", courseID, auth.user.username, auth.user.id);

                const response = await fetch(`${hostName}${API_ENDPOINTS.GET_LIST_VIDS}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`,
                    },
                    body: JSON.stringify({
                        username: auth.user.username,
                        courseID: courseID,
                        userID: auth.user.id
                    }),
                });

                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Course: ", data.message);
                dispatch(initialCurrentVids(data.message)); 
                setLoading(false);
            } catch (error) {
                console.error("Error updating course:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [auth.user.username, auth.user.id, courseID, token]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <MainStudy courseID={courseID} /> 
            </Grid>
        </Grid>
    );
}
