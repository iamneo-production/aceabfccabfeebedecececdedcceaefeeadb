import React, { useState } from 'react';
import Footer from '../Footer'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AdminAppBar from '../AdminAppBar'
import {useParams} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'; // Import the DataGrid component


// const initialStudents = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     fatherName: "John Sr.",
//     phoneNumber1: "1234567890",
//     phoneNumber2: "9876543210",
//     motherName: "Jane Doe",
//     houseNo: "123",
//     streetName: "Main St",
//     areaName: "Downtown",
//     pinCode: "12345",
//     state: "CA",
//     nationality: "US",
//     email: "john.doe@example.com",
//     age: "25",
//     sslcMarks: "95",
//     courseName: "Course A",
//     universityName: "University X",
//   },
//   {
//     id: 2,
//     firstName: "Alice",
//     lastName: "Smith",
//     gender: "Female",
//     fatherName: "Robert Smith",
//     phoneNumber1: "5551234567",
//     phoneNumber2: "5559876543",
//     motherName: "Mary Smith",
//     houseNo: "456",
//     streetName: "Oak St",
//     areaName: "Uptown",
//     pinCode: "54321",
//     state: "NY",
//     nationality: "US",
//     email: "alice.smith@example.com",
//     age: "22",
//     sslcMarks: "92",
//     courseName: "Course B",
//     universityName: "University Y",
//   },
//   {
//     id: 3,
//     firstName: "David",
//     lastName: "Wilson",
//     gender: "Male",
//     fatherName: "Michael Wilson",
//     phoneNumber1: "7778889999",
//     phoneNumber2: "8887779999",
//     motherName: "Sarah Wilson",
//     houseNo: "789",
//     streetName: "Cedar St",
//     areaName: "Midtown",
//     pinCode: "78901",
//     state: "TX",
//     nationality: "US",
//     email: "david.wilson@example.com",
//     age: "23",
//     sslcMarks: "88",
//     courseName: "Course C",
//     universityName: "University Z",
//   },
//   {
//     id: 4,
//     firstName: "Emma",
//     lastName: "Davis",
//     gender: "Female",
//     fatherName: "Daniel Davis",
//     phoneNumber1: "9995554444",
//     phoneNumber2: "4445559999",
//     motherName: "Linda Davis",
//     houseNo: "567",
//     streetName: "Pine St",
//     areaName: "Westend",
//     pinCode: "67890",
//     state: "FL",
//     nationality: "US",
//     email: "emma.davis@example.com",
//     age: "24",
//     sslcMarks: "91",
//     courseName: "Course A",
//     universityName: "University X",
//   },
//   {
//     id: 5,
//     firstName: "Liam",
//     lastName: "Anderson",
//     gender: "Male",
//     fatherName: "William Anderson",
//     phoneNumber1: "7771234567",
//     phoneNumber2: "8889876543",
//     motherName: "Olivia Anderson",
//     houseNo: "101",
//     streetName: "Cypress St",
//     areaName: "Eastside",
//     pinCode: "54321",
//     state: "IL",
//     nationality: "US",
//     email: "liam.anderson@example.com",
//     age: "21",
//     sslcMarks: "90",
//     courseName: "Course B",
//     universityName: "University Y",
//   },
//   {
//     id: 6,
//     firstName: "Olivia",
//     lastName: "Harris",
//     gender: "Female",
//     fatherName: "James Harris",
//     phoneNumber1: "5557771234",
//     phoneNumber2: "5558884321",
//     motherName: "Sophia Harris",
//     houseNo: "222",
//     streetName: "Chestnut St",
//     areaName: "Downtown",
//     pinCode: "34567",
//     state: "CA",
//     nationality: "US",
//     email: "olivia.harris@example.com",
//     age: "20",
//     sslcMarks: "89",
//     courseName: "Course C",
//     universityName: "University Z",
//   },
//   {
//     id: 7,
//     firstName: "Noah",
//     lastName: "Clark",
//     gender: "Male",
//     fatherName: "Thomas Clark",
//     phoneNumber1: "7779991234",
//     phoneNumber2: "8889994321",
//     motherName: "Emily Clark",
//     houseNo: "333",
//     streetName: "Maple St",
//     areaName: "Midtown",
//     pinCode: "23456",
//     state: "NY",
//     nationality: "US",
//     email: "noah.clark@example.com",
//     age: "22",
//     sslcMarks: "87",
//     courseName: "Course A",
//     universityName: "University X",
//   },
//   {
//     id: 8,
//     firstName: "Sophia",
//     lastName: "Allen",
//     gender: "Female",
//     fatherName: "Richard Allen",
//     phoneNumber1: "5557779999",
//     phoneNumber2: "5558887777",
//     motherName: "Maria Allen",
//     houseNo: "444",
//     streetName: "Elm St",
//     areaName: "Westend",
//     pinCode: "45678",
//     state: "TX",
//     nationality: "US",
//     email: "sophia.allen@example.com",
//     age: "23",
//     sslcMarks: "86",
//     courseName: "Course B",
//     universityName: "University Y",
//   },
//   {
//     id: 9,
//     firstName: "Ella",
//     lastName: "Brown",
//     gender: "Female",
//     fatherName: "Joseph Brown",
//     phoneNumber1: "5557778888",
//     phoneNumber2: "5558887777",
//     motherName: "Ava Brown",
//     houseNo: "555",
//     streetName: "Palm St",
//     areaName: "Eastside",
//     pinCode: "56789",
//     state: "FL",
//     nationality: "US",
//     email: "ella.brown@example.com",
//     age: "24",
//     sslcMarks: "85",
//     courseName: "Course C",
//     universityName: "University Z",
//   },
//   {
//     id: 10,
//     firstName: "Bob",
//     lastName: "Taylor",
//     gender: "Male",
//     fatherName: "George Taylor",
//     phoneNumber1: "5559997777",
//     phoneNumber2: "5557779999",
//     motherName: "Grace Taylor",
//     houseNo: "666",
//     streetName: "Cedar St",
//     areaName: "Uptown",
//     pinCode: "67890",
//     state: "IL",
//     nationality: "US",
//     email: "bob.taylor@example.com",
//     age: "25",
//     sslcMarks: "84",
//     courseName: "Course A",
//     universityName: "University X",
//   },
// ];
// Function to generate a random string

const AdminStudents = () => {
  function randomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  
  // Function to generate random student data
  function generateRandomStudent(id) {
    const firstName = randomString(5);
    const lastName = randomString(5);
    const gender = Math.random() < 0.5 ? 'Male' : 'Female';
    const fatherName = randomString(8);
    const phoneNumber1 = Math.floor(Math.random() * 10000000000).toString();
    const phoneNumber2 = Math.floor(Math.random() * 10000000000).toString();
    const motherName = randomString(8);
    const houseNo = Math.floor(Math.random() * 1000).toString();
    const streetName = randomString(8);
    const areaName = randomString(8);
    const pinCode = Math.floor(Math.random() * 100000).toString();
    const state = randomString(2);
    const nationality = 'US';
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const age = Math.floor(Math.random() * 10) + 20;
    const sslcMarks = Math.floor(Math.random() * 101);
    const courseName = `Course ${Math.floor(Math.random() * 3) + 1}`;
    const universityName = `University ${randomString(1)}`;
  
    return {
      id,
      firstName,
      lastName,
      gender,
      fatherName,
      phoneNumber1,
      phoneNumber2,
      motherName,
      houseNo,
      streetName,
      areaName,
      pinCode,
      state,
      nationality,
      email,
      age: age.toString(),
      sslcMarks: sslcMarks.toString(),
      courseName,
      universityName,
    };
  }
  
  // Generate an array of 50 random students
  const initialStudents = [];
  for (let i = 1; i <= 100; i++) {
    initialStudents.push(generateRandomStudent(i));
  }
  
  const params = useParams()
  const [students, setStudents] = useState(initialStudents);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    fatherName: '',
    phoneNumber1: '',
    phoneNumber2: '',
    motherName: '',
    houseNo: '',
    streetName: '',
    areaName: '',
    pinCode: '',
    state: '',
    nationality: '',
    email: '',
    age: '',
    sslcMarks: '',
    courseName: '',
    universityName: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editStudentId !== null) {
      // Handle edit logic here (update the existing student)
      const updatedStudents = students.map((student) =>
        student.id === editStudentId ? { ...formData, id: editStudentId } : student
      );
      setStudents(updatedStudents);
      setEditStudentId(null);
    } else {
      // Handle form submission logic here (e.g., adding a new student)
      // You can generate a unique ID for the new student and update the 'students' state
      const newStudent = { ...formData, id: students.length + 1 };
      setStudents([...students, newStudent]);
    }
    // Reset the form data after submission
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      gender: '',
      fatherName: '',
      phoneNumber1: '',
      phoneNumber2: '',
      motherName: '',
      houseNo: '',
      streetName: '',
      areaName: '',
      pinCode: '',
      state: '',
      nationality: '',
      email: '',
      age: '',
      sslcMarks: '',
      courseName: '',
      universityName: '',
    });
    // Close the dialog
    setDialogOpen(false);
    setEditDialogOpen(false);
  
    // Log the form data
    console.log(formData);
  };
  

  const handleEditClick = (studentId) => {
    // Find the student to edit based on studentId
    const studentToEdit = students.find((student) => student.id === studentId);
    if (studentToEdit) {
      // Set the form data with the student's details
      setFormData({ ...studentToEdit });
      setEditStudentId(studentId);
      setEditDialogOpen(true);
    }
  };

  return (
    <div>
      <AdminAppBar id={params.UserId} />
      <Typography variant="h4" gutterBottom>
        Students
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <TextField
    label="Search"
    fullWidth
    id="search"
    margin="normal"
    variant="outlined"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ width: '50%', margin: '0 auto' , marginBttom : '20px' }}
  />
  <Button
    variant="contained"
    color="primary"
    onClick={() => {
      setFormData({
        id: '',
        firstName: '',
        lastName: '',
        gender: '',
        fatherName: '',
        phoneNumber1: '',
        phoneNumber2: '',
        motherName: '',
        houseNo: '',
        streetName: '',
        areaName: '',
        pinCode: '',
        state: '',
        nationality: '',
        email: '',
        age: '',
        sslcMarks: '',
        courseName: '',
        universityName: '',
      });
      setDialogOpen(true);
    }}
  >
    Add Student
  </Button>
</div>


      <DataGrid
        rows={students.filter((student) => {

    const rowValues = Object.values(student).join('').toLowerCase();
    return rowValues.includes(searchQuery.toLowerCase());
  })}

  columns={[
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'courseName', headerName: 'Enrolled Course', flex: 1 },
    { field: 'universityName', headerName: 'University', flex: 1 },
    { field: 'phoneNumber1', headerName: 'Mobile Number', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditClick(params.row.id)}
          >
            Edit
          </Button>
          <Button variant="outlined" color="secondary">
            Delete
          </Button>
        </>
      ),
    },
  ]}
  autoHeight
  pageSize={10}
/>


      {/* Add Student Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
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
              <Grid item xs={4}>
                <TextField
                  label="Enrolled Course"
                  fullWidth
                  id="courseName"
                  margin="normal"
                  variant="outlined"
                  value={formData.courseName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="University"
                  fullWidth
                  id="universityName"
                  margin="normal"
                  variant="outlined"
                  value={formData.universityName}
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

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
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
              <Grid item xs={4}>
                <TextField
                  label="Enrolled Course"
                  fullWidth
                  id="courseName"
                  margin="normal"
                  variant="outlined"
                  value={formData.courseName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="University"
                  fullWidth
                  id="universityName"
                  margin="normal"
                  variant="outlined"
                  value={formData.universityName}
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

export default AdminStudents;
