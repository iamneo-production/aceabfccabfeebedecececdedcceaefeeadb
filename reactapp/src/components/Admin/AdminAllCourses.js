import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AdminAppBar from '../AdminAppBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../Footer'

const AdminAllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    courseId: '',
    courseName: '',
    courseDescription: '',
    courseDuration: 0,
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    courseDescription: '',
    courseDuration: 0,
  });
  const params = useParams();

  useEffect(() => {
    // Make a GET request to fetch course data
    axios
      .get('https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/courses')
      .then((response) => {
        setCourses(response.data); // Set the retrieved courses in state
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: 'courseId', headerName: 'Course ID', width: 150 },
    { field: 'courseName', headerName: 'Course Name', width: 250 },
    { field: 'courseDescription', headerName: 'Description', width: 300 },
    { field: 'courseDuration', headerName: 'Duration (years)', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
            style={{ marginRight: '8px' }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row.courseId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Function to open the "Add Course" dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  // Function to close the "Add Course" dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewCourse({
      courseName: '',
      courseDescription: '',
      courseDuration: 0,
    });
  };

  // Function to handle saving a new course
  const handleSaveAdd = () => {
    // Make a POST request to add the new course
    axios
      .post('https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addCourse', newCourse)
      .then((response) => {
        // Handle successful addition
        // Make another GET request to fetch the updated course list
        axios
          .get('https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/courses')
          .then((response) => {
            setCourses(response.data); // Set the updated courses in state
          })
          .catch((error) => {
            console.error('Error fetching courses:', error);
          });

        handleCloseAddDialog(); // Close the "Add Course" dialog
      })
      .catch((error) => {
        console.error('Error adding course:', error);
        alert('Error adding course. Please try again.');
      });
  };

  // Function to handle editing a course
  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditedCourse({
      courseId: course.courseId,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      courseDuration: course.courseDuration,
    });
    setOpenEditDialog(true);
  };

  // Function to handle deleting a course
  const handleDeleteClick = (courseId) => {
    // Handle delete action here, e.g., show a confirmation dialog and make DELETE request
    if (window.confirm('Are you sure you want to delete this course?')) {
      axios
        .delete(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteCourse/${courseId}`)
        .then((response) => {
          // Handle successful deletion (e.g., remove the course from the state)
          const updatedCourses = courses.filter((course) => course.courseId !== courseId);
          setCourses(updatedCourses);
          alert('Course deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting course:', error);
          alert('Error deleting course. Please try again.');
        });
    }
  };

  // Function to handle closing the "Edit Course" dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCourse(null);
    setEditedCourse({
      courseId: '',
      courseName: '',
      courseDescription: '',
      courseDuration: 0,
    });
  };

  // Function to handle saving an edited course
  const handleSaveEdit = () => {
    // Include the 'institute' object from 'selectedCourse' in 'editedCourse'
    editedCourse.institute = selectedCourse.institute;

    // Handle save edit action here, e.g., send a PUT request to update the course details
    axios
      .put(`https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/editCourse/${selectedCourse.courseId}`, editedCourse)
      .then((response) => {
        // Handle successful update (e.g., update the course details in the state)
        const updatedCourses = courses.map((course) =>
          course.courseId === selectedCourse.courseId ? editedCourse : course
        );
        setCourses(updatedCourses);
        setOpenEditDialog(false);
       
      })
      .catch((error) => {
        console.error('Error updating course:', error);
        alert('Error updating course. Please try again.');
      });
  };



  return (
    <>
      <AdminAppBar id={params.userId} />
    

        <Fab
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          style={{
            position: 'fixed',
            bottom: '2%',
            right: '2%',
            width: isHovered ? 'auto' : '56px', // Standard width for the icon
            // Adjust percentage as needed
            borderRadius: isHovered ? '10px' : '50%', // Change border radius on hover
            transition: 'width 0.3s ease, border-radius 0.3s ease', // Transition specific properties
            overflow: 'hidden', // Hide the overflow
            padding: isHovered ? '8px' : '0px', // Add padding on hover
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? 'Add Course' : <AddIcon />}
      
        </Fab>
        <div style={{ margin: '2%', padding: '2%' }}>
        <DataGrid
          getRowId={(row) => row.courseId}
          rows={courses}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
         
        />
        </div>
     

 {/* Edit Course Dialog */}
 {selectedCourse && (
          <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogContent style={{ padding: '16px' }}>
              <form>
                <TextField
                  label="Course Name"
                  fullWidth
                  value={editedCourse.courseName}
                  onChange={(e) =>
                    setEditedCourse({ ...editedCourse, courseName: e.target.value })
                  }
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  value={editedCourse.courseDescription}
                  onChange={(e) =>
                    setEditedCourse({ ...editedCourse, courseDescription: e.target.value })
                  }
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  label="Duration (years)"
                  fullWidth
                  type="number"
                  value={editedCourse.courseDuration}
                  onChange={(e) =>
                    setEditedCourse({ ...editedCourse, courseDuration: e.target.value })
                  }
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Add Course Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add Course</DialogTitle>
          <DialogContent style={{ padding: '16px' }}>
            <form>
              <TextField
                label="Course Name"
                fullWidth
                value={newCourse.courseName}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseName: e.target.value })
                }
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Description"
                fullWidth
                value={newCourse.courseDescription}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseDescription: e.target.value })
                }
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Duration (years)"
                fullWidth
                type="number"
                value={newCourse.courseDuration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseDuration: e.target.value })
                }
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveAdd} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      <Footer/>
    </>
  );
};

export default AdminAllCourses;
