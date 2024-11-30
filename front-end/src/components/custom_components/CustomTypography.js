import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const CustomTypography = styled("div")({
    fontFamily: "'Press Start 2P', system-ui",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "20px",
    lineHeight: 1.2,
    resize: "both", 
    "@media (max-width: 600px)": {
        fontSize: "5px",
    },
});

export default CustomTypography;