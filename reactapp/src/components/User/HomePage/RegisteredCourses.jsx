import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAppBar from '../../UserAppBar';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
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

  const handleViewActivityClick = () => {
    console.log("View Activity button clicked");
  };

  const handleEditClick = (course) => {
    // Implement the logic to edit the course here
    console.log("Edit clicked for course:", course);
  };

  const handleDeleteClick = (admissionId) => {
    // Implement the logic to delete the course here
    axios
      .delete(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteAdmission/${admissionId}`)
      .then((response) => {
        // Assuming the server responds with a success message
        console.log("Course deleted successfully");
        // Remove the deleted course from the state
        setRegisteredCourses((prevCourses) => prevCourses.filter((course) => course.admissionId !== admissionId));
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/viewAdmissionByUserId/${params.userId}`)
      .then((response) => {
        setRegisteredCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching registered courses:", error);
      });
  }, [params.userId]);

  return (
    <div style={containerStyle}>
      <UserAppBar id={params.userId} />
      <div style={contentStyle}>
        <Grid container spacing={2}>
          {registeredCourses.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.admissionId}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    Course Name: {item.course.courseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {item.course.courseDuration} years
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {item.course.courseDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Institute: {item.instituteName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Students: {item.course.studentsCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Timings: {item.course.timings}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleViewActivityClick}>
                    View Activity
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(course.admissionId)}>
                    Delete
                  </Button>
                  <Button variant="contained" color="default" onClick={() => handleEditClick(course)}>
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default RegisteredCourses;
