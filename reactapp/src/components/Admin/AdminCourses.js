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
  const [addFormOpen, setAddFormOpen] = useState(false); // State for the add course form
  const [editFormOpen, setEditFormOpen] = useState(false); // State for the edit course form
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

  const handleAddClick = () => {
    setAddFormOpen(true);
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

    // Send a PUT request to update the course data
    axios
      .put(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/updateCourse/${selectedCourse.courseId}`,
        editFormData
      )
      .then((response) => {
        if (response.status === 200) {
          // Successfully updated the course
          // You can update the course list or perform any necessary actions here
          const updatedCourseList = courseList.map((course) =>
            course.courseId === selectedCourse.courseId
              ? response.data
              : course
          );
          setCourseList(updatedCourseList);
          handleCloseEditForm();
        } else {
          // Handle other status codes (e.g., 400 for bad request)
          // You can display an error message or take other actions as needed
        }
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        // Handle the error and display an error message
        // You can also take other actions as needed
      });
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // Implement logic to add a new course with the data in addFormData
    // Close the add dialog

    // Send a POST request to add a new course
    axios
      .post(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addCourseNew/${collegeId}`,
        addFormData
      )
      .then((response) => {
        if (response.status === 201) {
          // Successfully added the course
          // You can update the course list or perform any necessary actions here
          setCourseList([...courseList, response.data]);
          handleCloseAddForm();
        } else {
          // Handle other status codes (e.g., 400 for bad request)
          // You can display an error message or take other actions as needed
        }
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        // Handle the error and display an error message
        // You can also take other actions as needed
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
                  label="Duration (in years)"
                  fullWidth
                  id="courseDuration"
                  margin="normal"
                  variant="outlined"
                  value={editFormData.courseDuration}
                  onChange={handleEditFormInputChange}
                />
                <TextField
                  label="Description"
                  fullWidth
                  id="courseDescription"
                  margin="normal"
                  variant="outlined"
                  value={editFormData.courseDescription}
                  onChange={handleEditFormInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={addFormOpen} onClose={handleCloseAddForm}>
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
                  label="Duration (in years)"
                  fullWidth
                  id="courseDuration"
                  margin="normal"
                  variant="outlined"
                  value={addFormData.courseDuration}
                  onChange={handleAddFormInputChange}
                />
                <TextField
                  label="Description"
                  fullWidth
                  id="courseDescription"
                  margin="normal"
                  variant="outlined"
                  value={addFormData.courseDescription}
                  onChange={handleAddFormInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Add
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
