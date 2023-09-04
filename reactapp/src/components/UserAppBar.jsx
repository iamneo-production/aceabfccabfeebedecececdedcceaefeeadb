import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate ,useParams } from 'react-router-dom';

const UserAppBar = (props) => {
  const navigate = useNavigate();
  const Logout = () => {
    navigate(`/Login`);
  };
  const params =  useParams();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Button Container for Centered Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Button color="inherit" onClick={() => navigate(`/HomePage/UniversityList/${props.id}`)}>
              Institute
            </Button>
            <Button color="inherit" onClick={() => navigate(`/HomePage/RegisteredCourses/${props.id}`)}>
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
