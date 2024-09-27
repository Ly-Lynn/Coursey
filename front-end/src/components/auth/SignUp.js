import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Carousel } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GitHub, Google } from '@mui/icons-material'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../assests/colors';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSendOtp = () => {
    // Logic to send OTP to user's email or phone number
    setOtpSent(true);
  };

  const handleOtpSubmit = () => {
    // Logic to verify OTP
    console.log('OTP submitted:', otp);
  };


  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className='text-black' style={{ borderRadius: '10px', width: '40%', maxWidth: '40%' }}>
        <Card.Body>
          <Row>
            <Col 
                className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4" style={{ color: `${colors.primary.green_100}` }}>Sign up</p>

              <Row className="d-flex text-center justify-content-center mb-4">
                <p style={{marginBottom:'0.5rem', fontWeight:'bold'}}>Sign up with</p>
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
                  <FontAwesomeIcon icon={faUser} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control id='signup-name' type='text' placeholder='Your Name'
                      style={{ color: `${colors.primary.green_100}` }} required />
                    <Form.Label htmlFor='signup-name'>Your Name</Form.Label>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control 
                        id='signup-mail' 
                        type='email' 
                        placeholder='Your Email' 
                        style={{ color: `${colors.primary.green_100}` }} />
                    <Form.Label htmlFor='signup-mail'>Your Email</Form.Label>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-4 position-relative">
                  <FontAwesomeIcon icon={faLock} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control
                      id='signup-pass'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      style={{ color: `${colors.primary.green_100}` }}
                    />
                    <Form.Label htmlFor='signup-pass'>Password</Form.Label>
                    <span onClick={handleTogglePassword} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faKey} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control 
                      id='signup-repeat' 
                      type={showRepeatPassword ? 'text' : 'password'} 
                      placeholder='Repeat your password' 
                      style={{ color: `${colors.primary.green_100}` }}
                    />
                    <Form.Label htmlFor='signup-repeat'>Repeat your password</Form.Label>
                    <span onClick={handleToggleRepeatPassword} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="mb-3" style={{ position: 'relative' }}>
                    <Form.Control
                        id='otp'
                        type='text'
                        placeholder='Enter OTP'
                        style={{
                        color: `${colors.primary.green_100}`,
                        paddingRight: '100px', 
                        }}
                        disabled={!otpSent}
                    />
                    <Button
                        variant="outlined"
                        style={{
                        fontWeight: 'bold',
                        backgroundColor: `${colors.primary.green_100}`,
                        color: 'white',
                        position: 'absolute',
                        right: '0%', 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        }}
                        size='medium'
                        onClick={handleSendOtp}
                    >
                        {otpSent ? 'Confirm' : 'Send OTP'}
                    </Button>
                </Form.Group>
                {otpSent && (
                        <Button
                        style={{
                            transform: 'translateY(-50%)',
                        }}
                        size='medium'
                        onClick={() => setOtpSent(false)}
                        >
                        Resend OTP
                        </Button>
                )}

                <Form.Group className='mb-4'>
                  <Form.Check
                    style={{ fontWeight: 'bold' }}
                    type='checkbox'
                    id='remember-bx'
                    label='Remember me'
                  />
                </Form.Group>
                
                

                <div className="d-flex justify-content-center">
                  <Button className='mb-2'
                    variant="outlined"
                    style={{ fontWeight: 'bold', color: `${colors.primary.green_100}` }}
                    size='large'
                  >Register</Button>
                </div>
                <div className="d-flex justify-content-center">
                  <Button 
                  style={{ 
                    color: `${colors.primary.green_100}`, 
                    textTransform: 'none', 
                    textDecorationLine: 'underline' }}
                    className='mb-4'
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
