import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import AdminCourses from "./AdminCourses";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import AdminAppBar from "../AdminAppBar";
import Footer from "../Footer";
import axios from "axios";

const defaultTheme = createTheme();

const AdminUniversityList = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({});
  const [cardDetails, setCardDetails] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = cardDetails.filter((card) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      // Check if the query matches any of the properties (title, place, or ID)
      return (
        card.title.toLowerCase().includes(lowerCaseQuery) ||
        card.place.toLowerCase().includes(lowerCaseQuery) ||
        card.collegeId.toString().includes(lowerCaseQuery)
      );
    });
    setFilteredCards(filtered);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = (card, e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the card
    console.log("Edit College ID:", card.collegeId); // Log the college ID
    setEditFormData(card);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (card, e) => {
    e.stopPropagation();
    console.log("Delete College ID:", card.collegeId); // Log the college ID
    // Define the API endpoint URL for deleting
    const deleteApiUrl = `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/deleteInstitute/${card.collegeId}`;

    // Make a DELETE request to remove the institute
    axios
      .delete(deleteApiUrl)
      .then((response) => {
        // Handle success (e.g., show a success message)
        console.log("Institute deleted successfully!", response.data);
        setFilteredCards((prevDetails) =>
          prevDetails.filter((item) => item.collegeId !== card.collegeId)
        );

        // Optionally, you can refresh the institute list here if needed
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error("Error deleting institute:", error);
      });

    // Close the dialog after deleting
    setEditDialogOpen(false);
  };

  const handleEditSave = () => {
    // Define the API endpoint URL for editing
    const editApiUrl = `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/editInstitute/${editFormData.collegeId}`;

    // Prepare the data to send in the request body
    const editedInstituteData = {
      instituteName: editFormData.title,
      instituteDescription: editFormData.description,
      instituteAddress: editFormData.place,
      starRating: editFormData.starRating,
      imageURL: editFormData.imageURL,
      mobile: editFormData.mobile, // Include mobile number
      email: editFormData.email, // Include email
    };

    // Make a PUT request to update the institute
    axios
      .put(editApiUrl, editedInstituteData)
      .then((response) => {
        // Handle success (e.g., show a success message)
        console.log("Institute edited successfully!", response.data);
        const apiUrl =
        'https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/institute';
  
      // Make a GET request to fetch the list of institutes from the API
      axios
        .get(apiUrl)
        .then((response) => {
          // Assuming your API returns an array of institutes
          const dataFromApi = response.data;
          console.log(response.data);
  
          const formattedCardDetails = dataFromApi.map((institute) => ({
            collegeId: institute.instituteId,
            title: institute.instituteName,
            description: institute.instituteDescription,
            imageURL: institute.imageURL,
            place: institute.instituteAddress,
            starRating: parseFloat(institute.starRating), // Convert starRating to a float
            mobile: institute.mobile, // Include mobile number
            email: institute.email, // Include email
          }));
  
          setCardDetails(formattedCardDetails);
          setFilteredCards(formattedCardDetails); // Initialize filteredCards with the formatted data
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        


        // Optionally, you can refresh the institute list here if needed
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error("Error editing institute:", error);
      });

    // Close the dialog after saving
    setEditDialogOpen(false);
  };

  const handleAddInstituteClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleAddInstituteSave = () => {
    // Define the API endpoint URL for adding a new institute
    const addApiUrl = `https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/addInstitute`;

    // Prepare the data to send in the request body
    const newInstituteData = {
      instituteName: addFormData.title,
      instituteDescription: addFormData.description,
      instituteAddress: addFormData.place,
      starRating: addFormData.starRating,
      imageURL: addFormData.imageURL,
      mobile: addFormData.mobile, // Include mobile number
      email: addFormData.email, // Include email
    };

    // Make a POST request to add the new institute
    axios
      .post(addApiUrl, newInstituteData)
      .then((response) => {
        // Handle success (e.g., show a success message)
        console.log("Institute added successfully!", response.data);
        const apiUrl =
        'https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/institute';
  
      // Make a GET request to fetch the list of institutes from the API
      axios
        .get(apiUrl)
        .then((response) => {
          // Assuming your API returns an array of institutes
          const dataFromApi = response.data;
          console.log(response.data);
  
          const formattedCardDetails = dataFromApi.map((institute) => ({
            collegeId: institute.instituteId,
            title: institute.instituteName,
            description: institute.instituteDescription,
            imageURL: institute.imageURL,
            place: institute.instituteAddress,
            starRating: parseFloat(institute.starRating), // Convert starRating to a float
            mobile: institute.mobile, // Include mobile number
            email: institute.email, // Include email
          }));
  
          setCardDetails(formattedCardDetails);
          setFilteredCards(formattedCardDetails); // Initialize filteredCards with the formatted data
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        



        // Optionally, you can refresh the institute list here if needed
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error("Error adding institute:", error);
      });

    // Close the dialog after saving
    setAddDialogOpen(false);
  };

  useEffect(() => {
    // Define the API endpoint URL where your data is hosted
    const apiUrl =
      'https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/institute';

    // Make a GET request to fetch the list of institutes from the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming your API returns an array of institutes
        const dataFromApi = response.data;
        console.log(response.data);

        const formattedCardDetails = dataFromApi.map((institute) => ({
          collegeId: institute.instituteId,
          title: institute.instituteName,
          description: institute.instituteDescription,
          imageURL: institute.imageURL,
          place: institute.instituteAddress,
          starRating: parseFloat(institute.starRating), // Convert starRating to a float
          mobile: institute.mobile, // Include mobile number
          email: institute.email, // Include email
        }));

        setCardDetails(formattedCardDetails);
        setFilteredCards(formattedCardDetails); // Initialize filteredCards with the formatted data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <AdminAppBar id={params.userId} />

      <main>
        <Box sx={{ bgcolor: "background.paper", pb: 6 }}></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <h3>Welcome Back Admin</h3>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 2,
              pb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!selectedCard && (
              <Container maxWidth="sm">
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ width: "70%", padding: "10px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  style={{ marginLeft: "10px" }}
                >
                  Search
                </Button>
              </Container>
            )}
          </Box>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : selectedCard ? (
            <AdminCourses
              collegeId={selectedCard.collegeId}
              title={selectedCard.title}
              onClose={() => setSelectedCard(null)}
            />
          ) : (
            <Grid container spacing={4}>
              {filteredCards.map((card, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  id={`instituteGrid${index + 1}`}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(card)}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "56.25%",
                      }}
                      image={card.imageURL}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>{card.description}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Place: {card.place}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Star Rating:
                        <Rating
                          name="star-rating"
                          value={card.starRating}
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                          readOnly
                        />
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Email: {card.email}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Mobile: {card.mobile}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={(e) => handleEditClick(card, e)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={(e) => handleDeleteClick(card, e)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>

      {!selectedCard && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
            pb: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddInstituteClick}
          >
            Add Institute
          </Button>
        </Box>
      )}

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Institute</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={editFormData.title || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={editFormData.description || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Place"
            value={editFormData.place || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, place: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Star Rating"
            value={editFormData.starRating || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, starRating: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={editFormData.imageURL || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, imageURL: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={editFormData.email || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            value={editFormData.mobile || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, mobile: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add Institute</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={addFormData.title || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={addFormData.description || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Place"
            value={addFormData.place || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, place: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Star Rating"
            value={addFormData.starRating || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, starRating: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={addFormData.imageURL || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, imageURL: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={addFormData.email || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            value={addFormData.mobile || ""}
            onChange={(e) =>
              setAddFormData({ ...addFormData, mobile: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddInstituteSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </ThemeProvider>
  );
};

export default AdminUniversityList;
