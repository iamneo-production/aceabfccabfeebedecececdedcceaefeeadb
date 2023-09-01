import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link , useNavigate} from 'react-router-dom';
import BackgroundWrapper from '../../BackgroundWrapper'; 

const defaultTheme = createTheme();


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

   
    console.log('Submitted:', email, password);
    //Write logic for response 
    const userId = 1 // get this from backend response
    navigate(`/HomePage/${userId}`);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Clear email error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false); // Clear password error when user starts typing
  };

  return (
    <BackgroundWrapper>
    
    <ThemeProvider theme={defaultTheme}>
      
    <Container style={{ borderRadius: '2px', marginLeft: '800px', backgroundColor: 'white' }} component="main" maxWidth="xs">

  
        <CssBaseline />
              <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px', // Add padding here
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, p : 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? 'Please enter a valid email address' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? 'Password cannot be empty' : ''}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="loginButton"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
            
              <Grid item>
                <Link to="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
   
    </ThemeProvider>
    </BackgroundWrapper>
   
  );
};

export default Login;
