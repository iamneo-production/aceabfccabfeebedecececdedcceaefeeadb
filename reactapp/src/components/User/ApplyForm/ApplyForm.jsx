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
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const ApplyForm = ({ collegeId, title, onClose }) => {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
  const [eligibility, setEligibility] = useState(""); // Added state for eligibility

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
    studentName: "",
    studentDOB: "",
    address: "",
    mobile: "",
    SSLC: "",
    HSC: "",
    Diploma: "",
  });

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setFormData({
      studentName: "",
      studentDOB: "",
      address: "",
      mobile: "",
      SSLC: "",
      HSC: "",
      Diploma: "",
    });
    setEligibility(""); // Reset eligibility when enrolling
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
    console.log("Eligibility:", eligibility);
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
                  label="Student Name"
                  fullWidth
                  id="studentName"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  value={formData.studentName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Date of Birth"
                  fullWidth
                  id="studentDOB"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  type="date"
                  value={formData.studentDOB}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Address"
                  fullWidth
                  id="address"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Mobile"
                  fullWidth
                  id="mobile"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="SSLC Marks"
                  fullWidth
                  id="SSLC"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  value={formData.SSLC}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="HSC Marks"
                  fullWidth
                  id="HSC"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  value={formData.HSC}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Diploma Marks"
                  fullWidth
                  id="Diploma"
                  margin="dense" // Change margin value to "dense"
                  variant="outlined"
                  value={formData.Diploma}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={8}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    Eligibility
                  </Typography>
                  <RadioGroup
                    aria-label="eligibility"
                    name="eligibility"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                  >
                    <FormControlLabel
                      value="Eligible"
                      control={<Radio />}
                      label="Eligible"
                    />
                    <FormControlLabel
                      value="Not Eligible"
                      control={<Radio />}
                      label="Not Eligible"
                    />
                  </RadioGroup>
                </FormControl>
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
