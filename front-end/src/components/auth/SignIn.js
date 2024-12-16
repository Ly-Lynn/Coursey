import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { GitHub, Google } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../assests/colors';
import './auth.modul.css';
import CustomButton from '../custom_components/CustomButton';
import CustomTextField from '../custom_components/CustomTextField';
import { Toaster, toast} from 'react-hot-toast';
import { loginUser, addCurrentCourses, addFinishedCourses } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn({onClose, onSwitchToSignUp, onSwitchToForgotPass }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isRemember, setIsRemember] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRemember = () => {
    setIsRemember(!isRemember);
  };

  const handleLogin = async () => {
    try {
      const userData = { username: userName, password: userPassword }; 
      const result = await dispatch(loginUser({ userData, isRemember })).unwrap();
      console.log('Login result:', result); 
      if (result.status === 401) {
        toast.error('Please check your username and password');
      }
      else if (result.status === 200) {
        // console.log('Login successfully');
        dispatch(addCurrentCourses(result.user));
        dispatch(addFinishedCourses(result.user)); 
        toast.success('Log in successfully');
        
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      toast.error('An error occurred while login');
    }
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className='text-black' style={{ borderRadius: '0', width: '40%', maxWidth: '40%' }}>
        <Toaster />
        <div className='d-flex justify-content-end close-btn'>
          <Close  onClick={onClose} />
        </div>
        <Card.Body>
          <Row>
            <Col className='d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4" style={{ color: 'black' }}>LOG IN</p>
              <Row className="d-flex text-center justify-content-center mb-4">
                <p style={{marginBottom:'0.5rem', fontWeight:'bold'}}>Log in with</p>
                <ButtonGroup className="d-flex justify-content-center"> 
                    <Button
                    variant="outline-secondary"
                    style={{ marginRight: '10px', color: `${colors.primary.black_100}` }}
                    onClick={() => { /* Logic for GitHub sign-up */ }}
                    >
                    <GitHub style={{ marginRight: '5px' }} />
                    </Button>
                    <Button
                    variant="outline-secondary"
                    style={{ color: "red" }}
                    onClick={() => { /* Logic for Google sign-up */ }}
                    >
                    <Google style={{ marginRight: '5px' }} />
                    </Button>
                    
                </ButtonGroup>
              </Row>

              <Form className="w-100">
                <Form.Group className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 fa-lg" style={{ color: "black" }} />
                  <Form.Floating className="flex-grow-1">
                    <CustomTextField
                        size="small"
                        sx={{ width: '100%' }}
                        editmode='false'
                        label="Username"
                        name="username"
                        variant="outlined"
                        required
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-4 position-relative">
                  <FontAwesomeIcon icon={faLock} className="me-3 fa-lg" style={{ color: "black" }} />
                  <Form.Floating className="flex-grow-1">
                    <CustomTextField
                        size="small"
                        editmode='false'
                        label="Password"
                        name="password"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required  
                    />
                    <span onClick={handleTogglePassword} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className='mb-4'>
                  <Form.Check
                    style={{ fontWeight: 'bold' }}
                    type='checkbox'
                    id='remember-bx'
                    label='Remember me'
                    checked={isRemember}
                    onChange={handleRemember}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <CustomButton className='mb-2'
                    variant="contained"
                    style={{ fontWeight: 'bold' }}
                    onClick={handleLogin}
                  >Sign In</CustomButton>
                </div>
                <div className="d-flex justify-content-center">
                  <Button 
                    style={{ 
                      color: "black", 
                      textTransform: 'none', 
                      textDecorationLine: 'underline' }}
                    className='mb-4'
                    onClick={onSwitchToSignUp}
                  >Don't have an account? Sign up</Button>
                  <Button 
                    style={{ 
                      color: "black", 
                      textTransform: 'none', 
                      textDecorationLine: 'underline' }}
                    className='mb-4'
                    onClick={onSwitchToForgotPass}
                  >Forgot your password?</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignIn;
