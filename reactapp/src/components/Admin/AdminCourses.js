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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    courseId: null,
    courseName: "",
    courseDuration: "",
    courseDescription: "",
  });
  const [addFormData, setAddFormData] = useState({
    courseName: "",
    courseDuration: "",
    courseDescription: "",
  });

  useEffect(() => {
    // Fetch the course list from your API
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/coursesByInstitute/${collegeId}`)
      .then((response) => {
        setCourseList(response.data);
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

  const handleCloseAddForm = () => {
    setAddFormOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditFormData({ ...course });
    setEditFormOpen(true);
  };

  const handleAddClick = () => {
    setAddFormOpen(true);
  };

  const handleEditFormInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData({
      ...editFormData,
      [id]: value,
    });
  };

  const handleAddFormInputChange = (e) => {
    const { id, value } = e.target;
    setAddFormData({
      ...addFormData,
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

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // Create a new course object with the form data
    const newCourse = {
      courseName: addFormData.courseName,
      courseDuration: parseInt(addFormData.courseDuration, 10), // Ensure it's an integer
      courseDescription: addFormData.courseDescription,
    };

    // Make a POST request to create the new course
    axios
      .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addCourseNew/${collegeId}`, newCourse)
      .then((response) => {
        // Handle the successful response, you can update the state or perform any other actions here
        // For example, you can close the add form and refresh the course list
        handleCloseAddForm();
        // Optionally, you can refresh the course list by making another GET request
        axios
          .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/coursesByInstitute/${collegeId}`)
          .then((response) => {
            setCourseList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching course data:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating course:", error);
        // Handle the error, show a message, or perform any other necessary actions
      });
  };

  const handleDeleteClick = (courseId) => {
    // Implement the logic to delete the course with the given courseId
    // You can filter the courseList to remove the course or make an API call
  };

  // Filter courses based on the search query
  const filteredCourses = Array.isArray(courseList)
    ? courseList.filter((course) => {
        if (searchQuery.trim() === "") {
          return true; // Show all courses if the search query is empty
        }

        const query = searchQuery.toLowerCase();
        return (
          course.courseName.toLowerCase().includes(query) ||
          course.courseDuration.toString().toLowerCase().includes(query) ||
          course.courseDescription.toLowerCase().includes(query)
        );
      })
    : [];

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

      {courseList.length === 0 ? (
        // Check if the courseList is empty and display a message
        <div>
          <p>Please add courses or wait for the data to load...</p>
        </div>
      ) : (
        // Display the course list
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClick}
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
                      Duration: {course.courseDuration} years
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {course.courseDescription}
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
              <h3>
                {selectedCourse
                  ? `Edit Course: ${selectedCourse.courseName}`
                  : "Add New Course"}
              </h3>
              <form onSubmit={selectedCourse ? handleEditFormSubmit : handleAddFormSubmit}>
                <TextField
                  label="Course Name"
                  fullWidth
                  id="courseName"
                  margin="normal"
                  variant="outlined"
                  value={selectedCourse ? editFormData.courseName : addFormData.courseName}
                  onChange={selectedCourse ? handleEditFormInputChange : handleAddFormInputChange}
                />
                <TextField
                  label="Duration (in years)"
                  fullWidth
                  id="courseDuration"
                  margin="normal"
                  variant="outlined"
                  value={selectedCourse ? editFormData.courseDuration : addFormData.courseDuration}
                  onChange={selectedCourse ? handleEditFormInputChange : handleAddFormInputChange}
                />
                <TextField
                  label="Description"
                  fullWidth
                  id="courseDescription"
                  margin="normal"
                  variant="outlined"
                  value={selectedCourse ? editFormData.courseDescription : addFormData.courseDescription}
                  onChange={selectedCourse ? handleEditFormInputChange : handleAddFormInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
