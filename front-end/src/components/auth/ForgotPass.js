import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { GitHub, Google } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../assests/colors';
import axios from 'axios';
import { toast } from 'react-toastify';
import './auth.modul.css';

function ForgotPass ({onClose,  onSwitchToSignIn }) {

  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
  const handleOtpSubmit = () => {
    // Logic to verify OTP
    console.log('OTP submitted:', otp);
  };


  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className='text-black' style={{ borderRadius: '10px', width: '40%', maxWidth: '40%' }}>
        <div className='d-flex justify-content-end close-btn'>
          <Close  onClick={onClose} />
        </div>
        <Card.Body>
          <Row>
            <Col className='d-flex flex-column align-items-center'>
              <p className="text-center mb-4 h1 fw-bold mb-3 mx-1 mx-md-4 mt-4" style={{ color: `${colors.primary.green_100}` }}>Forgot Password</p>
            <p className="text-center h6 mx-1 mx-md-4 mb-4" style={{ color: `${colors.primary.black_100}` }}>Enter your email to receive a OTP</p>
              <Form className="w-100">
                <Form.Group className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control 
                      id='forget-mail' 
                      type='email' 
                      placeholder='Your Email' 
                      style={{ color: `${colors.primary.green_100}` }} 
                      onChange={(e) => setUserEmail(e.target.value)}  
                      required 
                    />
                    <Form.Label htmlFor='forget-mail'>Your Email</Form.Label>
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
                <div className="d-flex justify-content-center">
                  <Button 
                  style={{ 
                    color: `${colors.primary.green_100}`, 
                    textTransform: 'none', 
                    textDecorationLine: 'underline' }}
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

export default ForgotPass;
