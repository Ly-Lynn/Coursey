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
import CustomButton from '../custom_components/CustomButton';
import CustomTextField from '../custom_components/CustomTextField';

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
      <Card className='text-black' style={{ borderRadius: '0', width: '40%', maxWidth: '40%' }}>
        <div className='d-flex justify-content-end close-btn'>
          <Close  onClick={onClose} />
        </div>
        <Card.Body>
          <Row>
            <Col className='d-flex flex-column align-items-center'>
              <p className="text-center mb-4 h1 fw-bold mb-3 mx-1 mx-md-4 mt-4" style={{ color: "black" }}>Forgot Password</p>
            <p className="text-center h6 mx-1 mx-md-4 mb-4" style={{ color: `${colors.primary.black_100}` }}>Enter your email to receive a OTP</p>
              <Form className="w-100">
                <Form.Group className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 fa-lg" style={{ color: "black" }} />
                  <Form.Floating className="flex-grow-1">
                    <CustomTextField
                        id='forget-mail' 
                        size="small"
                        sx={{ width: '100%' }}
                        editmode='false'
                        label="Your Email"
                        name="email"
                        variant="outlined"
                        onChange={(e) => setUserEmail(e.target.value)} 
                        required
                      />                    
                  </Form.Floating>
                </Form.Group>
                <Form.Group className="mb-3" style={{ position: 'relative' }}>
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
                      onClick={handleSendOtp}
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
                <div className="d-flex justify-content-center">
                  <Button 
                  style={{ 
                    color: "black", 
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
