import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Carousel } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff, Error, Close } from '@mui/icons-material';
import { GitHub, Google } from '@mui/icons-material'; 
import { Toaster, toast} from 'react-hot-toast';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../assests/colors';
import './auth.modul.css';
import CustomButton from '../custom_components/CustomButton';
import CustomTextField from '../custom_components/CustomTextField';

function SignUp({ onClose, onSwitchToSignIn }) {

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRepeatPassword, setUserRepeatPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const ErrorIcon = () => <Error style={{ fontSize: '37px', color: 'red' }} />;
  const WarningIcon = () => <Error style={{ fontSize: '37px', color: 'yellow' }} />;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleRegister = async () => {    
    // If any field is empty, show warning
    if (!userName || !userEmail || !userPassword || !userRepeatPassword) {
      toast.error('Please fill all fields',
        { duration: 3000, position: 'top-center', 
          style: { width:'100%', height:'100%', fontSize:'25px' }, 
          icon: <WarningIcon /> });
      return;
    }
    // If email is not valid, show warning
    if (!userEmail.includes('@') || !userEmail.includes('.')) {
      toast.error('Please enter a valid email',
        { duration: 3000, position: 'top-center', 
          style: { maxWidth:'200%', height:'100%', fontSize:'25px' }, 
          icon: <WarningIcon /> });
        return;
    }
    // If password is less than 8 characters and does not contain atleast 1 capital, 1 special character, show warning
    if (userPassword.length < 8 || !/[A-Z]/.test(userPassword) || !/[!@#$%^&*]/.test(userPassword)) {
      toast.error('Password must be at least 8 characters long and contain atleast 1 capital letter and 1 special character',
        { duration: 3000, position: 'top-center',
          style: { maxWidth:'200%', height:'100%', fontSize:'20px' }, 
          icon: <WarningIcon /> });
      return;
    }
    // If pasword and repeat password do not match, show error
    if (userPassword !== userRepeatPassword) {
      toast.error('Passwords do not match',
        { duration: 3000, position: 'top-center', 
          style: { width:'100%', height:'100%', fontSize:'25px' }, 
          icon: <ErrorIcon /> });
      return;
    }
    // If email is not verified, show warning
    if (!isEmailVerified) {
      toast.error('Please verify your email first',
        { duration: 3000, position: 'top-center', 
          style: { width:'100%', height:'100%', fontSize:'25px' }, 
          icon: <WarningIcon /> });
      return;
    }
    // If all fields are valid, register the user
    try {
      const response = await axios.post('/api/register', { name: userName, email: userEmail, password: userPassword });
      if (response.data.success) {
        toast.success('Registered successfully');
      } else {
        toast.error('Failed to register');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('An error occurred while registering');
    }
  };

  const handleSendOtp = async () => {
    const loadingToast = toast.loading('Sending OTP...'); 
    try {
      const response = await axios.post('/api/send-otp', { email: userEmail });
      if (response.data.success) {
        setOtpSent(true);
        toast.update(loadingToast, {
          render: 'OTP sent to your email', // Update toast message on success
          type: 'success',
          autoClose: 3000,
          isLoading: false,
        });
      } else {
        toast.update(loadingToast, {
          render: 'Failed to send OTP', 
          type: 'error',
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.update(loadingToast, {
        render: 'An error occurred while sending OTP',
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      const response = await axios.post('/api/verify-otp', { email: userEmail, otp });
      if (response.data.success) {
        setIsEmailVerified(true);
        toast.success('Email verified successfully');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred while verifying OTP');
    }
  };


  return (
    <Container 
      fluid 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: '100vh' }} 
    >
      <Toaster />
      <Card 
        className='text-black' 
        style={{ borderRadius: '0', width: '100%', maxWidth: '630px', padding: '15px', overflow: 'auto' }}
      >
        <div className='d-flex justify-content-end close-btn'>
          <Close  onClick={onClose} />
        </div>
        <Card.Body>
          <Row>
            <Col className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h3 fw-bold mb-2 mx-1 mx-md-4" style={{ color: "black" }}>SIGN UP</p> 
              <Row className="d-flex text-center justify-content-center mb-2"> 
                <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Sign up with</p>
                <ButtonGroup className="d-flex justify-content-center"> 
                  <Button
                    variant="outline-secondary"
                    style={{ marginRight: '5px', color: `${colors.primary.black_100}` }} 
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
                <Form.Group className="d-flex flex-row align-items-center mb-2"> 
                  <FontAwesomeIcon icon={faUser} className="me-2 fa-lg" style={{ color: "black" }} />
                  <Form.Floating className="flex-grow-1">
                    <CustomTextField
                        id='signup-name'
                        size="small"
                        sx={{ width: '100%' }}
                        editmode='false'
                        label="Username"
                        name="username"
                        variant="outlined"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />                    
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-2"> 
                  <FontAwesomeIcon icon={faEnvelope} className="me-2 fa-lg" style={{ color: "black" }} />
                  <Form.Floating className="flex-grow-1">
                    <CustomTextField
                      id='signup-mail'
                      size="small"
                      type='email'
                      sx={{ width: '100%' }}
                      editmode='false'
                      label="Email"
                      name="email"
                      variant="outlined"
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    /> 
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-2"> 
                  <FontAwesomeIcon icon={faLock} className="me-2 mb-4 fa-lg" style={{ color: "black" }} />
                  <Form.Floating className="flex-grow-1">
                    <CustomTextField
                      id='signup-pass'
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
                    <span onClick={handleTogglePassword} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '30%', transform: 'translateY(-50%)' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                    <Form.Text className="text-muted" style={{ fontSize: '0.7rem', marginLeft:'1rem' }}>
                      Password must have more than 8 characters and contain at least 1 capital letter and 1 special character.
                    </Form.Text>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-2">
                  <FontAwesomeIcon icon={faKey} className="me-2 fa-lg" style={{ color: "black"}} />
                  <Form.Floating className="flex-grow-1">
                  <CustomTextField
                      id='signup-repeat' 
                      size="small"
                      editmode='false'
                      label="Repeat Password"
                      name="repeatpassword"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      type={showRepeatPassword ? 'text' : 'password'}
                      onChange={(e) => setUserRepeatPassword(e.target.value)}
                      required  
                    />
                    <span onClick={handleToggleRepeatPassword} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className='mb-2' style={{ position: 'relative' }}>
                  <CustomTextField
                      id='otp' 
                      style={{
                        width: '100%',
                        color: "black",
                      }}
                      size='small'
                      editmode='false'
                      label="OTP"
                      placeholder='Enter OTP'
                      name="otp"
                      variant="outlined"
                      disabled={!otpSent}
                  />
                  <CustomButton className='mb-2'
                    variant="contained"
                    onClick={otpSent ? handleOtpSubmit : handleSendOtp}
                    style={{ 
                      fontWeight: 'bold',position: 'absolute',
                      right: '0%', 
                      top: '50%',
                      transform: 'translateY(-50%)' }}
                  >
                    {otpSent ? 'Confirm' : 'Send OTP'}
                  </CustomButton>
                </Form.Group>

                {otpSent && (
                  <CustomButton className='mb-2'
                    variant="contained"
                    style={{
                      transform: 'translateY(-50%)',
                      fontSize: '0.8rem',
                    }}
                    onClick={() => setOtpSent(false)}
                    size='small'
                  >
                    Resend OTP
                  </CustomButton>
                )}

                <Form.Group className='mb-2'>
                  <Form.Check
                    style={{ fontWeight: 'bold', fontSize: '0.8rem' }}
                    type='checkbox'
                    id='remember-bx'
                    label='Remember me'
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                <CustomButton className='mb-2'
                    variant="contained"
                    style={{ fontWeight: 'bold' }}
                    onAbort={handleRegister}
                    size='medium'
                  >Register</CustomButton>
                </div>
                <div className="d-flex justify-content-center">
                  <Button 
                    style={{ 
                      color: "black", 
                      textTransform: 'none', 
                      textDecorationLine: 'underline',
                      fontSize: '0.8rem' 
                    }}
                    className='mb-4'
                    onClick={onSwitchToSignIn}
                  >Already have an account? Sign in</Button>
                </div>

              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>

  );
}

export default SignUp;
