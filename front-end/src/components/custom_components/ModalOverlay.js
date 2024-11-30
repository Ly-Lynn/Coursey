import { styled } from "@mui/material";

const ModalOverlay = styled("div")({
    position: "fixed",
    zIndex: 9999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

export default ModalOverlay;