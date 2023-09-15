import React from 'react';
import { useParams } from 'react-router-dom';
import UserAppBar from '../../UserAppBar';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Footer from '../../Footer';

const RegisteredCourses = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const params = useParams();

  const handleViewActivityClick = () => {
    // Handle the click event for "View Activity" button here
    console.log("View Activity button clicked");
  };

  const handleDeleteClick = (courseId) => {
    // Handle the click event for the delete button here
    console.log("Delete button clicked for course ID:", courseId);
  };

  useEffect(() => {
    // Fetch the registered courses list from the server
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
        {registeredCourses.map((course) => (
          <Card key={course.admissionId} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Course Name: {course.courseName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {course.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {course.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Students: {course.studentsCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Timings: {course.timings}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleViewActivityClick}>
                View Activity
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(course.admissionId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};
