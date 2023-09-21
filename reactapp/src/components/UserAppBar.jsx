import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const UserAppBar = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Function to check if a button is selected based on the current route
  const isButtonSelected = (route) => {
    return location.pathname.includes(route);
  };

  const Logout = () => {
    navigate(`/Login`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Button Container for Centered Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Button
              color={isButtonSelected(`/HomePage/UniversityList/${props.id}`) ? 'secondary' : 'inherit'}
              onClick={() => navigate(`/HomePage/UniversityList/${props.id}`)}
              sx={{
                ...(isButtonSelected(`/HomePage/UniversityList/${props.id}`)
                  ? { backgroundColor: 'secondary.main', color: 'white', boxShadow: 4 }
                  : {}),
              }}
            >
              Institute
            </Button>
            <Button
              color={isButtonSelected(`/HomePage/RegisteredCourses/${props.id}`) ? 'secondary' : 'inherit'}
              onClick={() => navigate(`/HomePage/RegisteredCourses/${props.id}`)}
              sx={{
                ...(isButtonSelected(`/HomePage/RegisteredCourses/${props.id}`)
                  ? { backgroundColor: 'secondary.main', color: 'white', boxShadow: 4 }
                  : {}),
              }}
            >
              Registered Course
            </Button>
          </div>

          {/* Logout Button */}
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserAppBar;
