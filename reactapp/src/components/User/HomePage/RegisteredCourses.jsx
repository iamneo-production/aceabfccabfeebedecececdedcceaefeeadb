import React from 'react';
import { useParams } from 'react-router-dom';
import UserAppBar from '../../UserAppBar';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Footer from '../../Footer';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  flex: '1', /* This makes the content area expand to fill available space */
  textAlign: 'left', /* Align the card content to the left */
};

const RegisteredCourses = () => {
  const registeredCourse = [
    {
      courseId: 1,
      courseName: "Masters in Computer Science",
      duration: "2 years",
      description: "A comprehensive program in computer science.",
      studentsCount: 50,
      timings: "9:00 AM - 11:00 AM",
    },
  ];
  const params = useParams();

  const handleViewActivityClick = () => {
    // Handle the click event for "View Activity" button here
    console.log("View Activity button clicked");
  };

  return (
    <div style={containerStyle}>
      
      <UserAppBar id={params.userId} />
      <div style={contentStyle}>
        
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="div">
              Course Name: {registeredCourse[0].courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {registeredCourse[0].duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {registeredCourse[0].description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Students: {registeredCourse[0].studentsCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Timings: {registeredCourse[0].timings}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleViewActivityClick}>
              View Activity
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default RegisteredCourses;
