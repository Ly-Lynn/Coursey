import React from "react";
import { Grid, Paper, Box } from "@mui/material";


import MainStudy from "../../components/studyscreen/MainStudy";
import Header from "../../components/header/header/header_";

export default function StudyScreen() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <MainStudy />
            </Grid>
        </Grid>
    );
}