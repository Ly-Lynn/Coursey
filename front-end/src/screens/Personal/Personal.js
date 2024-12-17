import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { hostName, API_ENDPOINTS } from "../../config/env";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStudySuccess, updateCurrentStudyFailure, updateCompletedStudySuccess, updateCompletedStudyFailure } from "../../redux/slices/serverSlice";

import PersonalCard from "../../components/personal/PersonalCard";
import MyLearning from "../../components/personal/MyLearning";
import NavBarAuth from "../../components/header/navBar/navBarAuth_";
import Header from "../../components/header/header/header_";
import LoadingFallback from "../../components/fallback/LoadingFallBack";
import CustomButton from "../../components/custom_components/CustomButton";

export default function Personal() {
    const dispatch = useDispatch();
    const currentStudy = useSelector((state) => state.server.currentStudy);
    const completedStudy = useSelector((state) => state.server.completedStudy);
    const auth = useSelector((state) => state.auth);
    const user = auth.user
    // console.log("User: ", user);
    const token = auth.accessToken;
    
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    const [progress, setProgress] = React.useState(true);
    const [completed, setCompleted] = React.useState(false);

    const handleProgressClick = () => {
        setProgress(true);
        setCompleted(false);
    }
    const handleCompletedClick = () => {
        setProgress(false);
        setCompleted(true);
    }


    return (
        <div>
            <Header/>
            <PersonalCard />
            <ButtonGroup style={{marginLeft:"3rem"}}>
                <CustomButton variant={progress ? "contained":"outlined"} color="primary" onClick={handleProgressClick}>In progress</CustomButton>
                <CustomButton variant={completed ? "contained":"outlined"} color="primary" onClick={handleCompletedClick}>Completed</CustomButton>
            </ButtonGroup>
            <MyLearning isCompleted={completed}/>
            
        </div>
    );

}
