import { styled } from '@mui/material';
import BigHostText from './text';
import BigHostLogo from './logos';

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    // gap: '50px',
    marginTop:0,
    height: '9.7vw',
    flexDirection: 'row',
});

export default function BigHostIntro() {
    return (
        <Container>
            <BigHostLogo/>
            <BigHostText/>
        </Container>
    )
}