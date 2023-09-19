import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";

const AdminCourses = ({ collegeId, title, onClose }) => {
  const courseList = [
    {
      courseId: 1,
      courseName: "Masters in Computer Science",
      duration: "2 years",
      description: "A comprehensive program in computer science.",
      studentsCount: 50,
      timings: "9:00 AM - 11:00 AM",
    },
    {
      courseId: 2,
      courseName: "Masters in Business Administration (MBA)",
      duration: "2 years",
      description: "Advanced studies in business management.",
      studentsCount: 40,
      timings: "10:00 AM - 12:00 PM",
    },
    {
      courseId: 3,
      courseName: "Masters in Electrical Engineering",
      duration: "2 years",
      description: "In-depth knowledge of electrical systems.",
      studentsCount: 30,
      timings: "11:00 AM - 1:00 PM",
    },
    {
      courseId: 4,
      courseName: "Masters in Data Science",
      duration: "2 years",
      description: "Harnessing the power of data for insights.",
      studentsCount: 35,
      timings: "2:00 PM - 4:00 PM",
    },
    {
      courseId: 5,
      courseName: "Masters in Psychology",
      duration: "2 years",
      description: "Understanding the human mind and behavior.",
      studentsCount: 25,
      timings: "3:00 PM - 5:00 PM",
    },
    {
      courseId: 6,
      courseName: "Masters in Civil Engineering",
      duration: "2 years",
      description: "Design and construction of infrastructure.",
      studentsCount: 28,
      timings: "9:30 AM - 11:30 AM",
    },
    {
      courseId: 7,
      courseName: "Masters in Environmental Science",
      duration: "2 years",
      description: "Exploring environmental issues and solutions.",
      studentsCount: 20,
      timings: "10:30 AM - 12:30 PM",
    },
    {
      courseId: 8,
      courseName: "Masters in Public Health",
      duration: "2 years",
      description: "Promoting health in communities.",
      studentsCount: 22,
      timings: "1:30 PM - 3:30 PM",
    },
    {
      courseId: 9,
      courseName: "Masters in Finance",
      duration: "2 years",
      description: "Managing financial resources effectively.",
      studentsCount: 18,
      timings: "2:30 PM - 4:30 PM",
    },
    {
      courseId: 10,
      courseName: "Masters in Linguistics",
      duration: "2 years",
      description: "Studying language and communication.",
      studentsCount: 15,
      timings: "3:30 PM - 5:30 PM",
    },
    // Add more courses as needed
  ];
  const [filteredCourses, setFilteredCourses] = useState(courseList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    courseName: "",
    duration: "",
    description: "",
    studentsCount: "",
    timings: "",
  });

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = courseList.filter((course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditFormData({ ...course }); // Initialize form data with course details
    setEditFormOpen(true);
  };

  const handleEditFormInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData({
      ...editFormData,
      [id]: value,
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update the course details with the edited data
    // You can filter the courseList to find the course by courseId and update it
    // Close the edit dialog
    handleCloseEditForm();
  };

  const handleDeleteClick = (courseId) => {
    // Implement the logic to delete the course with the given courseId
    // You can filter the courseList to remove the course or make an API call
  };

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>{title} - Course List</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </Grid>

      <TextField
        label="Search by Course Title"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ margin: "10px 0" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Grid container spacing={2}>
        {filteredCourses.map((course) => (
          <Grid
            key={course.courseId}
            id={`courseGrid${course.courseId}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card><CardActionArea>
              
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(course)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteClick(course.courseId)}
                >
                  Delete
                </Button>
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editFormOpen} onClose={handleCloseEditForm}>
        <DialogContent>
          <h3>Edit Course: {selectedCourse?.courseName}</h3>
          <form onSubmit={handleEditFormSubmit}>
            <TextField
              label="Course Name"
              fullWidth
              id="courseName"
              margin="normal"
              variant="outlined"
              value={editFormData.courseName}
              onChange={handleEditFormInputChange}
            />
            <TextField
              label="Duration"
              fullWidth
              id="duration"
              margin="normal"
              variant="outlined"
              value={editFormData.duration}
              onChange={handleEditFormInputChange}
            />
            <TextField
              label="Description"
              fullWidth
              id="description"
              margin="normal"
              variant="outlined"
              value={editFormData.description}
              onChange={handleEditFormInputChange}
            />
            <TextField
              label="Students Count"
              fullWidth
              id="studentsCount"
              margin="normal"
              variant="outlined"
              value={editFormData.studentsCount}
              onChange={handleEditFormInputChange}
            />
            <TextField
              label="Timings"
              fullWidth
              id="timings"
              margin="normal"
              variant="outlined"
              value={editFormData.timings}
              onChange={handleEditFormInputChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
