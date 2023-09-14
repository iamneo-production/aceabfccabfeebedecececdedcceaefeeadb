import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Footer from "../../Footer";
import axios from "axios";

const ApplyForm = ({ collegeId, title, onClose }) => {
  console.log(collegeId);

  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/coursesByInstitute/${collegeId}`
      )
      .then((response) => {
        setCourseList(response.data);
        setFilteredCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [collegeId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    fatherName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    motherName: "",
    houseNo: "",
    streetName: "",
    areaName: "",
    pinCode: "",
    state: "",
    nationality: "",
    email: "",
    age: "",
    sslcMarks: "",
    hscMarks: "",
  });

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setFormData({});
    setEnrollFormOpen(true);
  };

  const handleCloseEnrollForm = () => {
    setEnrollFormOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = courseList.filter((course) =>
      course.courseName.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
    setSearchQuery(query);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    handleCloseEnrollForm();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
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

      <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <TextField
          label="Search by Course Title"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          style={{ flex: 1, marginRight: "10px" }}
        />
      </div>

      <Grid container spacing={2}>
        {filteredCourses.map((course) => (
          <Grid key={course.courseId} item xs={12}>
            <Card style={{ width: "100%" }}>
              <CardContent style={{ textAlign: "left" }}>
                <Typography variant="h6" component="div">
                  Course Name: {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {course.courseDuration} years
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {course.courseDescription}
                </Typography>
                {/* Institute Details */}
                <Typography variant="body2" color="text.secondary">
                  Institute Name: {course.institute.instituteName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Institute Address: {course.institute.instituteAddress}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mobile: {course.institute.mobile}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {course.institute.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Star Rating: {course.institute.starRating}
                </Typography>
              </CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "8px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEnrollClick(course)}
                >
                  Enroll Now
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={enrollFormOpen} onClose={handleCloseEnrollForm}>
        <DialogContent>
          <h3>Enrollment Form for {selectedCourse?.courseName}</h3>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="First Name"
                  fullWidth
                  id="firstName"
                  margin="normal"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Last Name"
                  fullWidth
                  id="lastName"
                  margin="normal"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Gender"
                  fullWidth
                  id="gender"
                  margin="normal"
                  variant="outlined"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Father's Name"
                  fullWidth
                  id="fatherName"
                  margin="normal"
                  variant="outlined"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Phone Number 1"
                  fullWidth
                  id="phoneNumber1"
                  margin="normal"
                  variant="outlined"
                  value={formData.phoneNumber1}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Phone Number 2"
                  fullWidth
                  id="phoneNumber2"
                  margin="normal"
                  variant="outlined"
                  value={formData.phoneNumber2}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Mother's Name"
                  fullWidth
                  id="motherName"
                  margin="normal"
                  variant="outlined"
                  value={formData.motherName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="House No"
                  fullWidth
                  id="houseNo"
                  margin="normal"
                  variant="outlined"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Street Name"
                  fullWidth
                  id="streetName"
                  margin="normal"
                  variant="outlined"
                  value={formData.streetName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Area Name"
                  fullWidth
                  id="areaName"
                  margin="normal"
                  variant="outlined"
                  value={formData.areaName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Pin Code"
                  fullWidth
                  id="pinCode"
                  margin="normal"
                  variant="outlined"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="State"
                  fullWidth
                  id="state"
                  margin="normal"
                  variant="outlined"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Nationality"
                  fullWidth
                  id="nationality"
                  margin="normal"
                  variant="outlined"
                  value={formData.nationality}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Email"
                  fullWidth
                  id="email"
                  margin="normal"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Age"
                  fullWidth
                  id="age"
                  margin="normal"
                  variant="outlined"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="SSLC/HSC Marks"
                  fullWidth
                  id="sslcMarks"
                  margin="normal"
                  variant="outlined"
                  value={formData.sslcMarks}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default ApplyForm;
