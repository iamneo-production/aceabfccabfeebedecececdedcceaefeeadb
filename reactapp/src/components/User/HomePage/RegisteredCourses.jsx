import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAppBar from '../../UserAppBar';
import { Card, CardContent, Typography, Button, Dialog, DialogContent, TextField, Grid, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import Footer from '../../Footer';
import axios from 'axios';

const RegisteredCourses = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [editStudentData, setEditStudentData] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const params = useParams();
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);

  const handleEditClick = (studentId) => {
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/getStudent/${studentId}`)
      .then((response) => {
        setEditStudentData(response.data);
        setEnrollFormOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  };

  const handleDeleteClick = (admissionId) => {
    setDeleteConfirmation(true);
    // Assuming you want a confirmation dialog before deletion
  };

  const handleConfirmDelete = (admissionId) => {
    axios
      .delete(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteAdmission/${admissionId}`)
      .then((response) => {
        console.log('Course deleted successfully');
        setRegisteredCourses((prevCourses) => prevCourses.filter((course) => course.admissionId !== admissionId));
        setDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };

  const handleSaveClick = () => {
    axios
      .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/updateStudent/${editStudentData.studentId}`, editStudentData)
      .then((response) => {
        console.log('Student data updated successfully:', response.data);
        setEditStudentData(null);
        setEnrollFormOpen(false);
      })
      .catch((error) => {
        console.error('Error updating student data:', error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/viewAdmissionByUserId/${params.userId}`)
      .then((response) => {
        setRegisteredCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching registered courses:', error);
      });
  }, [params.userId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditStudentData({
      ...editStudentData,
      [id]: value,
    });
  };

  return (
    <div>
      <UserAppBar id={params.userId} />
      <div>
        {registeredCourses.map((course) => (
          <Card key={course.admissionId} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Course Name: {course.course.courseName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {course.course.courseDuration} years
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleEditClick(course.userId)}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(course.admissionId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
      {editStudentData && (
        <Dialog open={enrollFormOpen} onClose={() => setEnrollFormOpen(false)}>
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
                {/* Add more fields as needed */}
              </Grid>
            </form>
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {deleteConfirmation && (
        <Dialog open={deleteConfirmation} onClose={handleCancelDelete}>
          <DialogContent>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this course?</p>
            <Button variant="contained" color="primary" onClick={() => handleConfirmDelete(editStudentData.admissionId)}>
              Confirm
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RegisteredCourses;
