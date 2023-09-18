
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAppBar from '../../UserAppBar';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import Footer from '../../Footer';
import axios from 'axios';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  flex: '1',
  textAlign: 'left',
};

const RegisteredCourses = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const params = useParams();
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
  const [editStudentData, setEditStudentData] = useState({
    studentName: '',
    studentDOB: '',
    address: '',
    mobile: '',
    eligibility: 'Eligible',
  });

  // Separate state for SSLC, HSC, and Diploma
  const [SSLC, setSSLC] = useState(0);
  const [HSC, setHSC] = useState(0);
  const [Diploma, setDiploma] = useState(0);

  const handleViewActivityClick = () => {
    console.log('View Activity button clicked');
  };

  const handleEditClick = (admissionId) => {
    // Fetch student data by admissionId and populate the form
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/getStudent/${params.userId}`)
      .then((response) => {
        const studentData = response.data;
        setEditStudentData({
          studentName: studentData.studentName || '',
          studentDOB: studentData.studentDOB || '',
          address: studentData.address || '',
          mobile: studentData.mobile || '',
          eligibility: studentData.eligibility || 'Eligible',
        });

        // Set SSLC, HSC, and Diploma states separately
        setSSLC(studentData.sslc || 0);
        setHSC(studentData.hsc || 0);
        setDiploma(studentData.diploma || 0);

        setEnrollFormOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  };

  const handleCloseEnrollForm = () => {
    setEnrollFormOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update the respective state based on the id
    if (id === 'SSLC') {
      setSSLC(value);
    } else if (id === 'HSC') {
      setHSC(value);
    } else if (id === 'Diploma') {
      setDiploma(value);
    } else {
      setEditStudentData({
        ...editStudentData,
        [id]: value,
      });
    }
  };

  const handleSaveClick = () => {
    // Construct the editedStudentData object with SSLC, HSC, and Diploma from states
    const editedStudentData = {
      ...editStudentData,
      SSLC,
      HSC,
      Diploma,
    };

    // Implement the logic to save the edited student details here
    // Make a POST request with editedStudentData to update the student details
    axios
      .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addStudentNew/${params.userId}`, editedStudentData)
      .then((response) => {
        console.log('Student details updated successfully:', response.data);
        // Close the form dialog
        setEnrollFormOpen(false);
      })
      .catch((error) => {
        console.error('Error updating student details:', error);
      });
  };

  const handleDeleteClick = (admissionId) => {
    // Implement the logic to delete the course here
    axios
      .delete(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteAdmission/${admissionId}`)
      .then((response) => {
        // Assuming the server responds with a success message
        console.log('Course deleted successfully');
        // Remove the deleted course from the state
        setRegisteredCourses((prevCourses) => prevCourses.filter((course) => course.admissionId !== admissionId));
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      });
  };

  useEffect(() => {
    // Fetch registered courses for the user
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/viewAdmissionByUserId/${params.userId}`)
      .then((response) => {
        setRegisteredCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching registered courses:', error);
      });
  }, [params.userId]);

  return (
    <div style={containerStyle}>
      <UserAppBar />
      <div style={contentStyle}>
        <Grid container spacing={3}>
          {registeredCourses.map((course) => (
            <Grid key={course.admissionId} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.course.courseName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Institute: {course.course.institute.instituteName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Duration: {course.course.courseDuration} years
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewActivityClick}
                    style={{ marginRight: '8px' }}
                  >
                    View Activity
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(course.admissionId)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(course.admissionId)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dialog open={enrollFormOpen} onClose={handleCloseEnrollForm}>
        <DialogContent>
          <h3>Edit Student Details</h3>
          <form>
            <TextField
              label="Student Name"
              fullWidth
              id="studentName"
              margin="normal"
              variant="outlined"
              value={editStudentData.studentName}
              onChange={handleInputChange}
            />
            <TextField
              label="Date of Birth"
              fullWidth
              id="studentDOB"
              margin="normal"
              variant="outlined"
              type="date"
              value={editStudentData.studentDOB}
              onChange={handleInputChange}
            />
            <TextField
              label="Address"
              fullWidth
              id="address"
              margin="normal"
              variant="outlined"
              value={editStudentData.address}
              onChange={handleInputChange}
            />
            <TextField
              label="Mobile"
              fullWidth
              id="mobile"
              margin="normal"
              variant="outlined"
              value={editStudentData.mobile}
              onChange={handleInputChange}
            />
            <TextField
              label="SSLC Marks"
              fullWidth
              id="SSLC"
              margin="normal"
              variant="outlined"
              value={SSLC}
              onChange={handleInputChange}
            />
            <TextField
              label="HSC Marks"
              fullWidth
              id="HSC"
              margin="normal"
              variant="outlined"
              value={HSC}
              onChange={handleInputChange}
            />
            <TextField
              label="Diploma Marks"
              fullWidth
              id="Diploma"
              margin="normal"
              variant="outlined"
              value={Diploma}
              onChange={handleInputChange}
            />
            <RadioGroup
              aria-label="Eligibility"
              name="eligibility"
              value={editStudentData.eligibility}
              onChange={(e) => {
                setEditStudentData({
                  ...editStudentData,
                  eligibility: e.target.value,
                });
              }}
            >
              <FormControlLabel value="Eligible" control={<Radio />} label="Eligible" />
              <FormControlLabel
                value="Not Eligible"
                control={<Radio />}
                label="Not Eligible"
              />
            </RadioGroup>
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            style={{ marginTop: '16px' }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default RegisteredCourses;
