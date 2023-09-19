import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
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
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
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
    fetchCourseList();
  }, [collegeId]);

  const fetchCourseList = () => {
    axios
      .get(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/coursesByInstitute/${collegeId}`
      )
      .then((response) => {
        setCourseList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };

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
    setEditFormData({ ...course.course });
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
    axios
      .put(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/editCourse/${selectedCourse.course.courseId}`,
        editFormData
      )
      .then((response) => {
        if (response.status === 200) {
          const updatedCourseList = courseList.map((course) =>
            course.course.courseId === selectedCourse.course.courseId
              ? { ...course, course: { ...course.course, ...editFormData } }
              : course
          );
          setCourseList(updatedCourseList);
          handleCloseEditForm();
        } else {
          console.error("Error updating course:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addCourseNew/${collegeId}`,
        addFormData
      )
      .then((response) => {
        if (response.status === 201) {
          // Fetch the updated course list after adding a new course
          fetchCourseList();
          handleCloseAddForm();
        } else {
          console.error("Error adding course:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });
  };

  const handleDeleteClick = (courseId) => {
    axios
      .delete(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteCourse/${courseId}`
      )
      .then((response) => {
        if (response.status === 204) {
          const updatedCourseList = courseList.filter(
            (course) => course.course.courseId !== courseId
          );
          setCourseList(updatedCourseList);
        } else {
          console.error("Error deleting course:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const filteredCourses = Array.isArray(courseList) ? courseList : [];

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
                    paddingTop: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(course)}
                    style={{ marginRight: "5px" }}
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
