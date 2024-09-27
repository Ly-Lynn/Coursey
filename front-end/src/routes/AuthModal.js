// src/components/AuthModal/AuthModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

const AuthModal = ({ 
    open = true, 
    onClose, 
    type = 'login' 
}) => {
  return (
    <div>Hello</div>
  )
};

export default AuthModal;
