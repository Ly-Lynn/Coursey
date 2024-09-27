import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GitHub, Google } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from '../../assests/colors';

function SignIn() {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className='text-black' style={{ borderRadius: '10px', width: '40%', maxWidth: '40%' }}>
        <Card.Body>
          <Row>
            <Col className='d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4" style={{ color: `${colors.primary.green_100}` }}>Sign in</p>
              <Row className="d-flex text-center justify-content-center mb-4">
                <p style={{marginBottom:'0.5rem', fontWeight:'bold'}}>Sign in with</p>
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
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control 
                      id='signin-mail' 
                      type='email' 
                      placeholder='Your Email' 
                      style={{ color: `${colors.primary.green_100}` }} 
                      required 
                    />
                    <Form.Label htmlFor='signin-mail'>Your Email</Form.Label>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="d-flex flex-row align-items-center mb-4 position-relative">
                  <FontAwesomeIcon icon={faLock} className="me-3 fa-lg" style={{ color: `${colors.primary.green_100}` }} />
                  <Form.Floating className="flex-grow-1">
                    <Form.Control
                      id='signin-pass'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      style={{ color: `${colors.primary.green_100}` }}
                      required
                    />
                    <Form.Label htmlFor='signin-pass'>Password</Form.Label>
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
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button className='mb-2'
                    variant="outlined"
                    style={{ fontWeight: 'bold', color: `${colors.primary.green_100}` }}
                    size='large'
                  >Sign In</Button>
                </div>
                <div className="d-flex justify-content-center">
                  <Button 
                    style={{ 
                      color: `${colors.primary.green_100}`, 
                      textTransform: 'none', 
                      textDecorationLine: 'underline' }}
                    className='mb-4'
                  >Don't have an account? Sign up</Button>
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
