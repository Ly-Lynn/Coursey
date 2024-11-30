import { Container, LeftText, RightText, HighlightText } from "../custom_components/CustomIntroText"; // Import các styled components đã tạo
import { styled } from "@mui/material";

const ThisContainer = styled(Container)({
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    fontSize:'1.9rem',
    flexDirection: "row",
    marginTop:0,
});

const ThisLeftText = styled(LeftText)({
    paddingLeft: "1rem",
});

const ThisRightText = styled(RightText)({
    paddingLeft: 0,
    paddingRight:'1rem',
    paddingBottom: 0,
});

export default function BigHostText() {
    return (
        <ThisContainer>
            <ThisLeftText>
            Lecturers from <HighlightText>top universities</HighlightText>
            </ThisLeftText>
            <ThisRightText>
                full of experiences
            </ThisRightText>
        </ThisContainer>
    );
}
