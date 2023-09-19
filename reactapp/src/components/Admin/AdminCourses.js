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
    setAddFormData({
      courseName: "",
      courseDuration: "",
      courseDescription: "",
    });

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
    // Send a PUT request to update the course data
    axios
      .put(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/editCourse/${selectedCourse.course.courseId}`,
        editFormData
      )
      .then((response) => {
        if (response.status === 200) {
          // Successfully updated the course
          // You can update the course list or perform any necessary actions here
          const updatedCourseList = courseList.map((course) =>
            course.course.courseId === selectedCourse.course.courseId
              ? { ...course, course: { ...course.course, ...editFormData } }
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
    // Send a DELETE request to delete the course
    axios
      .delete(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteCourse/${courseId}`
      )
      .then((response) => {
        if (response.status === 204) {
          // Successfully deleted the course
          // You can update the course list or perform any necessary actions here
          const updatedCourseList = courseList.filter(
            (course) => course.course.courseId !== courseId
          );
          setCourseList(updatedCourseList);
        } else {
          // Handle other status codes (e.g., 404 for not found)
          // You can display an error message or take other actions as needed
        }
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        // Handle the error and display an error message
        // You can also take other actions as needed
      });
  };

  // Filter courses based on the search query
  const filteredCourses = Array.isArray(courseList)
    ? courseList.filter((course) => {
        if (searchQuery.trim() === "") {
          return true; // Show all courses if the search query is empty
        }

        const query = searchQuery.toLowerCase();
        return (
          course.course.courseName.toLowerCase().includes(query) ||
          course.course.courseDuration.toString().toLowerCase().includes(query) ||
          course.course.courseDescription.toLowerCase().includes(query)
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

      {/* Always render the "Add Course" button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ margin: "10px 0" }}
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
          <Grid key={course.course.courseId} item xs={12}>
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6" component="div">
                  Course Name: {course.course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {course.course.courseDuration} years
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {course.course.courseDescription}
                </Typography>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "10px", // Add padding between buttons
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
                    onClick={() => handleDeleteClick(course.course.courseId)}
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
              ? `Edit Course: ${selectedCourse.course.courseName}`
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
  );
};

export default AdminCourses;
