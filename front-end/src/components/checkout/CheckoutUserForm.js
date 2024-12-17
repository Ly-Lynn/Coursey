import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { 
    Box,
    Paper,
    Grid,
    TextField,
    Typography,
    Button,
    Container,
    Divider,
    colors,
    InputLabel,
    Select,
    MenuItem,
    FormControl
  } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    color:"black",
    fontWeight:"bold",
    border: "2px solid black",
    borderRadius: 0,
    marginBottom: theme.spacing(3),
  }));

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black', 
    },
    '& label': {
        color:'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', 
      },
    },
    '& .MuiInputBase-input': {
      color: 'black', 
    },
  });

const StyledSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.8)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000',
    },
    '& .MuiSelect-select': {
        color: '#000', 
    },
    '& .MuiSvgIcon-root': {
        color: '#000', 
    },
    '& .MuiInputLabel-root': {        
        color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': {  
        color: '#000',
    }
});

const StyledMenuItem = styled(MenuItem)({
    '&.MuiMenuItem-root': {
        color: '#000',
    },
    '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&.Mui-selected:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});
  

export default function CheckoutUserForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const userId = user.user;
    const email = auth.user.gmail;

    const countryArray = ["United States", "Canada", "Germany", "France", "Japan", "Australia", "Brazil", "India", "South Korea", "Italy"]
    const [country, setCountry] = useState(null)
    
    
    
    const changeCountry = (event) => {
        setCountry(event.target.value)
    }

    return (
        <Container >
          <Box sx={{ width: '100%', mt: 4 }}>
            <StyledPaper elevation={3}>
              <Typography sx={{fontWeight:"bold"}} variant="h6" gutterBottom>
                Your Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    type="email"
                  
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <InputLabel sx={{color:'black'}}>Country</InputLabel>
                    <StyledSelect 
                        value={country}
                        label="Country"
                        autoWidth
                        onChange={changeCountry}
                    >
                        {countryArray.map((country) => (
                        <StyledMenuItem key={country} value={country}>{country}</StyledMenuItem>
                        ))}
                    </StyledSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </StyledPaper>
    
            <StyledPaper elevation={3}>
              <Typography sx={{fontWeight:"bold"}} variant="h6" gutterBottom>
                Payment Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField
                    required
                    id="cardNumber"
                    name="cardNumber"
                    label="Card Number"
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    required
                    id="expiryDate"
                    name="expiryDate"
                    label="Expiry Date"
                    fullWidth
                    variant="outlined"
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    required
                    id="cvv"
                    name="cvv"
                    label="CVV"
                    fullWidth
                    variant="outlined"
                    type="password"
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    required
                    id="cardholderName"
                    name="cardholderName"
                    label="Cardholder Name"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Box>
        </Container>
      );

}