import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
const defaultTheme = createTheme();

export default function SignUp() {
  const [roleError, setRoleError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateMobile = (mobile) => {
    const mobileRegex = /^(\+[0-9]{1,3})?([0-9]{10})$/;
    return mobileRegex.test(mobile);
  };

  const validatePasswords = (password, reEnterPassword) => {
    return password === reEnterPassword && password !== '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    switch (fieldName) {
      case 'role':
        setRoleError(false);
        break;
      case 'email':
        setEmailError(false);
        break;
      case 'username':
        setUserNameError(false);
        break;
      case 'mobileNumber':
        setMobileNumberError(false);
        break;
      case 'password':
        setPasswordError(false);
        break;
      case 'confirmPassword':
        setPasswordError(false);
        break;
      default:
        break;
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const signUpData = {};

  //   if (!data.get('role')) {
  //     setRoleError(true);
  //     return;
  //   }

  //   if (!validateEmail(data.get('email'))) {
  //     setEmailError(true);
  //     return;
  //   }

  //   if (!data.get('username')) {
  //     setUserNameError(true);
  //     return;
  //   }

  //   if (!validateMobile(data.get('mobileNumber'))) {
  //     setMobileNumberError(true);
  //     return;
  //   }

  //   if (!validatePasswords(data.get('password'), data.get('confirmPassword'))) {
  //     setPasswordError(true);
  //     return;
  //   }

  //   for (const [key, value] of data.entries()) {
  //     signUpData[key] = value;
  //   }

  //   console.log(signUpData);
  //   navigate(`/`);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signUpData = {};

    if (!data.get('role')) {
      setRoleError(true);
      return;
    }

    if (!validateEmail(data.get('email'))) {
      setEmailError(true);
      return;
    }

    if (!data.get('username')) {
      setUserNameError(true);
      return;
    }

    if (!validateMobile(data.get('mobileNumber'))) {
      setMobileNumberError(true);
      return;
    }

    if (!validatePasswords(data.get('password'), data.get('confirmPassword'))) {
      setPasswordError(true);
      return;
    }

    for (const [key, value] of data.entries()) {
      signUpData[key] = value;
    }

    // Make an Axios API call based on the selected role
    // const apiEndpoint = signUpData.role === 'admin' ? '/admin/signup' : '/user/signup';
    const apiEndpoint = 'https://8080-aceabfccabfeebedecececeaeaadbdbabf.premiumproject.examly.io/user/add';

    axios
      .post(apiEndpoint, signUpData)
      .then((response) => {
        console.log(response.data); // Handle success
        navigate(`/login`);
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc', // Add border
            borderRadius: '8px', // Rounded corners
            padding: '16px', // Add padding
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Admin or User</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Admin or User"
                    name="role"
                    error={roleError}
                    helperText={roleError ? 'Please select a role' : ''}
                    onChange={handleInputChange} // Reset error on change
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={emailError ? 'Please enter a valid email' : ''}
                  onChange={handleInputChange} // Reset error on change
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                label="Enter Username"
                id="username"
                
                error={userNameError}
                helperText={userNameError ? 'Please enter a username' : ''}
                onChange={handleInputChange}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mobileNumber"
                  label="Enter Mobile Number"
                  id="mobileNumber"
                  autoComplete="mobileNumber"
                  error={mobileNumberError}
                  helperText={mobileNumberError ? 'Please enter a valid mobile number' : ''}
                  onChange={handleInputChange} // Reset error on change
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange} // Reset error on change
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm password"
                  error={passwordError}
                  helperText={passwordError ? 'Passwords do not match' : ''}
                  onChange={handleInputChange} // Reset error on change
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              id="submitButton"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <span>Already a user ? </span>
                <Link to="/Login" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
