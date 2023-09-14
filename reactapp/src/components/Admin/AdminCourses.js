import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";

const AdminCourses = ({ collegeId, title, onClose }) => {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
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

  // State to track whether the "Add Course" form dialog is open
  const [addFormOpen, setAddFormOpen] = useState(false);

  // State to store form data for adding a new course
  const [addFormData, setAddFormData] = useState({
    courseName: "",
    duration: "",
    description: "",
    studentsCount: "",
    timings: "",
  });

  useEffect(() => {
    // Fetch the course list from your API
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/coursesByInstitute/${collegeId}`)
      .then((response) => {
        setCourseList(response.data);
        setFilteredCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [collegeId]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    // Call the handleSearch function immediately on input change
    handleSearch(value);
  };

  const handleSearch = (query) => {
    const filtered = courseList.filter((course) => {
      const nameMatch = course.courseName.toLowerCase().includes(query.toLowerCase());
      const durationMatch = course.duration.toLowerCase().includes(query.toLowerCase());
      const timingsMatch = course.timings.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = course.description.toLowerCase().includes(query.toLowerCase());
      return nameMatch || durationMatch || timingsMatch || descriptionMatch;
    });
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

  // Function to open the "Add Course" form dialog
  const openAddForm = () => {
    setAddFormOpen(true);
  };

  // Function to close the "Add Course" form dialog
  const closeAddForm = () => {
    setAddFormOpen(false);
  };

  // Function to handle changes in the "Add Course" form inputs
  const handleAddFormInputChange = (e) => {
    const { id, value } = e.target;
    setAddFormData({
      ...addFormData,
      [id]: value,
    });
  };

  // Function to handle the submission of the "Add Course" form
  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    console.log("New Course Details:", addFormData);
    // Implement logic to add the new course to the courseList or make an API call
    // Close the "Add Course" form dialog
    closeAddForm();
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

      {/* Add Course Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={openAddForm} // Open the "Add Course" form dialog
      >
        Add Course
      </Button>

      <TextField
        label="Search by Course Title"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ margin: "10px 0" }}
      />

      <Grid container spacing={2}>
        {filteredCourses.map((course) => (
          <Grid key={course.courseId} item xs={12}>
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
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
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
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
                </div>
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

      {/* "Add Course" Form Dialog */}
      <Dialog open={addFormOpen} onClose={closeAddForm}>
        <DialogContent>
          <h3>Add New Course</h3>
          <form onSubmit={handleAddFormSubmit}>
            <TextField
              label="Course Name"
              fullWidth
              id="courseName"
              margin="normal"
              variant="outlined"
              value={addFormData.courseName}
              onChange={handleAddFormInputChange}
            />
            <TextField
              label="Duration"
              fullWidth
              id="duration"
              margin="normal"
              variant="outlined"
              value={addFormData.duration}
              onChange={handleAddFormInputChange}
            />
            <TextField
              label="Description"
              fullWidth
              id="description"
              margin="normal"
              variant="outlined"
              value={addFormData.description}
              onChange={handleAddFormInputChange}
            />
            <TextField
              label="Students Count"
              fullWidth
              id="studentsCount"
              margin="normal"
              variant="outlined"
              value={addFormData.studentsCount}
              onChange={handleAddFormInputChange}
            />
            <TextField
              label="Timings"
              fullWidth
              id="timings"
              margin="normal"
              variant="outlined"
              value={addFormData.timings}
              onChange={handleAddFormInputChange}
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
