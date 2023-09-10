import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate ,useParams } from 'react-router-dom';

const AdminAppBar = (props) => {
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
            <Button id= "adminInstitute" color="inherit" onClick={() => navigate(`/AdminHomePage/UniversityList/${props.id}`)}>
              Institute
            </Button>
            <Button id= "adminCourse" color="inherit" onClick={() => navigate(`/AdminHomePage/Courses/${props.id}`)}>
              Course
            </Button>
            <Button id="adminStudents" color="inherit" onClick={() => navigate(`/AdminHomePage/Students/${props.id}`)}>
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
