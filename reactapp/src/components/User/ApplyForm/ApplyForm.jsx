import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Footer from "../../Footer"

const ApplyForm = ({ collegeId, title, onClose }) => {
  console.log(collegeId)
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
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
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
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = courseList.filter((course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Log form details
    console.log("Form Data:", formData);

    // Add more fields as needed
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
  <Button
    variant="contained"
    color="primary"
    onClick={handleSearch}
    style={{ minWidth: "auto" }}
  >
    Search
  </Button>
</div>


      

{/* <Grid container spacing={2}>
  {filteredCourses.map((course) => (
    <Grid key={course.courseId} item xs={12}>
      <Card>
        <CardContent style={{ textAlign: "left" }}>
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
            onClick={() => handleEnrollClick(course)}
          >
            Enroll Now
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid> */}
<Grid container spacing={2}>
  {filteredCourses.map((course) => (
    <Grid key={course.courseId} item xs={12}>
      <Card style={{ width: '100%' }}>
        <CardContent style={{ textAlign: "left" }}>
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
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
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
            </Grid>
            <Grid container spacing={2}>
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
            </Grid>
            <Grid container spacing={2}>
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
            </Grid>
            <Grid container spacing={2}>
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
      <Footer/>
    </div>
  );
};

export default ApplyForm;
