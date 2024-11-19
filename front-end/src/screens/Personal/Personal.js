import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@mui/material";
import { hostName, API_ENDPOINTS } from "../../config/env";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStudySuccess, updateCurrentStudyFailure, updateCompletedStudySuccess, updateCompletedStudyFailure } from "../../redux/slices/serverSlice";

import PersonalCard from "../../components/personal/personalCard";
import MyLearning from "../../components/personal/MyLearning";
import NavBarAuth from "../../components/header/navBar/navBarAuth_";

export default function Personal() {
    const dispatch = useDispatch();
    const currentStudy = useSelector((state) => state.server.currentStudy);
    const completedStudy = useSelector((state) => state.server.completedStudy);
    const auth = useSelector((state) => state.auth);
    const user = auth.user
    const userID = user.id;
    const token = auth.accessToken;
    useEffect(() => {
        const fetchCurrentStudy = async () => {
            try {
                const currentStudy = await axios.post(`${hostName}${API_ENDPOINTS.GET_CURRENT_STUDY}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    params: {
                        userID: userID,
                    },
                });
                console.log("Current Study: ", currentStudy.data);
                dispatch(updateCurrentStudySuccess(currentStudy.data));
                setLoading(false);
            } catch (error) {
                dispatch(updateCurrentStudyFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchCompletedStudy = async () => {
            try {
                const completedStudy = await axios.post(`${hostName}${API_ENDPOINTS.GET_COMPLETED_STUDY}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    params: {
                        userID: userID,
                    },
                });
                console.log("Completed Study: ", completedStudy.data);
                dispatch(updateCompletedStudySuccess(completedStudy.data));
                setLoading(false);
            } catch (error) {
                dispatch(updateCompletedStudyFailure(error.message));
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCompletedStudy();
        fetchCurrentStudy();
    }, [dispatch, userID]);

    return (
        <div>
            <NavBarAuth userAva={user.ava} userId={user.id} userName={user.username}/>
            <PersonalCard />
            <ButtonGroup>
                <Button  color="primary" >In progress</Button>
                <Button  color="primary" >Completed</Button>
            </ButtonGroup>
            
            
        </div>
    );

}
