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

const CustomButton = styled(Button)(({ variant }) => ({
    borderRadius: 0,
    // textTransform: 'none',
    transition: 'all 0.2s ease',
    
    ...(variant === 'contained' && {
      backgroundColor: '#000',
      color: 'white',
      '&:hover': {
        backgroundColor: '#333',
      },
    }),
  
    ...(variant === 'outlined' && {
      backgroundColor: 'white',
      color: '#000',
      border: '1px solid #000',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        border: '1px solid #000',
      },
    }),
  }));

export default function Personal() {
    const dispatch = useDispatch();
    const currentStudy = useSelector((state) => state.server.currentStudy);
    const completedStudy = useSelector((state) => state.server.completedStudy);
    const auth = useSelector((state) => state.auth);
    const user = auth.user
    const userID = user.id;
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

    useEffect(() => {
        const fetchCurrentStudy = async () => {
            try {
                // const currentStudy = await axios.post(`${hostName}${API_ENDPOINTS.GET_CURRENT_STUDY}`, {
                //     headers: {
                //         "Content-Type": "application/json",
                //         "Authorization": `Bearer ${token}`,
                //     },
                //     params: {
                //         userID: userID,
                //     },
                // });
                const currentStudy = await axios.get(`/dummy_data/currentStudy.json`);
                // console.log("Current Study: ", currentStudy.data);
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
                // const completedStudy = await axios.post(`${hostName}${API_ENDPOINTS.GET_COMPLETED_STUDY}`, {
                //     headers: {
                //         "Content-Type": "application/json",
                //         "Authorization": `Bearer ${token}`,
                //     },
                //     params: {
                //         userID: userID,
                //     },
                // });
                const completedStudy = await axios.get(`/dummy_data/completedStudy.json`);
                // console.log("Completed Study: ", completedStudy.data);
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
    }, [dispatch]);

    if (loading) {
        return <LoadingFallback />;
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
