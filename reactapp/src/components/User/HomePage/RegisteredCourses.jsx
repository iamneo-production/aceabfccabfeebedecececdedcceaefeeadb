// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import UserAppBar from '../../UserAppBar';
// import { Card, CardContent, Typography, Button, Grid, Dialog, DialogContent, TextField, RadioGroup, Radio, FormControlLabel } from '@mui/material';
// import Footer from '../../Footer';
// import axios from 'axios';

// const containerStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   minHeight: '100vh',
// };

// const contentStyle = {
//   flex: '1',
//   textAlign: 'left',
// };

// const RegisteredCourses = () => {
//   const [registeredCourses, setRegisteredCourses] = useState([]);
//   const params = useParams();
//   const [enrollFormOpen, setEnrollFormOpen] = useState(false);
//   const [editStudentData, setEditStudentData] = useState({
//     studentName: '',
//     studentDOB: '',
//     address: '',
//     mobile: '',
//     SSLC: '',
//     HSC: '',
//     Diploma: '',
//     eligibility: 'Eligible',
//   });

//   const handleViewActivityClick = () => {
//     console.log('View Activity button clicked');
//   };

//   const handleEditClick = (admissionId) => {
//     // Fetch student data by admissionId and populate the form
//     axios
//       .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/getStudent/${params.userId}`)
//       .then((response) => {
//         const studentData = response.data;
//         setEditStudentData({
//           studentName: studentData.studentName || '',
//           studentDOB: studentData.studentDOB || '',
//           address: studentData.address || '',
//           mobile: studentData.mobile || '',
//           SSLC: studentData.sslc || '',
//           HSC: studentData.hsc || '',
//           Diploma: studentData.diploma || '',
//           eligibility: studentData.eligibility || 'Eligible',
//         });
//         setEnrollFormOpen(true);
//       })
//       .catch((error) => {
//         console.error('Error fetching student data:', error);
//       });
//   };

//   const handleCloseEnrollForm = () => {
//     setEnrollFormOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setEditStudentData({
//       ...editStudentData,
//       [id]: value,
//     });
//   };

//   const handleSaveClick = () => {
//     // Implement the logic to save the edited student details here
//     // Make a POST request with editStudentData to update the student details
//     axios
//       .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addStudentNew/${params.userId}`, editStudentData)
//       .then((response) => {
//         console.log('Student details updated successfully:', response.data);
//         // Close the form dialog
//         setEnrollFormOpen(false);
//       })
//       .catch((error) => {
//         console.error('Error updating student details:', error);
//       });
//   };

//   const handleDeleteClick = (admissionId) => {
//     // Implement the logic to delete the course here
//     axios
//       .delete(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteAdmission/${admissionId}`)
//       .then((response) => {
//         // Assuming the server responds with a success message
//         console.log('Course deleted successfully');
//         // Remove the deleted course from the state
//         setRegisteredCourses((prevCourses) => prevCourses.filter((course) => course.admissionId !== admissionId));
//       })
//       .catch((error) => {
//         console.error('Error deleting course:', error);
//       });
//   };

//   useEffect(() => {
//     // Fetch registered courses for the user
//     axios
//       .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/viewAdmissionByUserId/${params.userId}`)
//       .then((response) => {
//         setRegisteredCourses(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching registered courses:', error);
//       });
//   }, [params.userId]);

//   return (
//     <div style={containerStyle}>
//       <UserAppBar id={params.userId} />
//       <div style={contentStyle}>
//         {registeredCourses.map((course) => (
//           <Card key={course.admissionId} variant="outlined">
//             <CardContent>
//               <Typography variant="h6" component="div">
//                 Course Name: {course.course.courseName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Course Description: {course.course.courseDescription}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Course Duration: {course.course.courseDuration} years
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Institute Name: {course.instituteName}
//               </Typography>
//               <Button variant="contained" color="primary" onClick={handleViewActivityClick}>
//                 View Activity
//               </Button>
//               <Button variant="contained" color="secondary" onClick={() => handleEditClick(course.admissionId)}>
//                 Edit
//               </Button>
//               <Button variant="contained" color="error" onClick={() => handleDeleteClick(course.admissionId)}>
//                 Delete
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <Footer />

//       {/* Edit Student Details Form */}
//       <Dialog open={enrollFormOpen} onClose={handleCloseEnrollForm}>
//         <DialogContent>
//           <h3>Edit Student Details</h3>
//           <form>
//             <Grid container spacing={2}>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Student Name"
//                   fullWidth
//                   id="studentName"
//                   margin="normal"
//                   variant="outlined"
//                   value={editStudentData.studentName}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Date of Birth"
//                   fullWidth
//                   id="studentDOB"
//                   margin="normal"
//                   variant="outlined"
//                   type="date"
//                   value={editStudentData.studentDOB}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Address"
//                   fullWidth
//                   id="address"
//                   margin="normal"
//                   variant="outlined"
//                   value={editStudentData.address}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Mobile"
//                   fullWidth
//                   id="mobile"
//                   margin="normal"
//                   variant="outlined"
//                   value={editStudentData.mobile}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="SSLC Marks"
//                   fullWidth
//                   id="SSLC"
//                   margin="normal"
//                   variant="outlined"
//                   value={editStudentData.SSLC}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="HSC Marks"
//                   fullWidth
//                   id="HSC"
//                   margin="normal"
//                   variant="outlined"
//                   value={editStudentData.HSC}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   label="Diploma Marks"
//                   fullWidth
//                   id="Diploma"
//                   margin="normal"
//                   variant="outlined"
//                   value={editStudentData.Diploma}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <RadioGroup
//                   aria-label="Eligibility"
//                   name="eligibility"
//                   value={editStudentData.eligibility}
//                   onChange={(e) => {
//                     setEditStudentData({
//                       ...editStudentData,
//                       eligibility: e.target.value,
//                     });
//                   }}
//                 >
//                   <FormControlLabel
//                     value="Eligible"
//                     control={<Radio />}
//                     label="Eligible"
//                   />
//                   <FormControlLabel
//                     value="Not Eligible"
//                     control={<Radio />}
//                     label="Not Eligible"
//                   />
//                 </RadioGroup>
//               </Grid>
//             </Grid>
//             <Button variant="contained" color="primary" onClick={handleSaveClick}>
//               Save
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RegisteredCourses;
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
    SSLC: null,
    HSC: null,
    Diploma: null,
    eligibility: 'Eligible',
  });

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
          SSLC: studentData.sslc.toString() || '', // Ensure SSLC is converted to a string
          HSC: studentData.hsc.toString() || '', // Ensure HSC is converted to a string
          Diploma: studentData.diploma.toString() || '', // Ensure Diploma is converted to a string
          eligibility: studentData.eligibility || 'Eligible',
        });
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
    setEditStudentData({
      ...editStudentData,
      [id]: value,
    });
  };

  const handleSaveClick = () => {
    // Convert SSLC, HSC, and Diploma to integers
    const editedStudentData = {
      ...editStudentData,
      SSLC: parseInt(editStudentData.SSLC),
      HSC: parseInt(editStudentData.HSC),
      Diploma: parseInt(editStudentData.Diploma),
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
      <UserAppBar id={params.userId} />
      <div style={contentStyle}>
        {registeredCourses.map((course) => (
          <Card key={course.admissionId} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Course Name: {course.course.courseName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Course Description: {course.course.courseDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Course Duration: {course.course.courseDuration} years
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Institute Name: {course.instituteName}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleViewActivityClick}>
                View Activity
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleEditClick(course.admissionId)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteClick(course.admissionId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />

      {/* Edit Student Details Form */}
      <Dialog open={enrollFormOpen} onClose={handleCloseEnrollForm}>
        <DialogContent>
          <h3>Edit Student Details</h3>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Student Name"
                  fullWidth
                  id="studentName"
                  margin="normal"
                  variant="outlined"
                  value={editStudentData.studentName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
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
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Address"
                  fullWidth
                  id="address"
                  margin="normal"
                  variant="outlined"
                  value={editStudentData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Mobile"
                  fullWidth
                  id="mobile"
                  margin="normal"
                  variant="outlined"
                  value={editStudentData.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="SSLC Marks"
                  fullWidth
                  id="SSLC"
                  margin="normal"
                  variant="outlined"
                  value={editStudentData.SSLC}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="HSC Marks"
                  fullWidth
                  id="HSC"
                  margin="normal"
                  variant="outlined"
                  value={editStudentData.HSC}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Diploma Marks"
                  fullWidth
                  id="Diploma"
                  margin="normal"
                  variant="outlined"
                  value={editStudentData.Diploma}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
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
                  <FormControlLabel value="Not Eligible" control={<Radio />} label="Not Eligible" />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisteredCourses;
