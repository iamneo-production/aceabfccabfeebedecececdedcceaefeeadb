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
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useParams} from "react-router-dom";


const ApplyForm = ({ collegeId, title, onClose }) => {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentDOB: "",
    address: "",
    mobile: "",
    SSLC: "",
    HSC: "",
    Diploma: "",
    eligibility: "",
  });

  const { userId } = useParams();
 

  
   

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


  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
  
    // Make a GET request to retrieve student data
    axios
      .get(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/getStudent/${userId}`)
      .then((response) => {
        const studentData = response.data;
  
        // Set the form data with the retrieved student data
        setFormData({
          studentName: studentData.studentName || "",
          studentDOB: studentData.studentDOB || "",
          address: studentData.address || "",
          mobile: studentData.mobile || "",
          SSLC: studentData.sslc || "",
          HSC: studentData.hsc || "",
          Diploma: studentData.diploma || "",
          eligibility: studentData.eligibility || "",
        });
  
        // Open the enrollment form
        setEnrollFormOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });



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
    // Construct the data to send in the POST request
    const enrollmentData = {
      studentName: formData.studentName,
      studentDOB: formData.studentDOB,
      address: formData.address,
      mobile: formData.mobile,
      sslc: formData.SSLC,
      hsc: formData.HSC,
      diploma: formData.Diploma,
      eligibility: formData.eligibility,
    };

    axios
      .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addStudentNew/${userId}`, enrollmentData)
      .then((response) => {
        console.log("Enrollment successful:", response.data);
        const admissionData = {
          courseId: selectedCourse.courseId, // Use the selected course ID
          instituteId: collegeId, // Use the college ID as institute ID
          status: "enrolled", // Set the status to "enrolled"
        };
        
        axios
          .post(
            `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addAdmissionNew/${userId}`,
            admissionData
          )
          .then((admissionResponse) => {
            console.log("Admission created successfully:", admissionResponse.data);
            // Handle admission success as needed
          })
          .catch((admissionError) => {
            console.error("Error creating admission:", admissionError);
          });
      })
      .catch((error) => {
        console.error("Error enrolling student:", error);
      });

   
  
  
  
  
  
        handleCloseEnrollForm();
      }).catch((error) => {
        console.error("Error enrolling student:", error);
      });
      





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
                  justifyContent: "space-between",
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
                  variant="outlined"
                  value={formData.Diploma}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>

                <RadioGroup
                  aria-label="Eligibility"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      eligibility: e.target.value,
                    });
                  }}
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
