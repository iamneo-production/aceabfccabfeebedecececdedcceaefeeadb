import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock'; // Lock icon
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // PersonAdd icon

const Auth = () => {
  const navigate = useNavigate();

  const companyName = "AdmitEasy"; // Suggested company name

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={3} border="1px solid #ccc" borderRadius={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to {companyName}
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Simplifying PG Admissions
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<LockIcon />} // Lock icon for Login
              onClick={() => navigate('/Login')}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<PersonAddIcon />} // PersonAdd icon for Sign Up
              onClick={() => navigate('/Signup')}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Auth;
