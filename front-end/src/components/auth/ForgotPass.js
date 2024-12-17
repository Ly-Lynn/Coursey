import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { GitHub, Google } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../assests/colors';
import { toast, Toaster } from "react-hot-toast";
import './auth.modul.css';
import CustomButton from '../custom_components/CustomButton';
import CustomTextField from '../custom_components/CustomTextField';
import { hostName, API_ENDPOINTS } from '../../config/env';

function ForgotPass ({onClose,  onSwitchToSignIn }) {

  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleResetPass = async () => {
    try {
      const response = await fetch(`${hostName}${API_ENDPOINTS.RESET_PASSWORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail
      })
      });
      const result = await response.json();
      console.log('Reset Password result:', result);
      if (result.status === 404) {
        toast.error('Please check again your email',{
          style: {
            backgroundColor: "black",
            color: "#fff"
          }
        }
        );
      }
      else if (response.status === 200) {
      toast.success('We have sent you a mail for reseting the email!', {
            style: {
              backgroundColor: "black",
              color: "#fff"
            }
          }
        );
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }



  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Toaster />
      <Card className='text-black' style={{ borderRadius: '0', width: '40%', maxWidth: '40%' }}>
        <div className='d-flex justify-content-end close-btn'>
          <Close  onClick={onClose} />
        </div>
        <Card.Body>
          <Row>
            <Col className='d-flex flex-column align-items-center'>
              <p className="text-center mb-4 h1 fw-bold mb-3 mx-1 mx-md-4 mt-4" style={{ color: "black" }}>Forgot Password</p>
            <p className="text-center h6 mx-1 mx-md-4 mb-4" style={{ color: `${colors.primary.black_100}` }}>Enter your email to receive a reset mail</p>
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
                  <CustomButton sx={{marginLeft:'0.5rem'}} variant='contained' onClick={handleResetPass}>Reset Password!</CustomButton>

                </Form.Group>
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
