import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography ,Fab} from '@mui/material';
import   AddIcon from '@mui/icons-material'
import AdminAppBar from '../AdminAppBar';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const AdminStudents = () => {
  const params = useParams();
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    studentDOB: '',
    address: '',
    mobile: '',
    eligibility: '',
    userId: params.userId, // Use the userId from params
    sslc: '',
    hsc: '',
    diploma: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  const handleDeleteClick = (studentId) => {
    axios
      .delete(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteStudent/${studentId}`).then((response) => {
        fetchStudentsData();


      })

  }

  const fetchStudentsData = () => {
    axios
      .get('https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/student')
      .then((response) => {
        const studentData = response.data.map((student) => ({
          studentId: student.studentId,
          studentName: student.studentName,
          studentDOB: student.studentDOB,
          address: student.address,
          mobile: student.mobile,
          eligibility: student.eligibility,
          userId: student.userId,
          sslc: student.sslc,
          hsc: student.hsc,
          diploma: student.diploma,
        }));

        setStudents(studentData);
      })
      .catch((error) => {

        console.error('Error fetching students data:', error);
      });
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editStudentId !== null) {
      // Handle edit logic here (update the existing student)
      axios
        .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/createOrUpdateStudentByStudentId/${formData.studentId}`, formData)
        .then(() => {
          // Refresh the students data after editing
          fetchStudentsData();
          setEditStudentId(null);
        })
        .catch((error) => {
          console.error('Error editing student:', error);
        });
    } else {
      formData.userId = null;
      // Handle form submission logic here (e.g., adding a new student)
      axios
        .post(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addStudent`, formData)
        .then(() => {
          // Refresh the students data after adding
          fetchStudentsData();
        })
        .catch((error) => {
          console.error('Error adding student:', error);
        });
    }
    // Reset the form data after submission
    setFormData({
      studentId: '',
      studentName: '',
      studentDOB: '',
      address: '',
      mobile: '',
      eligibility: '',
      userId: params.userId,
      sslc: '',
      hsc: '',
      diploma: '',
    });
    // Close the dialog
    setDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleEditClick = (studentId) => {
    // Find the student to edit based on studentId
    const studentToEdit = students.find((student) => student.studentId === studentId);
    if (studentToEdit) {
      // Set the form data with the student's details
      setFormData({ ...studentToEdit });
      setEditStudentId(studentId);
      setEditDialogOpen(true);
    }
  };

  return (
    <div>
      <AdminAppBar id={params.userId} />
      <Typography variant="h4" gutterBottom style={{ marginTop: '3%' }}>
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
          style={{ width: '50%', margin: '0 auto', marginBottom: '20px' }}
        />
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setFormData({
              studentId: '',
              studentName: '',
              studentDOB: '',
              address: '',
              mobile: '',
              eligibility: '',
              userId: params.userId,
              sslc: '',
              hsc: '',
              diploma: '',
            });
            setDialogOpen(true);
          }}
        >
          Add Student
        </Button> */}
         <Fab
          color="primary"
          aria-label="Add Student"
          onClick={() => {
            setFormData({
              studentId: '',
              studentName: '',
              studentDOB: '',
              address: '',
              mobile: '',
              eligibility: '',
              userId: params.userId,
              sslc: '',
              hsc: '',
              diploma: '',
            });
            setDialogOpen(true);
          }}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          <AddIcon />
        </Fab>
      </div>

      <DataGrid
        rows={students.filter((student) => {
          const rowValues = Object.values(student).join('').toLowerCase();
          return rowValues.includes(searchQuery.toLowerCase());
        })}
        getRowId={(row) => row.studentId}
        columns={[
          { field: 'studentId', headerName: 'Student ID', flex: 1 },
          { field: 'studentName', headerName: 'Student Name', flex: 1 },
          { field: 'studentDOB', headerName: 'Date of Birth', flex: 1 },
          { field: 'address', headerName: 'Address', flex: 1 },
          { field: 'mobile', headerName: 'Mobile Number', flex: 1 },
          { field: 'eligibility', headerName: 'Eligibility', flex: 1 },
          { field: 'sslc', headerName: 'SSLC', flex: 1 },
          { field: 'hsc', headerName: 'HSC', flex: 1 },
          { field: 'diploma', headerName: 'Diploma', flex: 1 },
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
                  onClick={() => handleEditClick(params.row.studentId)}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(params.row.studentId)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        autoHeight
        pageSize={10}
        sx={{
          '& .MuiDataGrid-colCell': {
            fontSize: '1rem', // Adjust column header font size
          },
          '& .MuiDataGrid-cell': {
            fontSize: '0.9rem', // Adjust cell font size
          },
          '@media (max-width: 600px)': {
            '& .MuiDataGrid-root': {
              fontSize: '0.8rem', // Adjust overall font size for smaller screens
            },
            '& .MuiDataGrid-colCell': {
              padding: '8px', // Adjust column header padding
            },
            '& .MuiDataGrid-cell': {
              padding: '8px', // Adjust cell padding
            },
          },
        }}
      />


      {/* Add Student Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
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
                  value={formData.studentDOB}
                  onChange={handleInputChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}

                  
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
                  label="Mobile Number"
                  fullWidth
                  id="mobile"
                  margin="normal"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <div>
                  <label>Eligibility:</label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      id="eligibility"
                      name="eligibility"
                      value="Eligible"
                      checked={formData.eligibility === "Eligible"}
                      onChange={handleInputChange}
                    />
                    Eligible
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      id="eligibility"
                      name="eligibility"
                      value="Not Eligible"
                      checked={formData.eligibility === "Not Eligible"}
                      onChange={handleInputChange}
                    />
                    Not Eligible
                  </label>
                </div>
              </Grid>


              <Grid item xs={4}>
                <TextField
                  label="SSLC"
                  fullWidth
                  id="sslc"
                  margin="normal"
                  variant="outlined"
                  value={formData.sslc}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="HSC"
                  fullWidth
                  id="hsc"
                  margin="normal"
                  variant="outlined"
                  value={formData.hsc}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Diploma"
                  fullWidth
                  id="diploma"
                  margin="normal"
                  variant="outlined"
                  value={formData.diploma}
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
                  value={formData.studentDOB}
                  onChange={handleInputChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}

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
                  label="Mobile Number"
                  fullWidth
                  id="mobile"
                  margin="normal"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <div>
                  <label>Eligibility:</label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      id="eligibility"
                      name="eligibility"
                      value="Eligible"
                      checked={formData.eligibility === "Eligible"}
                      onChange={handleInputChange}
                    />
                    Eligible
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      id="eligibility"
                      name="eligibility"
                      value="Not Eligible"
                      checked={formData.eligibility === "Not Eligible"}
                      onChange={handleInputChange}
                    />
                    Not Eligible
                  </label>
                </div>
              </Grid>


              <Grid item xs={4}>
                <TextField
                  label="SSLC"
                  fullWidth
                  id="sslc"
                  margin="normal"
                  variant="outlined"
                  value={formData.sslc}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="HSC"
                  fullWidth
                  id="hsc"
                  margin="normal"
                  variant="outlined"
                  value={formData.hsc}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Diploma"
                  fullWidth
                  id="diploma"
                  margin="normal"
                  variant="outlined"
                  value={formData.diploma}
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

export default AdminStudents;
