import React from "react";
import { Grid2 } from "@mui/material";
import MainStudy from "../../components/studyscreen/MainStudy";
import Header from "../../components/header/header/header_";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hostName, API_ENDPOINTS } from "../../config/env";
import { updateCourseSuccess, updateCourseFailure } from "../../redux/slices/serverSlice";
import { useState } from "react";
export default async function StudyScreen() {
    const queryParams = new URLSearchParams(window.location.search);
    const courseID = queryParams.get('courseID');
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const token = auth.accessToken;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    console.log("Course ID: ", courseID, auth.user.username);
    try {
        const response = await fetch(`${hostName}${API_ENDPOINTS.GET_LIST_VIDS}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: auth.user.username,
                courseID: courseID,
            }),
        });
        const vids = await response.json();
        console.log("Course: ", vids);
        // dispatch(updateCourseSuccess(course.message));
        setLoading(false);
    }
    catch (error) {
        console.error("Error updating course:", error);
        // dispatch(updateCourseFailure(error.message));
        setError(error.message);
        setLoading(false);
    }

    return (
        <Grid2 container>
            <Grid2 item xs={12}>
                <Header />
            </Grid2>
            <Grid2 item xs={12}>
                <MainStudy />
            </Grid2>
        </Grid2>
    );
}