import React from "react";
import { Select } from "@mui/material";

const navBarAuth_ = (userInfo) => {
    return (
        <div>
            <Select
                id=""
                value={10}
                label="Age"
            >
                <MenuItem value={10}>Account</MenuItem>
                <MenuItem value={20}></MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </div>
    )
}