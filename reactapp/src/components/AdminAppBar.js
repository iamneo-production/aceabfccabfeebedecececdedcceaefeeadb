import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdminAppBar = (props) => {
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
              id="adminInstitute"
              color={isButtonSelected(`/AdminHomePage/UniversityList/${props.id}`) ? 'secondary' : 'inherit'}
              onClick={() => navigate(`/AdminHomePage/UniversityList/${props.id}`)}
            >
              Institute
            </Button>
            <Button
              id="adminAllCourses"
              color={isButtonSelected(`/AdminHomePage/AllCourses/${props.id}`) ? 'secondary' : 'inherit'}
              onClick={() => navigate(`/AdminHomePage/AllCourses/${props.id}`)}
            >
              All Courses
            </Button>
            <Button
              id="adminStudents"
              color={isButtonSelected(`/AdminHomePage/Students/${props.id}`) ? 'secondary' : 'inherit'}
              onClick={() => navigate(`/AdminHomePage/Students/${props.id}`)}
            >
              Students
            </Button>
          </div>

          {/* Logout Button */}
          <Button id="Logout" color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminAppBar;
